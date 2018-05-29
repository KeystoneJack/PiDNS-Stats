'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (interactive, message, defaultValue = true) {
    if (interactive) {
      return (yield _inquirer2.default.createPromptModule()({
        type: 'confirm',
        name: 'confirm',
        message
      })).confirm;
    }
    return defaultValue;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvY29uZmlybS1pZi1pbnRlcmFjdGl2ZS5qcyJdLCJuYW1lcyI6WyJpbnRlcmFjdGl2ZSIsIm1lc3NhZ2UiLCJkZWZhdWx0VmFsdWUiLCJpbnF1aXJlciIsImNyZWF0ZVByb21wdE1vZHVsZSIsInR5cGUiLCJuYW1lIiwiY29uZmlybSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7OztzQ0FFZSxXQUFPQSxXQUFQLEVBQW9CQyxPQUFwQixFQUE2QkMsZUFBZSxJQUE1QyxFQUFxRDtBQUNsRSxRQUFJRixXQUFKLEVBQWlCO0FBQ2YsYUFBTyxDQUFDLE1BQU1HLG1CQUFTQyxrQkFBVCxHQUE4QjtBQUMxQ0MsY0FBTSxTQURvQztBQUUxQ0MsY0FBTSxTQUZvQztBQUcxQ0w7QUFIMEMsT0FBOUIsQ0FBUCxFQUlITSxPQUpKO0FBS0Q7QUFDRCxXQUFPTCxZQUFQO0FBQ0QsRyIsImZpbGUiOiJ1dGlsL2NvbmZpcm0taWYtaW50ZXJhY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaW5xdWlyZXIgZnJvbSAnaW5xdWlyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoaW50ZXJhY3RpdmUsIG1lc3NhZ2UsIGRlZmF1bHRWYWx1ZSA9IHRydWUpID0+IHtcbiAgaWYgKGludGVyYWN0aXZlKSB7XG4gICAgcmV0dXJuIChhd2FpdCBpbnF1aXJlci5jcmVhdGVQcm9tcHRNb2R1bGUoKSh7XG4gICAgICB0eXBlOiAnY29uZmlybScsXG4gICAgICBuYW1lOiAnY29uZmlybScsXG4gICAgICBtZXNzYWdlLFxuICAgIH0pKS5jb25maXJtO1xuICB9XG4gIHJldHVybiBkZWZhdWx0VmFsdWU7XG59O1xuIl19