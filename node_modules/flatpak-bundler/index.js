'use strict'

const _ = require('lodash')
const childProcess = require('child_process')
const fs = require('fs-extra')
const path = require('path')

const pkg = require('./package.json')
const logger = require('debug')(pkg.name)

const promisify = require('es6-promisify')
const writeFile = promisify(fs.writeFile)
const mkdirs = promisify(fs.mkdirs)
const copy = promisify(fs.copy)
const symlink = promisify(fs.symlink)
const tmpdir = promisify(require('tmp').dir)

function kebabify (object) {
  return _.cloneDeepWith(object, (value) => {
    if (!value || typeof value !== 'object') return value

    return Object.keys(value).reduce(function (newValue, key) {
      newValue[_.kebabCase(key)] = value[key]
      return newValue
    }, {})
  })
}

function flatpakifyArch (arch) {
  if (arch === 'ia32') return 'i386'
  if (arch === 'x64') return 'x86_64'
  if (arch === 'amd64') return 'x86_64'
  if (arch === 'armv7l') return 'arm'
  return arch
}

function getOptionsWithDefaults (options, manifest) {
  let defaults = {
    'build-dir': path.join(options['working-dir'], 'build'),
    'repo-dir': path.join(options['working-dir'], 'repo'),
    'manifest-path': path.join(options['working-dir'], 'manifest.json'),
    'extra-flatpak-builder-args': [],
    'extra-flatpak-build-bundle-args': [],
    'extra-flatpak-build-export-args': [],
    'clean-tmpdirs': true,
    'auto-install-runtime': typeof manifest['runtime-flatpakref'] !== 'undefined',
    'auto-install-sdk': typeof manifest['sdk-flatpakref'] !== 'undefined',
    'auto-install-base': typeof manifest['base-flatpakref'] !== 'undefined'
  }
  options = _.defaults({}, options, defaults)
  options['working-dir'] = path.resolve(options['working-dir'])
  options['build-dir'] = path.resolve(options['build-dir'])
  options['repo-dir'] = path.resolve(options['repo-dir'])
  options['manifest-path'] = path.resolve(options['manifest-path'])
  if (options['bundle-path']) options['bundle-path'] = path.resolve(options['bundle-path'])
  return options
}

function spawnWithLogging (options, command, args, allowFail) {
  return new Promise(function (resolve, reject) {
    logger(`$ ${command} ${args.join(' ')}`)
    let child = childProcess.spawn(command, args, { cwd: options['working-dir'] })
    child.stdout.on('data', (data) => {
      logger(`1> ${data}`)
    })
    child.stderr.on('data', (data) => {
      logger(`2> ${data}`)
    })
    child.on('error', (error) => {
      reject(error)
    })
    child.on('close', (code) => {
      if (!allowFail && code !== 0) {
        reject(new Error(`${command} failed with status code ${code}`))
      }
      resolve(code === 0)
    })
  })
}

function addCommandLineOption (args, name, value) {
  if (!value) return

  args.push(`--${name}`)
  if (value !== true) args.push(value)
}

function ensrueRef (options, flatpakref, id, version) {
  function checkInstalled (checkUser) {
    let args = ['info']
    addCommandLineOption(args, 'show-commit', true)
    if (checkUser) {
      addCommandLineOption(args, 'user', true)
    } else {
      addCommandLineOption(args, 'system', true)
    }
    args.push([id, options.arch, version].join('/'))
    return spawnWithLogging(options, 'flatpak', args, true)
  }

  logger(`Checking for install of ${id}`)
  return Promise.all([checkInstalled(true), checkInstalled(false)])
    .then(function (checkResults) {
      let userInstall = checkResults[0]
      let systemInstall = checkResults[1]
      if (!userInstall && !systemInstall) {
        logger(`No install of ${id} found, trying to install from ${flatpakref}`)
        if (!flatpakref) throw new Error(`Cannot install ${id} without flatpakref`)
        let args = ['install']
        addCommandLineOption(args, 'user', true)
        addCommandLineOption(args, 'no-deps', true)
        addCommandLineOption(args, 'arch', options['arch'])
        addCommandLineOption(args, 'from', flatpakref)
        return spawnWithLogging(options, 'flatpak', args)
      }

      logger(`Found install of ${id}, trying to update`)
      let args = ['update']
      if (userInstall) addCommandLineOption(args, 'user', true)
      addCommandLineOption(args, 'no-deps', true)
      addCommandLineOption(args, 'arch', options['arch'])
      args.push(id)
      if (version) args.push(version)
      return spawnWithLogging(options, 'flatpak', args)
    })
}

function ensureRuntime (options, manifest) {
  if (!options['auto-install-runtime']) return

  logger('Ensuring runtime is up to date')
  return ensrueRef(options, manifest['runtime-flatpakref'],
    manifest['runtime'], manifest['runtime-version'])
}

function ensureSdk (options, manifest) {
  if (!options['auto-install-sdk']) return

  logger('Ensuring sdk is up to date')
  return ensrueRef(options, manifest['sdk-flatpakref'],
    manifest['sdk'], manifest['sdk-version'])
}

function ensureBase (options, manifest) {
  if (!options['auto-install-base']) return

  logger('Ensuring base app is up to date')
  return ensrueRef(options, manifest['base-flatpakref'],
    manifest['base'], manifest['base-version'])
}

