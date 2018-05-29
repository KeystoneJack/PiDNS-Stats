'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sudo = undefined;

var _bluebird = require('bluebird');

var _child_process = require('child_process');

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _sudoPrompt = require('sudo-prompt');

var _sudoPrompt2 = _interopRequireDefault(_sudoPrompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const which = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (type, prog, promise) {
    if ((0, _child_process.spawnSync)('which', [prog]).status === 0) {
      yield promise;
    } else {
      throw new Error(`${prog} is required to install ${type} packages`);
    }
  });

  return function which(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

const sudo = exports.sudo = (type, prog, args) => which(type, prog, (0, _pify2.default)(_sudoPrompt2.default.exec)(`${prog} ${args}`, { name: 'Electron Forge' }));

exports.default = which;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvbGludXgtaW5zdGFsbGVyLmpzIl0sIm5hbWVzIjpbIndoaWNoIiwidHlwZSIsInByb2ciLCJwcm9taXNlIiwic3RhdHVzIiwiRXJyb3IiLCJzdWRvIiwiYXJncyIsInN1ZG9Qcm9tcHQiLCJleGVjIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUE7QUFBQSxzQ0FBUSxXQUFPQyxJQUFQLEVBQWFDLElBQWIsRUFBbUJDLE9BQW5CLEVBQStCO0FBQzNDLFFBQUksOEJBQVUsT0FBVixFQUFtQixDQUFDRCxJQUFELENBQW5CLEVBQTJCRSxNQUEzQixLQUFzQyxDQUExQyxFQUE2QztBQUMzQyxZQUFNRCxPQUFOO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsWUFBTSxJQUFJRSxLQUFKLENBQVcsR0FBRUgsSUFBSywyQkFBMEJELElBQUssV0FBakQsQ0FBTjtBQUNEO0FBQ0YsR0FOSzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFOOztBQVFPLE1BQU1LLHNCQUFPLENBQUNMLElBQUQsRUFBT0MsSUFBUCxFQUFhSyxJQUFiLEtBQ2xCUCxNQUFNQyxJQUFOLEVBQVlDLElBQVosRUFBa0Isb0JBQUtNLHFCQUFXQyxJQUFoQixFQUF1QixHQUFFUCxJQUFLLElBQUdLLElBQUssRUFBdEMsRUFBeUMsRUFBRUcsTUFBTSxnQkFBUixFQUF6QyxDQUFsQixDQURLOztrQkFHUVYsSyIsImZpbGUiOiJ1dGlsL2xpbnV4LWluc3RhbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNwYXduU3luYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHBpZnkgZnJvbSAncGlmeSc7XG5pbXBvcnQgc3Vkb1Byb21wdCBmcm9tICdzdWRvLXByb21wdCc7XG5cbmNvbnN0IHdoaWNoID0gYXN5bmMgKHR5cGUsIHByb2csIHByb21pc2UpID0+IHtcbiAgaWYgKHNwYXduU3luYygnd2hpY2gnLCBbcHJvZ10pLnN0YXR1cyA9PT0gMCkge1xuICAgIGF3YWl0IHByb21pc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke3Byb2d9IGlzIHJlcXVpcmVkIHRvIGluc3RhbGwgJHt0eXBlfSBwYWNrYWdlc2ApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgc3VkbyA9ICh0eXBlLCBwcm9nLCBhcmdzKSA9PlxuICB3aGljaCh0eXBlLCBwcm9nLCBwaWZ5KHN1ZG9Qcm9tcHQuZXhlYykoYCR7cHJvZ30gJHthcmdzfWAsIHsgbmFtZTogJ0VsZWN0cm9uIEZvcmdlJyB9KSk7XG5cbmV4cG9ydCBkZWZhdWx0IHdoaWNoO1xuIl19