'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fakeOra = undefined;

require('colors');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:lifecycle');

const useFakeOra = process.env.DEBUG && process.env.DEBUG.includes('electron-forge');

if (useFakeOra) {
  console.warn('WARNING: DEBUG environment variable detected.  Progress indicators will be sent over electron-forge:lifecycle'.red);
}

const fakeOra = exports.fakeOra = name => {
  const fake = {
    start: () => {
      d('Process Started:', name);
      return fake;
    },
    warn: msg => {
      console.warn(_logSymbols2.default.warning, msg.yellow);
    },
    fail: () => {
      d(`Process Failed: ${name}`.red);
      return fake;
    },
    succeed: () => {
      d('Process Succeeded:', name);
      return fake;
    },
    stop: () => {
      d('Process Stopped:', name);
      return fake;
    }
  };
  return fake;
};

exports.default = useFakeOra ? fakeOra : _ora2.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvb3JhLmpzIl0sIm5hbWVzIjpbImQiLCJ1c2VGYWtlT3JhIiwicHJvY2VzcyIsImVudiIsIkRFQlVHIiwiaW5jbHVkZXMiLCJjb25zb2xlIiwid2FybiIsInJlZCIsImZha2VPcmEiLCJuYW1lIiwiZmFrZSIsInN0YXJ0IiwibXNnIiwibG9nU3ltYm9scyIsIndhcm5pbmciLCJ5ZWxsb3ciLCJmYWlsIiwic3VjY2VlZCIsInN0b3AiLCJyZWFsT3JhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxJQUFJLHFCQUFNLDBCQUFOLENBQVY7O0FBRUEsTUFBTUMsYUFBY0MsUUFBUUMsR0FBUixDQUFZQyxLQUFaLElBQXFCRixRQUFRQyxHQUFSLENBQVlDLEtBQVosQ0FBa0JDLFFBQWxCLENBQTJCLGdCQUEzQixDQUF6Qzs7QUFFQSxJQUFJSixVQUFKLEVBQWdCO0FBQ2RLLFVBQVFDLElBQVIsQ0FBYSxnSEFBZ0hDLEdBQTdIO0FBQ0Q7O0FBRU0sTUFBTUMsNEJBQVdDLElBQUQsSUFBVTtBQUMvQixRQUFNQyxPQUFPO0FBQ1hDLFdBQU8sTUFBTTtBQUNYWixRQUFFLGtCQUFGLEVBQXNCVSxJQUF0QjtBQUNBLGFBQU9DLElBQVA7QUFDRCxLQUpVO0FBS1hKLFVBQU9NLEdBQUQsSUFBUztBQUNiUCxjQUFRQyxJQUFSLENBQWFPLHFCQUFXQyxPQUF4QixFQUFpQ0YsSUFBSUcsTUFBckM7QUFDRCxLQVBVO0FBUVhDLFVBQU0sTUFBTTtBQUNWakIsUUFBRyxtQkFBa0JVLElBQUssRUFBeEIsQ0FBMEJGLEdBQTVCO0FBQ0EsYUFBT0csSUFBUDtBQUNELEtBWFU7QUFZWE8sYUFBUyxNQUFNO0FBQ2JsQixRQUFFLG9CQUFGLEVBQXdCVSxJQUF4QjtBQUNBLGFBQU9DLElBQVA7QUFDRCxLQWZVO0FBZ0JYUSxVQUFNLE1BQU07QUFDVm5CLFFBQUUsa0JBQUYsRUFBc0JVLElBQXRCO0FBQ0EsYUFBT0MsSUFBUDtBQUNEO0FBbkJVLEdBQWI7QUFxQkEsU0FBT0EsSUFBUDtBQUNELENBdkJNOztrQkF5QlFWLGFBQWFRLE9BQWIsR0FBdUJXLGEiLCJmaWxlIjoidXRpbC9vcmEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2NvbG9ycyc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGxvZ1N5bWJvbHMgZnJvbSAnbG9nLXN5bWJvbHMnO1xuaW1wb3J0IHJlYWxPcmEgZnJvbSAnb3JhJztcblxuY29uc3QgZCA9IGRlYnVnKCdlbGVjdHJvbi1mb3JnZTpsaWZlY3ljbGUnKTtcblxuY29uc3QgdXNlRmFrZU9yYSA9IChwcm9jZXNzLmVudi5ERUJVRyAmJiBwcm9jZXNzLmVudi5ERUJVRy5pbmNsdWRlcygnZWxlY3Ryb24tZm9yZ2UnKSk7XG5cbmlmICh1c2VGYWtlT3JhKSB7XG4gIGNvbnNvbGUud2FybignV0FSTklORzogREVCVUcgZW52aXJvbm1lbnQgdmFyaWFibGUgZGV0ZWN0ZWQuICBQcm9ncmVzcyBpbmRpY2F0b3JzIHdpbGwgYmUgc2VudCBvdmVyIGVsZWN0cm9uLWZvcmdlOmxpZmVjeWNsZScucmVkKTtcbn1cblxuZXhwb3J0IGNvbnN0IGZha2VPcmEgPSAobmFtZSkgPT4ge1xuICBjb25zdCBmYWtlID0ge1xuICAgIHN0YXJ0OiAoKSA9PiB7XG4gICAgICBkKCdQcm9jZXNzIFN0YXJ0ZWQ6JywgbmFtZSk7XG4gICAgICByZXR1cm4gZmFrZTtcbiAgICB9LFxuICAgIHdhcm46IChtc2cpID0+IHtcbiAgICAgIGNvbnNvbGUud2Fybihsb2dTeW1ib2xzLndhcm5pbmcsIG1zZy55ZWxsb3cpO1xuICAgIH0sXG4gICAgZmFpbDogKCkgPT4ge1xuICAgICAgZChgUHJvY2VzcyBGYWlsZWQ6ICR7bmFtZX1gLnJlZCk7XG4gICAgICByZXR1cm4gZmFrZTtcbiAgICB9LFxuICAgIHN1Y2NlZWQ6ICgpID0+IHtcbiAgICAgIGQoJ1Byb2Nlc3MgU3VjY2VlZGVkOicsIG5hbWUpO1xuICAgICAgcmV0dXJuIGZha2U7XG4gICAgfSxcbiAgICBzdG9wOiAoKSA9PiB7XG4gICAgICBkKCdQcm9jZXNzIFN0b3BwZWQ6JywgbmFtZSk7XG4gICAgICByZXR1cm4gZmFrZTtcbiAgICB9LFxuICB9O1xuICByZXR1cm4gZmFrZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUZha2VPcmEgPyBmYWtlT3JhIDogcmVhbE9yYTtcbiJdfQ==