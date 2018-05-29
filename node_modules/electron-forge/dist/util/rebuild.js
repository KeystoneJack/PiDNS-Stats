'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bluebird = require('bluebird');

var _electronRebuild = require('electron-rebuild');

var _electronRebuild2 = _interopRequireDefault(_electronRebuild);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (buildPath, electronVersion, platform, arch, config = {}) {
    yield (0, _oraHandler2.default)('Preparing native dependencies', (() => {
      var _ref2 = (0, _bluebird.coroutine)(function* (rebuildSpinner) {
        const rebuilder = (0, _electronRebuild2.default)((0, _assign2.default)({}, config, {
          buildPath,
          electronVersion,
          arch
        }));
        const lifecycle = rebuilder.lifecycle;


        let found = 0;
        let done = 0;

        const redraw = function redraw() {
          rebuildSpinner.text = `Preparing native dependencies: ${done} / ${found}`; // eslint-disable-line
        };

        lifecycle.on('module-found', function () {
          found += 1;redraw();
        });
        lifecycle.on('module-done', function () {
          done += 1;redraw();
        });

        yield rebuilder;
      });

      return function (_x5) {
        return _ref2.apply(this, arguments);
      };
    })());
  });

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvcmVidWlsZC5qcyJdLCJuYW1lcyI6WyJidWlsZFBhdGgiLCJlbGVjdHJvblZlcnNpb24iLCJwbGF0Zm9ybSIsImFyY2giLCJjb25maWciLCJyZWJ1aWxkU3Bpbm5lciIsInJlYnVpbGRlciIsImxpZmVjeWNsZSIsImZvdW5kIiwiZG9uZSIsInJlZHJhdyIsInRleHQiLCJvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7OztzQ0FFZSxXQUFPQSxTQUFQLEVBQWtCQyxlQUFsQixFQUFtQ0MsUUFBbkMsRUFBNkNDLElBQTdDLEVBQW1EQyxTQUFTLEVBQTVELEVBQW1FO0FBQ2hGLFVBQU0sMEJBQVMsK0JBQVQ7QUFBQSwyQ0FBMEMsV0FBT0MsY0FBUCxFQUEwQjtBQUN4RSxjQUFNQyxZQUFZLCtCQUFRLHNCQUFjLEVBQWQsRUFBa0JGLE1BQWxCLEVBQTBCO0FBQ2xESixtQkFEa0Q7QUFFbERDLHlCQUZrRDtBQUdsREU7QUFIa0QsU0FBMUIsQ0FBUixDQUFsQjtBQUR3RSxjQU1oRUksU0FOZ0UsR0FNbERELFNBTmtELENBTWhFQyxTQU5nRTs7O0FBUXhFLFlBQUlDLFFBQVEsQ0FBWjtBQUNBLFlBQUlDLE9BQU8sQ0FBWDs7QUFFQSxjQUFNQyxTQUFTLFNBQVRBLE1BQVMsR0FBTTtBQUNuQkwseUJBQWVNLElBQWYsR0FBdUIsa0NBQWlDRixJQUFLLE1BQUtELEtBQU0sRUFBeEUsQ0FEbUIsQ0FDd0Q7QUFDNUUsU0FGRDs7QUFJQUQsa0JBQVVLLEVBQVYsQ0FBYSxjQUFiLEVBQTZCLFlBQU07QUFBRUosbUJBQVMsQ0FBVCxDQUFZRTtBQUFXLFNBQTVEO0FBQ0FILGtCQUFVSyxFQUFWLENBQWEsYUFBYixFQUE0QixZQUFNO0FBQUVILGtCQUFRLENBQVIsQ0FBV0M7QUFBVyxTQUExRDs7QUFFQSxjQUFNSixTQUFOO0FBQ0QsT0FuQks7O0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBTjtBQW9CRCxHIiwiZmlsZSI6InV0aWwvcmVidWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZWJ1aWxkIGZyb20gJ2VsZWN0cm9uLXJlYnVpbGQnO1xuXG5pbXBvcnQgYXN5bmNPcmEgZnJvbSAnLi4vdXRpbC9vcmEtaGFuZGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChidWlsZFBhdGgsIGVsZWN0cm9uVmVyc2lvbiwgcGxhdGZvcm0sIGFyY2gsIGNvbmZpZyA9IHt9KSA9PiB7XG4gIGF3YWl0IGFzeW5jT3JhKCdQcmVwYXJpbmcgbmF0aXZlIGRlcGVuZGVuY2llcycsIGFzeW5jIChyZWJ1aWxkU3Bpbm5lcikgPT4ge1xuICAgIGNvbnN0IHJlYnVpbGRlciA9IHJlYnVpbGQoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLCB7XG4gICAgICBidWlsZFBhdGgsXG4gICAgICBlbGVjdHJvblZlcnNpb24sXG4gICAgICBhcmNoLFxuICAgIH0pKTtcbiAgICBjb25zdCB7IGxpZmVjeWNsZSB9ID0gcmVidWlsZGVyO1xuXG4gICAgbGV0IGZvdW5kID0gMDtcbiAgICBsZXQgZG9uZSA9IDA7XG5cbiAgICBjb25zdCByZWRyYXcgPSAoKSA9PiB7XG4gICAgICByZWJ1aWxkU3Bpbm5lci50ZXh0ID0gYFByZXBhcmluZyBuYXRpdmUgZGVwZW5kZW5jaWVzOiAke2RvbmV9IC8gJHtmb3VuZH1gOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfTtcblxuICAgIGxpZmVjeWNsZS5vbignbW9kdWxlLWZvdW5kJywgKCkgPT4geyBmb3VuZCArPSAxOyByZWRyYXcoKTsgfSk7XG4gICAgbGlmZWN5Y2xlLm9uKCdtb2R1bGUtZG9uZScsICgpID0+IHsgZG9uZSArPSAxOyByZWRyYXcoKTsgfSk7XG5cbiAgICBhd2FpdCByZWJ1aWxkZXI7XG4gIH0pO1xufTtcbiJdfQ==