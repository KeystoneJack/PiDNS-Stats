'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _ora = require('./ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MockOra {
  succeed() {
    return this;
  }
  fail() {
    return this;
  }
  start() {
    return this;
  }
  stop() {
    return this;
  }
}

const asyncOra = (initialOraValue, asyncFn, processExitFn = process.exit) => {
  let fnOra = new MockOra();
  if (asyncOra.interactive) {
    fnOra = (0, _ora2.default)(initialOraValue).start();
  }
  return new _promise2.default((resolve, reject) => {
    asyncFn(fnOra).then(() => {
      fnOra.succeed();
      resolve();
    }).catch(err => {
      fnOra.fail();
      if (asyncOra.interactive) {
        if (err && err.message && err.stack) {
          console.error('\nAn unhandled error has occurred inside Forge:'.red);
          console.error(_colors2.default.red(err.message));
          console.error(_colors2.default.red(err.stack));
        } else {
          console.error('\nElectron forge was terminated:'.red);
          console.error(_colors2.default.red(typeof err === 'string' ? err : (0, _stringify2.default)(err)));
        }
        processExitFn(1);
        // If the process is still alive we should continue because either something went really wrong
        // or we are testing this function
        setTimeout(() => resolve(), 500);
      } else {
        reject(err);
      }
    });
  });
};

asyncOra.interactive = true;

