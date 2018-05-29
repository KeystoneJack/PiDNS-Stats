'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _crossSpawnPromise = require('cross-spawn-promise');

var _crossSpawnPromise2 = _interopRequireDefault(_crossSpawnPromise);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _moveApp = require('../../util/move-app');

var _moveApp2 = _interopRequireDefault(_moveApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (filePath, installSpinner) {
    yield (0, _crossSpawnPromise2.default)('unzip', ['-q', '-o', _path2.default.basename(filePath)], {
      cwd: _path2.default.dirname(filePath)
    });

    const appPath = (yield _fsExtra2.default.readdir(_path2.default.dirname(filePath))).filter(function (file) {
      return file.endsWith('.app');
    }).map(function (file) {
      return _path2.default.resolve(_path2.default.dirname(filePath), file);
    }).sort(function (fA, fB) {
      return _fsExtra2.default.statSync(fA).ctime.getTime() - _fsExtra2.default.statSync(fB).ctime.getTime();
    })[0];

    const targetApplicationPath = `/Applications/${_path2.default.basename(appPath)}`;

    yield (0, _moveApp2.default)(appPath, targetApplicationPath, installSpinner);

    yield (0, _crossSpawnPromise2.default)('open', ['-R', targetApplicationPath], { detached: true });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RhbGxlcnMvZGFyd2luL3ppcC5qcyJdLCJuYW1lcyI6WyJmaWxlUGF0aCIsImluc3RhbGxTcGlubmVyIiwicGF0aCIsImJhc2VuYW1lIiwiY3dkIiwiZGlybmFtZSIsImFwcFBhdGgiLCJmcyIsInJlYWRkaXIiLCJmaWx0ZXIiLCJmaWxlIiwiZW5kc1dpdGgiLCJtYXAiLCJyZXNvbHZlIiwic29ydCIsImZBIiwiZkIiLCJzdGF0U3luYyIsImN0aW1lIiwiZ2V0VGltZSIsInRhcmdldEFwcGxpY2F0aW9uUGF0aCIsImRldGFjaGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7O3NDQUVlLFdBQU9BLFFBQVAsRUFBaUJDLGNBQWpCLEVBQW9DO0FBQ2pELFVBQU0saUNBQWEsT0FBYixFQUFzQixDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWFDLGVBQUtDLFFBQUwsQ0FBY0gsUUFBZCxDQUFiLENBQXRCLEVBQTZEO0FBQ2pFSSxXQUFLRixlQUFLRyxPQUFMLENBQWFMLFFBQWI7QUFENEQsS0FBN0QsQ0FBTjs7QUFJQSxVQUFNTSxVQUFVLENBQUMsTUFBTUMsa0JBQUdDLE9BQUgsQ0FBV04sZUFBS0csT0FBTCxDQUFhTCxRQUFiLENBQVgsQ0FBUCxFQUEyQ1MsTUFBM0MsQ0FBa0Q7QUFBQSxhQUFRQyxLQUFLQyxRQUFMLENBQWMsTUFBZCxDQUFSO0FBQUEsS0FBbEQsRUFDYkMsR0FEYSxDQUNUO0FBQUEsYUFBUVYsZUFBS1csT0FBTCxDQUFhWCxlQUFLRyxPQUFMLENBQWFMLFFBQWIsQ0FBYixFQUFxQ1UsSUFBckMsQ0FBUjtBQUFBLEtBRFMsRUFFYkksSUFGYSxDQUVSLFVBQUNDLEVBQUQsRUFBS0MsRUFBTDtBQUFBLGFBQVlULGtCQUFHVSxRQUFILENBQVlGLEVBQVosRUFBZ0JHLEtBQWhCLENBQXNCQyxPQUF0QixLQUFrQ1osa0JBQUdVLFFBQUgsQ0FBWUQsRUFBWixFQUFnQkUsS0FBaEIsQ0FBc0JDLE9BQXRCLEVBQTlDO0FBQUEsS0FGUSxFQUV1RSxDQUZ2RSxDQUFoQjs7QUFJQSxVQUFNQyx3QkFBeUIsaUJBQWdCbEIsZUFBS0MsUUFBTCxDQUFjRyxPQUFkLENBQXVCLEVBQXRFOztBQUVBLFVBQU0sdUJBQVFBLE9BQVIsRUFBaUJjLHFCQUFqQixFQUF3Q25CLGNBQXhDLENBQU47O0FBRUEsVUFBTSxpQ0FBYSxNQUFiLEVBQXFCLENBQUMsSUFBRCxFQUFPbUIscUJBQVAsQ0FBckIsRUFBb0QsRUFBRUMsVUFBVSxJQUFaLEVBQXBELENBQU47QUFDRCxHIiwiZmlsZSI6Imluc3RhbGxlcnMvZGFyd2luL3ppcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzcGF3blByb21pc2UgZnJvbSAnY3Jvc3Mtc3Bhd24tcHJvbWlzZSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgbW92ZUFwcCBmcm9tICcuLi8uLi91dGlsL21vdmUtYXBwJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGZpbGVQYXRoLCBpbnN0YWxsU3Bpbm5lcikgPT4ge1xuICBhd2FpdCBzcGF3blByb21pc2UoJ3VuemlwJywgWyctcScsICctbycsIHBhdGguYmFzZW5hbWUoZmlsZVBhdGgpXSwge1xuICAgIGN3ZDogcGF0aC5kaXJuYW1lKGZpbGVQYXRoKSxcbiAgfSk7XG5cbiAgY29uc3QgYXBwUGF0aCA9IChhd2FpdCBmcy5yZWFkZGlyKHBhdGguZGlybmFtZShmaWxlUGF0aCkpKS5maWx0ZXIoZmlsZSA9PiBmaWxlLmVuZHNXaXRoKCcuYXBwJykpXG4gICAgLm1hcChmaWxlID0+IHBhdGgucmVzb2x2ZShwYXRoLmRpcm5hbWUoZmlsZVBhdGgpLCBmaWxlKSlcbiAgICAuc29ydCgoZkEsIGZCKSA9PiBmcy5zdGF0U3luYyhmQSkuY3RpbWUuZ2V0VGltZSgpIC0gZnMuc3RhdFN5bmMoZkIpLmN0aW1lLmdldFRpbWUoKSlbMF07XG5cbiAgY29uc3QgdGFyZ2V0QXBwbGljYXRpb25QYXRoID0gYC9BcHBsaWNhdGlvbnMvJHtwYXRoLmJhc2VuYW1lKGFwcFBhdGgpfWA7XG5cbiAgYXdhaXQgbW92ZUFwcChhcHBQYXRoLCB0YXJnZXRBcHBsaWNhdGlvblBhdGgsIGluc3RhbGxTcGlubmVyKTtcblxuICBhd2FpdCBzcGF3blByb21pc2UoJ29wZW4nLCBbJy1SJywgdGFyZ2V0QXBwbGljYXRpb25QYXRoXSwgeyBkZXRhY2hlZDogdHJ1ZSB9KTtcbn07XG4iXX0=