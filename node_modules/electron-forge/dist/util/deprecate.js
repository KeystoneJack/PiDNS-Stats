'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('colors');

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = what => ({
  replaceWith: replacement => {
    console.warn(_logSymbols2.default.warning, `WARNING: ${what} is deprecated, please use ${replacement} instead`.yellow);
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvZGVwcmVjYXRlLmpzIl0sIm5hbWVzIjpbIndoYXQiLCJyZXBsYWNlV2l0aCIsInJlcGxhY2VtZW50IiwiY29uc29sZSIsIndhcm4iLCJsb2dTeW1ib2xzIiwid2FybmluZyIsInllbGxvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztrQkFFZUEsU0FBUztBQUN0QkMsZUFBY0MsV0FBRCxJQUFpQjtBQUM1QkMsWUFBUUMsSUFBUixDQUFhQyxxQkFBV0MsT0FBeEIsRUFBa0MsWUFBV04sSUFBSyw4QkFBNkJFLFdBQVksVUFBMUQsQ0FBb0VLLE1BQXJHO0FBQ0Q7QUFIcUIsQ0FBVCxDIiwiZmlsZSI6InV0aWwvZGVwcmVjYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjb2xvcnMnO1xuaW1wb3J0IGxvZ1N5bWJvbHMgZnJvbSAnbG9nLXN5bWJvbHMnO1xuXG5leHBvcnQgZGVmYXVsdCB3aGF0ID0+ICh7XG4gIHJlcGxhY2VXaXRoOiAocmVwbGFjZW1lbnQpID0+IHtcbiAgICBjb25zb2xlLndhcm4obG9nU3ltYm9scy53YXJuaW5nLCBgV0FSTklORzogJHt3aGF0fSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlICR7cmVwbGFjZW1lbnR9IGluc3RlYWRgLnllbGxvdyk7XG4gIH0sXG59KTtcbiJdfQ==