'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _bluebird = require('bluebird');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

require('./util/terminate');

var _api = require('./api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _bluebird.coroutine)(function* () {
  let commandArgs = process.argv;
  let appArgs;

  const doubleDashIndex = process.argv.indexOf('--');
  if (doubleDashIndex !== -1) {
    commandArgs = process.argv.slice(0, doubleDashIndex);
    appArgs = process.argv.slice(doubleDashIndex + 1);
  }

  let dir = process.cwd();
  _commander2.default.version(require('../package.json').version).arguments('[cwd]').option('-p, --app-path <path>', "Override the path to the Electron app to launch (defaults to '.')").option('-l, --enable-logging', 'Enable advanced logging.  This will log internal Electron things').option('-n, --run-as-node', 'Run the Electron app as a Node.JS script').option('--vscode', 'Used to enable arg transformation for debugging Electron through VSCode.  Do not use yourself.').option('-i, --inspect-electron', 'Triggers inspect mode on Electron to allow debugging the main process.  Electron >1.7 only').action(function (cwd) {
    if (!cwd) return;
    if (_path2.default.isAbsolute(cwd) && _fsExtra2.default.existsSync(cwd)) {
      dir = cwd;
    } else if (_fsExtra2.default.existsSync(_path2.default.resolve(dir, cwd))) {
      dir = _path2.default.resolve(dir, cwd);
    }
  }).parse(commandArgs);

  _commander2.default.on('--help', function () {
    console.log("  Any arguments found after '--' will be passed to the Electron app, e.g.");
    console.log('');
    console.log('    $ electron-forge /path/to/project -l -- -d -f foo.txt');
    console.log('');
    console.log("  will pass the arguments '-d -f foo.txt' to the Electron app");
  });

  const opts = {
    dir,
    interactive: true,
    enableLogging: !!_commander2.default.enableLogging,
    runAsNode: !!_commander2.default.runAsNode,
    inspect: !!_commander2.default.inspectElectron
  };

  if (_commander2.default.vscode && appArgs) {
    // Args are in the format ~arg~ so we need to strip the "~"
    appArgs = appArgs.map(function (arg) {
      return arg.substr(1, arg.length - 2);
    }).filter(function (arg) {
      return arg.length > 0;
    });
  }

  if (_commander2.default.appPath) opts.appPath = _commander2.default.appPath;
  if (appArgs) opts.args = appArgs;

  const spawned = yield (0, _api.start)(opts);

  yield new _promise2.default(function (resolve) {
    spawned.on('exit', function (code) {
      if (code !== 0) {
        process.exit(code);
      }
      resolve();
    });
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZWN0cm9uLWZvcmdlLXN0YXJ0LmpzIl0sIm5hbWVzIjpbImNvbW1hbmRBcmdzIiwicHJvY2VzcyIsImFyZ3YiLCJhcHBBcmdzIiwiZG91YmxlRGFzaEluZGV4IiwiaW5kZXhPZiIsInNsaWNlIiwiZGlyIiwiY3dkIiwicHJvZ3JhbSIsInZlcnNpb24iLCJyZXF1aXJlIiwiYXJndW1lbnRzIiwib3B0aW9uIiwiYWN0aW9uIiwicGF0aCIsImlzQWJzb2x1dGUiLCJmcyIsImV4aXN0c1N5bmMiLCJyZXNvbHZlIiwicGFyc2UiLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJvcHRzIiwiaW50ZXJhY3RpdmUiLCJlbmFibGVMb2dnaW5nIiwicnVuQXNOb2RlIiwiaW5zcGVjdCIsImluc3BlY3RFbGVjdHJvbiIsInZzY29kZSIsIm1hcCIsImFyZyIsInN1YnN0ciIsImxlbmd0aCIsImZpbHRlciIsImFwcFBhdGgiLCJhcmdzIiwic3Bhd25lZCIsImNvZGUiLCJleGl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBRUEseUJBQUMsYUFBWTtBQUNYLE1BQUlBLGNBQWNDLFFBQVFDLElBQTFCO0FBQ0EsTUFBSUMsT0FBSjs7QUFFQSxRQUFNQyxrQkFBa0JILFFBQVFDLElBQVIsQ0FBYUcsT0FBYixDQUFxQixJQUFyQixDQUF4QjtBQUNBLE1BQUlELG9CQUFvQixDQUFDLENBQXpCLEVBQTRCO0FBQzFCSixrQkFBY0MsUUFBUUMsSUFBUixDQUFhSSxLQUFiLENBQW1CLENBQW5CLEVBQXNCRixlQUF0QixDQUFkO0FBQ0FELGNBQVVGLFFBQVFDLElBQVIsQ0FBYUksS0FBYixDQUFtQkYsa0JBQWtCLENBQXJDLENBQVY7QUFDRDs7QUFFRCxNQUFJRyxNQUFNTixRQUFRTyxHQUFSLEVBQVY7QUFDQUMsc0JBQ0dDLE9BREgsQ0FDV0MsUUFBUSxpQkFBUixFQUEyQkQsT0FEdEMsRUFFR0UsU0FGSCxDQUVhLE9BRmIsRUFHR0MsTUFISCxDQUdVLHVCQUhWLEVBR21DLG1FQUhuQyxFQUlHQSxNQUpILENBSVUsc0JBSlYsRUFJa0Msa0VBSmxDLEVBS0dBLE1BTEgsQ0FLVSxtQkFMVixFQUsrQiwwQ0FML0IsRUFNR0EsTUFOSCxDQU1VLFVBTlYsRUFNc0IsZ0dBTnRCLEVBT0dBLE1BUEgsQ0FPVSx3QkFQVixFQU9vQyw0RkFQcEMsRUFRR0MsTUFSSCxDQVFVLFVBQUNOLEdBQUQsRUFBUztBQUNmLFFBQUksQ0FBQ0EsR0FBTCxFQUFVO0FBQ1YsUUFBSU8sZUFBS0MsVUFBTCxDQUFnQlIsR0FBaEIsS0FBd0JTLGtCQUFHQyxVQUFILENBQWNWLEdBQWQsQ0FBNUIsRUFBZ0Q7QUFDOUNELFlBQU1DLEdBQU47QUFDRCxLQUZELE1BRU8sSUFBSVMsa0JBQUdDLFVBQUgsQ0FBY0gsZUFBS0ksT0FBTCxDQUFhWixHQUFiLEVBQWtCQyxHQUFsQixDQUFkLENBQUosRUFBMkM7QUFDaERELFlBQU1RLGVBQUtJLE9BQUwsQ0FBYVosR0FBYixFQUFrQkMsR0FBbEIsQ0FBTjtBQUNEO0FBQ0YsR0FmSCxFQWdCR1ksS0FoQkgsQ0FnQlNwQixXQWhCVDs7QUFrQkFTLHNCQUFRWSxFQUFSLENBQVcsUUFBWCxFQUFxQixZQUFNO0FBQ3pCQyxZQUFRQyxHQUFSLENBQVksMkVBQVo7QUFDQUQsWUFBUUMsR0FBUixDQUFZLEVBQVo7QUFDQUQsWUFBUUMsR0FBUixDQUFZLDJEQUFaO0FBQ0FELFlBQVFDLEdBQVIsQ0FBWSxFQUFaO0FBQ0FELFlBQVFDLEdBQVIsQ0FBWSwrREFBWjtBQUNELEdBTkQ7O0FBUUEsUUFBTUMsT0FBTztBQUNYakIsT0FEVztBQUVYa0IsaUJBQWEsSUFGRjtBQUdYQyxtQkFBZSxDQUFDLENBQUNqQixvQkFBUWlCLGFBSGQ7QUFJWEMsZUFBVyxDQUFDLENBQUNsQixvQkFBUWtCLFNBSlY7QUFLWEMsYUFBUyxDQUFDLENBQUNuQixvQkFBUW9CO0FBTFIsR0FBYjs7QUFRQSxNQUFJcEIsb0JBQVFxQixNQUFSLElBQWtCM0IsT0FBdEIsRUFBK0I7QUFDN0I7QUFDQUEsY0FBVUEsUUFDUDRCLEdBRE8sQ0FDSDtBQUFBLGFBQU9DLElBQUlDLE1BQUosQ0FBVyxDQUFYLEVBQWNELElBQUlFLE1BQUosR0FBYSxDQUEzQixDQUFQO0FBQUEsS0FERyxFQUVQQyxNQUZPLENBRUE7QUFBQSxhQUFPSCxJQUFJRSxNQUFKLEdBQWEsQ0FBcEI7QUFBQSxLQUZBLENBQVY7QUFHRDs7QUFFRCxNQUFJekIsb0JBQVEyQixPQUFaLEVBQXFCWixLQUFLWSxPQUFMLEdBQWUzQixvQkFBUTJCLE9BQXZCO0FBQ3JCLE1BQUlqQyxPQUFKLEVBQWFxQixLQUFLYSxJQUFMLEdBQVlsQyxPQUFaOztBQUViLFFBQU1tQyxVQUFVLE1BQU0sZ0JBQU1kLElBQU4sQ0FBdEI7O0FBRUEsUUFBTSxzQkFBWSxVQUFDTCxPQUFELEVBQWE7QUFDN0JtQixZQUFRakIsRUFBUixDQUFXLE1BQVgsRUFBbUIsVUFBQ2tCLElBQUQsRUFBVTtBQUMzQixVQUFJQSxTQUFTLENBQWIsRUFBZ0I7QUFDZHRDLGdCQUFRdUMsSUFBUixDQUFhRCxJQUFiO0FBQ0Q7QUFDRHBCO0FBQ0QsS0FMRDtBQU1ELEdBUEssQ0FBTjtBQVFELENBakVEIiwiZmlsZSI6ImVsZWN0cm9uLWZvcmdlLXN0YXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcblxuaW1wb3J0ICcuL3V0aWwvdGVybWluYXRlJztcbmltcG9ydCB7IHN0YXJ0IH0gZnJvbSAnLi9hcGknO1xuXG4oYXN5bmMgKCkgPT4ge1xuICBsZXQgY29tbWFuZEFyZ3MgPSBwcm9jZXNzLmFyZ3Y7XG4gIGxldCBhcHBBcmdzO1xuXG4gIGNvbnN0IGRvdWJsZURhc2hJbmRleCA9IHByb2Nlc3MuYXJndi5pbmRleE9mKCctLScpO1xuICBpZiAoZG91YmxlRGFzaEluZGV4ICE9PSAtMSkge1xuICAgIGNvbW1hbmRBcmdzID0gcHJvY2Vzcy5hcmd2LnNsaWNlKDAsIGRvdWJsZURhc2hJbmRleCk7XG4gICAgYXBwQXJncyA9IHByb2Nlc3MuYXJndi5zbGljZShkb3VibGVEYXNoSW5kZXggKyAxKTtcbiAgfVxuXG4gIGxldCBkaXIgPSBwcm9jZXNzLmN3ZCgpO1xuICBwcm9ncmFtXG4gICAgLnZlcnNpb24ocmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJykudmVyc2lvbilcbiAgICAuYXJndW1lbnRzKCdbY3dkXScpXG4gICAgLm9wdGlvbignLXAsIC0tYXBwLXBhdGggPHBhdGg+JywgXCJPdmVycmlkZSB0aGUgcGF0aCB0byB0aGUgRWxlY3Ryb24gYXBwIHRvIGxhdW5jaCAoZGVmYXVsdHMgdG8gJy4nKVwiKVxuICAgIC5vcHRpb24oJy1sLCAtLWVuYWJsZS1sb2dnaW5nJywgJ0VuYWJsZSBhZHZhbmNlZCBsb2dnaW5nLiAgVGhpcyB3aWxsIGxvZyBpbnRlcm5hbCBFbGVjdHJvbiB0aGluZ3MnKVxuICAgIC5vcHRpb24oJy1uLCAtLXJ1bi1hcy1ub2RlJywgJ1J1biB0aGUgRWxlY3Ryb24gYXBwIGFzIGEgTm9kZS5KUyBzY3JpcHQnKVxuICAgIC5vcHRpb24oJy0tdnNjb2RlJywgJ1VzZWQgdG8gZW5hYmxlIGFyZyB0cmFuc2Zvcm1hdGlvbiBmb3IgZGVidWdnaW5nIEVsZWN0cm9uIHRocm91Z2ggVlNDb2RlLiAgRG8gbm90IHVzZSB5b3Vyc2VsZi4nKVxuICAgIC5vcHRpb24oJy1pLCAtLWluc3BlY3QtZWxlY3Ryb24nLCAnVHJpZ2dlcnMgaW5zcGVjdCBtb2RlIG9uIEVsZWN0cm9uIHRvIGFsbG93IGRlYnVnZ2luZyB0aGUgbWFpbiBwcm9jZXNzLiAgRWxlY3Ryb24gPjEuNyBvbmx5JylcbiAgICAuYWN0aW9uKChjd2QpID0+IHtcbiAgICAgIGlmICghY3dkKSByZXR1cm47XG4gICAgICBpZiAocGF0aC5pc0Fic29sdXRlKGN3ZCkgJiYgZnMuZXhpc3RzU3luYyhjd2QpKSB7XG4gICAgICAgIGRpciA9IGN3ZDtcbiAgICAgIH0gZWxzZSBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLnJlc29sdmUoZGlyLCBjd2QpKSkge1xuICAgICAgICBkaXIgPSBwYXRoLnJlc29sdmUoZGlyLCBjd2QpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLnBhcnNlKGNvbW1hbmRBcmdzKTtcblxuICBwcm9ncmFtLm9uKCctLWhlbHAnLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCIgIEFueSBhcmd1bWVudHMgZm91bmQgYWZ0ZXIgJy0tJyB3aWxsIGJlIHBhc3NlZCB0byB0aGUgRWxlY3Ryb24gYXBwLCBlLmcuXCIpO1xuICAgIGNvbnNvbGUubG9nKCcnKTtcbiAgICBjb25zb2xlLmxvZygnICAgICQgZWxlY3Ryb24tZm9yZ2UgL3BhdGgvdG8vcHJvamVjdCAtbCAtLSAtZCAtZiBmb28udHh0Jyk7XG4gICAgY29uc29sZS5sb2coJycpO1xuICAgIGNvbnNvbGUubG9nKFwiICB3aWxsIHBhc3MgdGhlIGFyZ3VtZW50cyAnLWQgLWYgZm9vLnR4dCcgdG8gdGhlIEVsZWN0cm9uIGFwcFwiKTtcbiAgfSk7XG5cbiAgY29uc3Qgb3B0cyA9IHtcbiAgICBkaXIsXG4gICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgZW5hYmxlTG9nZ2luZzogISFwcm9ncmFtLmVuYWJsZUxvZ2dpbmcsXG4gICAgcnVuQXNOb2RlOiAhIXByb2dyYW0ucnVuQXNOb2RlLFxuICAgIGluc3BlY3Q6ICEhcHJvZ3JhbS5pbnNwZWN0RWxlY3Ryb24sXG4gIH07XG5cbiAgaWYgKHByb2dyYW0udnNjb2RlICYmIGFwcEFyZ3MpIHtcbiAgICAvLyBBcmdzIGFyZSBpbiB0aGUgZm9ybWF0IH5hcmd+IHNvIHdlIG5lZWQgdG8gc3RyaXAgdGhlIFwiflwiXG4gICAgYXBwQXJncyA9IGFwcEFyZ3NcbiAgICAgIC5tYXAoYXJnID0+IGFyZy5zdWJzdHIoMSwgYXJnLmxlbmd0aCAtIDIpKVxuICAgICAgLmZpbHRlcihhcmcgPT4gYXJnLmxlbmd0aCA+IDApO1xuICB9XG5cbiAgaWYgKHByb2dyYW0uYXBwUGF0aCkgb3B0cy5hcHBQYXRoID0gcHJvZ3JhbS5hcHBQYXRoO1xuICBpZiAoYXBwQXJncykgb3B0cy5hcmdzID0gYXBwQXJncztcblxuICBjb25zdCBzcGF3bmVkID0gYXdhaXQgc3RhcnQob3B0cyk7XG5cbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzcGF3bmVkLm9uKCdleGl0JywgKGNvZGUpID0+IHtcbiAgICAgIGlmIChjb2RlICE9PSAwKSB7XG4gICAgICAgIHByb2Nlc3MuZXhpdChjb2RlKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfSk7XG59KSgpO1xuIl19