function ensureWorkingDir (options) {
  if (!options['working-dir']) {
    return tmpdir({ dir: '/var/tmp', unsafeCleanup: options['clean-tmpdirs'] })
      .then(function (dir) {
        options['working-dir'] = dir
      })
  } else {
    return mkdirs(options['working-dir'])
  }
}

function writeJsonFile (options, manifest) {
  return writeFile(options['manifest-path'], JSON.stringify(manifest, null, '  '))
}

function copyFiles (options, manifest) {
  if (!manifest['files']) return

  let copies = manifest['files'].map(function (sourceDest) {
    let source = path.resolve(sourceDest[0])
    let dest = path.join(options['build-dir'], 'files', sourceDest[1])
    let dir = dest
    if (!_.endsWith(dir, path.sep)) dir = path.dirname(dir)

    logger(`Copying ${source} to ${dest}`)
    return mkdirs(dir)
      .then(function () {
        return copy(source, dest)
      })
  })
  return Promise.all(copies)
}

function createSymlinks (options, manifest) {
  if (!manifest['symlinks']) return

  let links = manifest['symlinks'].map(function (targetDest) {
    let target = path.join('/app', targetDest[0])
    let dest = path.join(options['build-dir'], 'files', targetDest[1])
    let dir = path.dirname(dest)

    logger(`Symlinking ${target} at ${dest}`)
    return mkdirs(dir)
      .then(function () {
        symlink(target, dest)
      })
  })
  return Promise.all(links)
}

function copyExports (options, manifest) {
  if (!manifest['extra-exports']) return

  let copies = manifest['extra-exports'].map(function (source) {
    let dest = path.join(options['build-dir'], 'export', source)
    let dir = path.dirname(dest)
    source = path.join(options['build-dir'], 'files', source)

    logger(`Exporting ${source} to ${dest}`)
    return mkdirs(dir)
      .then(function () {
        return copy(source, dest)
      })
  })
  return Promise.all(copies)
}

function flatpakBuilder (options, manifest, finish) {
  let args = []
  addCommandLineOption(args, 'arch', options['arch'])
  addCommandLineOption(args, 'force-clean', true)
  // If we are not compile anything, allow building without the platform and sdk
  // installed. Allows automated builds on a minimal environment, for example.
  if (!manifest.modules) addCommandLineOption(args, 'allow-missing-runtimes', true)
  if (!finish) {
    addCommandLineOption(args, 'build-only', true)
  } else {
    addCommandLineOption(args, 'finish-only', true)
  }
  args.concat(options['extra-flatpak-builder-args'])

  args.push(options['build-dir'])
  args.push(options['manifest-path'])
  return spawnWithLogging(options, 'flatpak-builder', args)
}

function flatpakBuildExport (options, manifest) {
  let args = ['build-export']
  addCommandLineOption(args, 'arch', options['arch'])
  addCommandLineOption(args, 'gpg-sign', options['gpg-sign'])
  addCommandLineOption(args, 'gpg-homedir', options['gpg-homedir'])
  addCommandLineOption(args, 'subject', options['subject'])
  addCommandLineOption(args, 'body', options['body'])
  if (options['build-runtime']) addCommandLineOption(args, 'runtime', true)
  args.concat(options['extra-flatpak-build-export-args'])

  args.push(options['repo-dir'])
  args.push(options['build-dir'])
  if (manifest['branch']) args.push(manifest['branch'])
  return spawnWithLogging(options, 'flatpak', args)
}

function flatpakBuildBundle (options, manifest) {
  if (!options['bundle-path']) return

  let args = ['build-bundle']
  addCommandLineOption(args, 'arch', options['arch'])
  addCommandLineOption(args, 'gpg-keys', options['gpg-keys'])
  addCommandLineOption(args, 'gpg-homedir', options['gpg-homedir'])
  addCommandLineOption(args, 'repo-url', options['bundle-repo-url'])
  if (options['build-runtime']) addCommandLineOption(args, 'runtime', true)
  args.concat(options['extra-flatpak-build-bundle-args'])

  args.push(options['repo-dir'])
  args.push(options['bundle-path'])
  args.push(manifest['id'])
  if (manifest['branch']) args.push(manifest['branch'])
  return mkdirs(path.dirname(options['bundle-path']))
    .then(function () {
      return spawnWithLogging(options, 'flatpak', args)
    })
}

exports.bundle = function (manifest, options, callback) {
  manifest = kebabify(manifest)
  options = kebabify(options)
  if (manifest['app-id']) manifest['id'] = manifest['app-id']

  return ensureWorkingDir(options)
    .then(() => {
      options = getOptionsWithDefaults(options, manifest)
      options.arch = flatpakifyArch(options.arch)

      logger(`Using manifest...\n${JSON.stringify(manifest, null, '  ')}`)
      logger(`Using options...\n${JSON.stringify(options, null, '  ')}`)
    })
    .then(() => ensureRuntime(options, manifest))
    .then(() => ensureSdk(options, manifest))
    .then(() => ensureBase(options, manifest))
    .then(() => writeJsonFile(options, manifest))
    .then(() => flatpakBuilder(options, manifest, false))
    .then(() => copyFiles(options, manifest))
    .then(() => createSymlinks(options, manifest))
    .then(() => flatpakBuilder(options, manifest, true))
    .then(() => copyExports(options, manifest))
    .then(() => flatpakBuildExport(options, manifest))
    .then(() => flatpakBuildBundle(options, manifest))
    .then(function () {
      callback(null, options)
    }, function (error) {
      callback(error)
    })
}
