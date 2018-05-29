# flatpak-bundler [![Version](https://img.shields.io/npm/v/flatpak-bundler.svg)](https://www.npmjs.com/package/flatpak-bundler) [![Build Status](https://img.shields.io/travis/endlessm/flatpak-bundler/master.svg)](http://travis-ci.org/endlessm/flatpak-bundler)
Build [flatpaks](http://flatpak.org/) from nodejs.

# Quick Start

Install flatpak-bundler.
```shell
$ npm install flatpak-bundler -g
```

[Build a flatpak with a node script](#hello-world).

Install and run it!
```shell
$ flatpak install --user --bundle hello.flatpak
$ flatpak run org.world.Hello
Hello, world!
```

## Overview
This modules allows building flatpaks programatically from node. It requires
flatpak >= 0.6.13 to be installed on your system.

Under the hood, this is just a wrapper for the [flatpak-builder](http://flatpak.org/flatpak/flatpak-docs.html#flatpak-builder)
tool with some extra sugar added.

With `flatpak-builder` you specify a runtime, sandbox permissions and software
modules to build into you application, and build a flatpak from start to finish.
This module provides a few additional features:

 - Supports auto installing flatpak runtime and app dependencies
 - Supports exporting directly to the a single file flatpak bundle
 - Supports easy copying files and creating symlinks directly in `/app`

The latter is particularly useful for [electron](http://electron.atom.io/) and
[nw.js](http://nwjs.io/) style node applications, which often create packages
from prebuilt binaries and do not attempt to follow an autotools-like
[build api](https://github.com/cgwalters/build-api).

This module should make it easy to plug flatpak support into a electron or nw.js
app packaging phase.

## Usage

### bundle(manifest, buildOptions, callback)

`flatpak-bundler` provides a single method, `bundle`, which takes an app
manifest, a build options object, and a completion callback.

Both the manifest and options objects support both camelCase and dash-separated
variants of any option.

The callback with be called with `callback(error, finalBuildOptions)` arguments.
The finalBuildOptions contains the build options after default values have been
applied. Useful to read out the workingDir, for example.

### Manifest
This matches the format for flatpak-builder app manifests, with a few extra
options added and camelCase variants supported. For complete documentation
of the manifest format read the [flatpak-builder docs](http://flatpak.org/flatpak/flatpak-docs.html#flatpak-builder).

 - **id**: Required. The application id.
 - **runtime**: Required. The runtime for your flatpak application.
 - **sdk**: Required. The sdk for your flatpak application.
 - **base**: An app to inherit from. Use the app as a "base" for `/app`
   contents.
 - **finishArgs**: The arguments to pass to `flatpak build-finish`. Use this to
   add sandbox permissions. See the [Electron app example](#electron-app) for
   some common app permissions.
 - **modules**: If you need to build other software modules into you flatpak app
   (anything not already in your runtime or base app), you can specify them
   here.

In addition to standard manifest options, the following extra options are
supported.
 - **files**: Files to copy directly into the app. Should be a list of [source,
   dest] tuples. Source should be a relative/absolute path to a file/directory
   to copy into the flatpak, and dest should be the path inside the app install
   prefix (e.g. `/share/applications/`)
 - **symlinks**: Symlinks to create in the app files. Should be a list of
   [target, location] symlink tuples. Target can be either a relative or
   absolute path inside the app install prefix, and location should be a
   absolute path inside the prefix to create the symlink at.
 - **extraExports**: Files to export outside of the flatpak sandbox, in addition
   to the application desktop file, icons and appstream. File basename *must*
   be prefixed with the app id. Should not be needed for common use.
 - **runtimeFlatpakref**: A pathname or url to a flatpakref file to use to auto
   install the runtime.
 - **sdkFlatpakref**: A pathname or url to a flatpakref file to use to auto
   install the sdk.
 - **baseFlatpakref**: A pathname or url to a flatpakref file to use to auto
   install the base app.

### Build Options
 - **bundlePath**: Output location for a single file version of the flatpak. If
   non supplied, the single file flatpak will not be created.
 - **arch**: The architecture for the flatpak bundle. x86_64, i386 or arm.
 - **workingDir**: The working directory to call `flatpak-builder` from.
   Defaults to a new tmp directory.
 - **buildDir**: The directory to build the application in. Defaults to
   `${workingDir}/build`
 - **repoDir**: The directory for a flatpak repo, can be used to publish to an
   existing repo. Defaults to `${workingDir}/repo`
 - **cleanTmpdirs**: Cleanup any tmp directories created during the build on
   process exit. Defaults to true. Set false for easier debugging.
 - **autoInstallRuntime**: Install/update the runtime while building. Defaults
   to true if runtimeFlatpakref is set in the manifest.
 - **autoInstallSdk**: Install/update the sdk while building. Defaults
   to true if sdkFlatpakref is set in the manifest.
 - **autoInstallBase**: Install/update the base app while building. Defaults
   to true if baseFlatpakref is set in the manifest.
 - **gpgSign**: The gpg key to use to sign the flatpak repo and bundle file.
 - **gpgHomedir**: The gpg homedir to use when signing.
 - **subject**: The single line subject to use for the flatpak repo commit
   message.
 - **body**: The description to use for the flatpak repo commit message.
 - **bundleRepoUrl**: Repo url for the single file bundle. Installing the bundle
   will automatically configure a remote for this URL.
 - **extraFlatpakBuilderArgs**: List of extra arguments to pass to the
   [flatpak-builder](http://flatpak.org/flatpak/flatpak-docs.html#flatpak-builder) command.
 - **extraFlatpakBuildExportArgs**: List of extra arguments to pass to the
   [flatpak build-export](http://flatpak.org/flatpak/flatpak-docs.html#flatpak-build-export) command.
 - **extraFlatpakBuildBundleArgs**: List of extra arguments to pass to the
   [flatpak build-bundle](http://flatpak.org/flatpak/flatpak-docs.html#flatpak-build-bundle) command.

### Logging
To turn on debugging output set the DEBUG environment variable
```
DEBUG=flatpak-bundler npm run my-flatpak-command
```

## Examples

#### Hello world

```js
// Write a hello world script to disk
const fs = require('fs')
fs.writeFileSync('hello',
`#!/bin/bash
echo "Hello, world!"`, { mode: 0o755 })

// Make a flapak with it!
const flatpakBundler = require('flatpak-bundler')
flatpakBundler.bundle({
  id: 'org.world.Hello',
  runtime: 'org.freedesktop.Platform',
  runtimeVersion: '1.4',
  runtimeFlatpakref: 'https://raw.githubusercontent.com/endlessm/flatpak-bundler/master/refs/freedesktop-runtime-1.4.flatpakref',
  sdk: 'org.freedesktop.Sdk',
  files: [
    ['hello', '/bin/hello']
  ]
}, {
  bundlePath: 'hello.flatpak'
}, function (error) {
  if (error) {
    console.error('Error building flatpak', error)
    return
  }
  console.log('Flatpak built successfully')
})
```

#### Electron app

```js
const flatpakBundler = require('flatpak-bundler')

flatpakBundler.bundle({ // Manifest
  id: 'org.world.Hello',
  base: 'io.atom.electron.BaseApp', // Electron base application
  baseFlatpakref: FIXME, // So we can auto install the runtime
  runtime: 'org.freedesktop.Platform', // Use the freedesktop runtime
  runtimeVersion: '1.4',
  runtimeFlatpakref: 'https://raw.githubusercontent.com/endlessm/flatpak-bundler/master/refs/freedesktop-runtime-1.4.flatpakref',
  sdk: 'org.freedesktop.Sdk',
  files: [
    [ 'static/linux', '/share/' ], // Desktop file and icons
    [ packagedFileDir, '/share/bar' ] // Application binaries and assets
  ],
  symlinks: [
    [ '/share/bar/Bar', '/bin/Bar' ] // Create a symlink in /bin to to app executable
  ],
  finishArgs: [
    '--share=ipc', '--socket=x11', // Allow app to show windows with X11
    '--socket=pulseaudio', // Allow audio output
    '--filesystem=home', // Allow access to users home directory
    '--share=network', // Allow network access
    '--device=dri' // Allow OpenGL rendering
  ],
  renameDesktopFile: 'hello.desktop', // Rename the desktop file to agree with the app id so flatpak will export it
  renameIcon: 'hello' // Rename the icon to agree with the app id so flatpak will export it
}, { // Build options
  arch: 'x86_64',
  bundlePath: 'dist/hello_x86_64.flatpak',
  gpgSign: '1234ABCD' // Gpg key to sign with
}, function (error, finalAppOptions, finalBuildOptions) { // Callback
  if (error) {
    console.error('Error building flatpak')
    console.error(error)
    return
  }
  console.log('Flatpak built successfully.')
  console.log('Build dir and repo in ' + finalBuildOptions.workingDir)
})
```
