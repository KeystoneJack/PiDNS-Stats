'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _sudoPrompt = require('sudo-prompt');

var _sudoPrompt2 = _interopRequireDefault(_sudoPrompt);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (appPath, targetApplicationPath, spinner, copyInstead = false) {
    let writeAccess = true;
    try {
      yield _fsExtra2.default.access('/Applications', _fsExtra2.default.W_OK);
    } catch (err) {
      writeAccess = false;
    }

    if (yield _fsExtra2.default.pathExists(targetApplicationPath)) {
      spinner.stop();

      var _ref2 = yield _inquirer2.default.createPromptModule()({
        type: 'confirm',
        name: 'confirm',
        message: `The application "${_path2.default.basename(targetApplicationPath)}" appears to already exist in /Applications. Do you want to replace it?`
      });

      const confirm = _ref2.confirm;

      if (!confirm) {
        throw 'Installation stopped by user';
      } else {
        spinner.start();
        yield _fsExtra2.default.remove(targetApplicationPath);
      }
    }

    const moveCommand = `${copyInstead ? 'cp -r' : 'mv'} "${appPath}" "${targetApplicationPath}"`;
    if (writeAccess) {
      yield (0, _pify2.default)(_child_process.exec)(moveCommand);
    } else {
      yield (0, _pify2.default)(_sudoPrompt2.default.exec)(moveCommand, {
        name: 'Electron Forge'
      });
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvbW92ZS1hcHAuanMiXSwibmFtZXMiOlsiYXBwUGF0aCIsInRhcmdldEFwcGxpY2F0aW9uUGF0aCIsInNwaW5uZXIiLCJjb3B5SW5zdGVhZCIsIndyaXRlQWNjZXNzIiwiZnMiLCJhY2Nlc3MiLCJXX09LIiwiZXJyIiwicGF0aEV4aXN0cyIsInN0b3AiLCJpbnF1aXJlciIsImNyZWF0ZVByb21wdE1vZHVsZSIsInR5cGUiLCJuYW1lIiwibWVzc2FnZSIsInBhdGgiLCJiYXNlbmFtZSIsImNvbmZpcm0iLCJzdGFydCIsInJlbW92ZSIsIm1vdmVDb21tYW5kIiwiZXhlYyIsInN1ZG8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7OztzQ0FFZSxXQUFPQSxPQUFQLEVBQWdCQyxxQkFBaEIsRUFBdUNDLE9BQXZDLEVBQWdEQyxjQUFjLEtBQTlELEVBQXdFO0FBQ3JGLFFBQUlDLGNBQWMsSUFBbEI7QUFDQSxRQUFJO0FBQ0YsWUFBTUMsa0JBQUdDLE1BQUgsQ0FBVSxlQUFWLEVBQTJCRCxrQkFBR0UsSUFBOUIsQ0FBTjtBQUNELEtBRkQsQ0FFRSxPQUFPQyxHQUFQLEVBQVk7QUFDWkosb0JBQWMsS0FBZDtBQUNEOztBQUVELFFBQUksTUFBTUMsa0JBQUdJLFVBQUgsQ0FBY1IscUJBQWQsQ0FBVixFQUFnRDtBQUM5Q0MsY0FBUVEsSUFBUjs7QUFEOEMsa0JBRTFCLE1BQU1DLG1CQUFTQyxrQkFBVCxHQUE4QjtBQUN0REMsY0FBTSxTQURnRDtBQUV0REMsY0FBTSxTQUZnRDtBQUd0REMsaUJBQVUsb0JBQW1CQyxlQUFLQyxRQUFMLENBQWNoQixxQkFBZCxDQUFxQztBQUhaLE9BQTlCLENBRm9COztBQUFBLFlBRXRDaUIsT0FGc0MsU0FFdENBLE9BRnNDOztBQU85QyxVQUFJLENBQUNBLE9BQUwsRUFBYztBQUNaLGNBQU0sOEJBQU47QUFDRCxPQUZELE1BRU87QUFDTGhCLGdCQUFRaUIsS0FBUjtBQUNBLGNBQU1kLGtCQUFHZSxNQUFILENBQVVuQixxQkFBVixDQUFOO0FBQ0Q7QUFDRjs7QUFFRCxVQUFNb0IsY0FBZSxHQUFFbEIsY0FBYyxPQUFkLEdBQXdCLElBQUssS0FBSUgsT0FBUSxNQUFLQyxxQkFBc0IsR0FBM0Y7QUFDQSxRQUFJRyxXQUFKLEVBQWlCO0FBQ2YsWUFBTSxvQkFBS2tCLG1CQUFMLEVBQVdELFdBQVgsQ0FBTjtBQUNELEtBRkQsTUFFTztBQUNMLFlBQU0sb0JBQUtFLHFCQUFLRCxJQUFWLEVBQWdCRCxXQUFoQixFQUE2QjtBQUNqQ1AsY0FBTTtBQUQyQixPQUE3QixDQUFOO0FBR0Q7QUFDRixHIiwiZmlsZSI6InV0aWwvbW92ZS1hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IGlucXVpcmVyIGZyb20gJ2lucXVpcmVyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHBpZnkgZnJvbSAncGlmeSc7XG5pbXBvcnQgc3VkbyBmcm9tICdzdWRvLXByb21wdCc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChhcHBQYXRoLCB0YXJnZXRBcHBsaWNhdGlvblBhdGgsIHNwaW5uZXIsIGNvcHlJbnN0ZWFkID0gZmFsc2UpID0+IHtcbiAgbGV0IHdyaXRlQWNjZXNzID0gdHJ1ZTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBmcy5hY2Nlc3MoJy9BcHBsaWNhdGlvbnMnLCBmcy5XX09LKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgd3JpdGVBY2Nlc3MgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChhd2FpdCBmcy5wYXRoRXhpc3RzKHRhcmdldEFwcGxpY2F0aW9uUGF0aCkpIHtcbiAgICBzcGlubmVyLnN0b3AoKTtcbiAgICBjb25zdCB7IGNvbmZpcm0gfSA9IGF3YWl0IGlucXVpcmVyLmNyZWF0ZVByb21wdE1vZHVsZSgpKHtcbiAgICAgIHR5cGU6ICdjb25maXJtJyxcbiAgICAgIG5hbWU6ICdjb25maXJtJyxcbiAgICAgIG1lc3NhZ2U6IGBUaGUgYXBwbGljYXRpb24gXCIke3BhdGguYmFzZW5hbWUodGFyZ2V0QXBwbGljYXRpb25QYXRoKX1cIiBhcHBlYXJzIHRvIGFscmVhZHkgZXhpc3QgaW4gL0FwcGxpY2F0aW9ucy4gRG8geW91IHdhbnQgdG8gcmVwbGFjZSBpdD9gLFxuICAgIH0pO1xuICAgIGlmICghY29uZmlybSkge1xuICAgICAgdGhyb3cgJ0luc3RhbGxhdGlvbiBzdG9wcGVkIGJ5IHVzZXInO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcGlubmVyLnN0YXJ0KCk7XG4gICAgICBhd2FpdCBmcy5yZW1vdmUodGFyZ2V0QXBwbGljYXRpb25QYXRoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBtb3ZlQ29tbWFuZCA9IGAke2NvcHlJbnN0ZWFkID8gJ2NwIC1yJyA6ICdtdid9IFwiJHthcHBQYXRofVwiIFwiJHt0YXJnZXRBcHBsaWNhdGlvblBhdGh9XCJgO1xuICBpZiAod3JpdGVBY2Nlc3MpIHtcbiAgICBhd2FpdCBwaWZ5KGV4ZWMpKG1vdmVDb21tYW5kKTtcbiAgfSBlbHNlIHtcbiAgICBhd2FpdCBwaWZ5KHN1ZG8uZXhlYykobW92ZUNvbW1hbmQsIHtcbiAgICAgIG5hbWU6ICdFbGVjdHJvbiBGb3JnZScsXG4gICAgfSk7XG4gIH1cbn07XG4iXX0=