exports.default = asyncOra;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvb3JhLWhhbmRsZXIuanMiXSwibmFtZXMiOlsiTW9ja09yYSIsInN1Y2NlZWQiLCJmYWlsIiwic3RhcnQiLCJzdG9wIiwiYXN5bmNPcmEiLCJpbml0aWFsT3JhVmFsdWUiLCJhc3luY0ZuIiwicHJvY2Vzc0V4aXRGbiIsInByb2Nlc3MiLCJleGl0IiwiZm5PcmEiLCJpbnRlcmFjdGl2ZSIsInJlc29sdmUiLCJyZWplY3QiLCJ0aGVuIiwiY2F0Y2giLCJlcnIiLCJtZXNzYWdlIiwic3RhY2siLCJjb25zb2xlIiwiZXJyb3IiLCJyZWQiLCJjb2xvcnMiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLE9BQU4sQ0FBYztBQUNaQyxZQUFVO0FBQUUsV0FBTyxJQUFQO0FBQWM7QUFDMUJDLFNBQU87QUFBRSxXQUFPLElBQVA7QUFBYztBQUN2QkMsVUFBUTtBQUFFLFdBQU8sSUFBUDtBQUFjO0FBQ3hCQyxTQUFPO0FBQUUsV0FBTyxJQUFQO0FBQWM7QUFKWDs7QUFPZCxNQUFNQyxXQUFXLENBQUNDLGVBQUQsRUFBa0JDLE9BQWxCLEVBQTJCQyxnQkFBZ0JDLFFBQVFDLElBQW5ELEtBQTREO0FBQzNFLE1BQUlDLFFBQVEsSUFBSVgsT0FBSixFQUFaO0FBQ0EsTUFBSUssU0FBU08sV0FBYixFQUEwQjtBQUN4QkQsWUFBUSxtQkFBSUwsZUFBSixFQUFxQkgsS0FBckIsRUFBUjtBQUNEO0FBQ0QsU0FBTyxzQkFBWSxDQUFDVSxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDdENQLFlBQVFJLEtBQVIsRUFBZUksSUFBZixDQUFvQixNQUFNO0FBQ3hCSixZQUFNVixPQUFOO0FBQ0FZO0FBQ0QsS0FIRCxFQUdHRyxLQUhILENBR1VDLEdBQUQsSUFBUztBQUNoQk4sWUFBTVQsSUFBTjtBQUNBLFVBQUlHLFNBQVNPLFdBQWIsRUFBMEI7QUFDeEIsWUFBSUssT0FBT0EsSUFBSUMsT0FBWCxJQUFzQkQsSUFBSUUsS0FBOUIsRUFBcUM7QUFDbkNDLGtCQUFRQyxLQUFSLENBQWMsa0RBQWtEQyxHQUFoRTtBQUNBRixrQkFBUUMsS0FBUixDQUFjRSxpQkFBT0QsR0FBUCxDQUFXTCxJQUFJQyxPQUFmLENBQWQ7QUFDQUUsa0JBQVFDLEtBQVIsQ0FBY0UsaUJBQU9ELEdBQVAsQ0FBV0wsSUFBSUUsS0FBZixDQUFkO0FBQ0QsU0FKRCxNQUlPO0FBQ0xDLGtCQUFRQyxLQUFSLENBQWMsbUNBQW1DQyxHQUFqRDtBQUNBRixrQkFBUUMsS0FBUixDQUFjRSxpQkFBT0QsR0FBUCxDQUFXLE9BQU9MLEdBQVAsS0FBZSxRQUFmLEdBQTBCQSxHQUExQixHQUFnQyx5QkFBZUEsR0FBZixDQUEzQyxDQUFkO0FBQ0Q7QUFDRFQsc0JBQWMsQ0FBZDtBQUNBO0FBQ0E7QUFDQWdCLG1CQUFXLE1BQU1YLFNBQWpCLEVBQTRCLEdBQTVCO0FBQ0QsT0FiRCxNQWFPO0FBQ0xDLGVBQU9HLEdBQVA7QUFDRDtBQUNGLEtBckJEO0FBc0JELEdBdkJNLENBQVA7QUF3QkQsQ0E3QkQ7O0FBK0JBWixTQUFTTyxXQUFULEdBQXVCLElBQXZCOztrQkFFZVAsUSIsImZpbGUiOiJ1dGlsL29yYS1oYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbG9ycyBmcm9tICdjb2xvcnMnO1xuaW1wb3J0IG9yYSBmcm9tICcuL29yYSc7XG5cbmNsYXNzIE1vY2tPcmEge1xuICBzdWNjZWVkKCkgeyByZXR1cm4gdGhpczsgfVxuICBmYWlsKCkgeyByZXR1cm4gdGhpczsgfVxuICBzdGFydCgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgc3RvcCgpIHsgcmV0dXJuIHRoaXM7IH1cbn1cblxuY29uc3QgYXN5bmNPcmEgPSAoaW5pdGlhbE9yYVZhbHVlLCBhc3luY0ZuLCBwcm9jZXNzRXhpdEZuID0gcHJvY2Vzcy5leGl0KSA9PiB7XG4gIGxldCBmbk9yYSA9IG5ldyBNb2NrT3JhKCk7XG4gIGlmIChhc3luY09yYS5pbnRlcmFjdGl2ZSkge1xuICAgIGZuT3JhID0gb3JhKGluaXRpYWxPcmFWYWx1ZSkuc3RhcnQoKTtcbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGFzeW5jRm4oZm5PcmEpLnRoZW4oKCkgPT4ge1xuICAgICAgZm5PcmEuc3VjY2VlZCgpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGZuT3JhLmZhaWwoKTtcbiAgICAgIGlmIChhc3luY09yYS5pbnRlcmFjdGl2ZSkge1xuICAgICAgICBpZiAoZXJyICYmIGVyci5tZXNzYWdlICYmIGVyci5zdGFjaykge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1xcbkFuIHVuaGFuZGxlZCBlcnJvciBoYXMgb2NjdXJyZWQgaW5zaWRlIEZvcmdlOicucmVkKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGNvbG9ycy5yZWQoZXJyLm1lc3NhZ2UpKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGNvbG9ycy5yZWQoZXJyLnN0YWNrKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignXFxuRWxlY3Ryb24gZm9yZ2Ugd2FzIHRlcm1pbmF0ZWQ6Jy5yZWQpO1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY29sb3JzLnJlZCh0eXBlb2YgZXJyID09PSAnc3RyaW5nJyA/IGVyciA6IEpTT04uc3RyaW5naWZ5KGVycikpKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9jZXNzRXhpdEZuKDEpO1xuICAgICAgICAvLyBJZiB0aGUgcHJvY2VzcyBpcyBzdGlsbCBhbGl2ZSB3ZSBzaG91bGQgY29udGludWUgYmVjYXVzZSBlaXRoZXIgc29tZXRoaW5nIHdlbnQgcmVhbGx5IHdyb25nXG4gICAgICAgIC8vIG9yIHdlIGFyZSB0ZXN0aW5nIHRoaXMgZnVuY3Rpb25cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiByZXNvbHZlKCksIDUwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5hc3luY09yYS5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jT3JhO1xuIl19