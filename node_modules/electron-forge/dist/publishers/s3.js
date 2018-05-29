'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _bluebird = require('bluebird');

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _s = require('s3');

var _s2 = _interopRequireDefault(_s);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:publish:s3');

_awsSdk2.default.util.update(_awsSdk2.default.S3.prototype, {
  addExpect100Continue: function addExpect100Continue() {
    // Hack around large upload issue: https://github.com/andrewrk/node-s3-client/issues/74
  }
});

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* ({ artifacts, packageJSON, forgeConfig, authToken, tag }) {
    const s3Config = forgeConfig.s3;

    s3Config.secretAccessKey = s3Config.secretAccessKey || authToken;

    const s3Client = new _awsSdk2.default.S3({
      accessKeyId: s3Config.accessKeyId,
      secretAccessKey: s3Config.secretAccessKey
    });

    if (!s3Client.config.credentials || !s3Config.bucket) {
      throw 'In order to publish to s3 you must set the "s3.accessKeyId", "process.env.ELECTRON_FORGE_S3_SECRET_ACCESS_KEY" and "s3.bucket" properties in your forge config. See the docs for more info'; // eslint-disable-line
    }

    d('creating s3 client with options:', s3Config);

    const client = _s2.default.createClient({
      s3Client
    });
    client.s3.addExpect100Continue = function () {};

    const folder = s3Config.folder || tag || packageJSON.version;

    let uploaded = 0;
    yield (0, _oraHandler2.default)(`Uploading Artifacts ${uploaded}/${artifacts.length}`, (() => {
      var _ref2 = (0, _bluebird.coroutine)(function* (uploadSpinner) {
        const updateSpinner = function updateSpinner() {
          uploadSpinner.text = `Uploading Artifacts ${uploaded}/${artifacts.length}`; // eslint-disable-line
        };

        yield _promise2.default.all(artifacts.map(function (artifactPath) {
          return new _promise2.default((() => {
            var _ref3 = (0, _bluebird.coroutine)(function* (resolve, reject) {
              const done = function done(err) {
                if (err) return reject(err);
                uploaded += 1;
                updateSpinner();
                resolve();
              };

              const uploader = client.uploadFile({
                localFile: artifactPath,
                s3Params: {
                  Bucket: s3Config.bucket,
                  Key: `${folder}/${_path2.default.basename(artifactPath)}`,
                  ACL: s3Config.public ? 'public-read' : 'private'
                }
              });
              d('uploading:', artifactPath);

              uploader.on('error', function (err) {
                return done(err);
              });
              uploader.on('progress', function () {
                d(`Upload Progress (${_path2.default.basename(artifactPath)}) ${Math.round(uploader.progressAmount / uploader.progressTotal * 100)}%`);
              });
              uploader.on('end', function () {
                return done();
              });
            });

            return function (_x3, _x4) {
              return _ref3.apply(this, arguments);
            };
          })());
        }));
      });

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    })());
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hlcnMvczMuanMiXSwibmFtZXMiOlsiZCIsIkFXUyIsInV0aWwiLCJ1cGRhdGUiLCJTMyIsInByb3RvdHlwZSIsImFkZEV4cGVjdDEwMENvbnRpbnVlIiwiYXJ0aWZhY3RzIiwicGFja2FnZUpTT04iLCJmb3JnZUNvbmZpZyIsImF1dGhUb2tlbiIsInRhZyIsInMzQ29uZmlnIiwiczMiLCJzZWNyZXRBY2Nlc3NLZXkiLCJzM0NsaWVudCIsImFjY2Vzc0tleUlkIiwiY29uZmlnIiwiY3JlZGVudGlhbHMiLCJidWNrZXQiLCJjbGllbnQiLCJjcmVhdGVDbGllbnQiLCJmb2xkZXIiLCJ2ZXJzaW9uIiwidXBsb2FkZWQiLCJsZW5ndGgiLCJ1cGxvYWRTcGlubmVyIiwidXBkYXRlU3Bpbm5lciIsInRleHQiLCJhbGwiLCJtYXAiLCJyZXNvbHZlIiwicmVqZWN0IiwiZG9uZSIsImVyciIsInVwbG9hZGVyIiwidXBsb2FkRmlsZSIsImxvY2FsRmlsZSIsImFydGlmYWN0UGF0aCIsInMzUGFyYW1zIiwiQnVja2V0IiwiS2V5IiwicGF0aCIsImJhc2VuYW1lIiwiQUNMIiwicHVibGljIiwib24iLCJNYXRoIiwicm91bmQiLCJwcm9ncmVzc0Ftb3VudCIsInByb2dyZXNzVG90YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUVBLE1BQU1BLElBQUkscUJBQU0sMkJBQU4sQ0FBVjs7QUFFQUMsaUJBQUlDLElBQUosQ0FBU0MsTUFBVCxDQUFnQkYsaUJBQUlHLEVBQUosQ0FBT0MsU0FBdkIsRUFBa0M7QUFDaENDLHdCQUFzQixTQUFTQSxvQkFBVCxHQUFnQztBQUNwRDtBQUNEO0FBSCtCLENBQWxDOzs7c0NBTWUsV0FBTyxFQUFFQyxTQUFGLEVBQWFDLFdBQWIsRUFBMEJDLFdBQTFCLEVBQXVDQyxTQUF2QyxFQUFrREMsR0FBbEQsRUFBUCxFQUFtRTtBQUNoRixVQUFNQyxXQUFXSCxZQUFZSSxFQUE3Qjs7QUFFQUQsYUFBU0UsZUFBVCxHQUEyQkYsU0FBU0UsZUFBVCxJQUE0QkosU0FBdkQ7O0FBRUEsVUFBTUssV0FBVyxJQUFJZCxpQkFBSUcsRUFBUixDQUFXO0FBQzFCWSxtQkFBYUosU0FBU0ksV0FESTtBQUUxQkYsdUJBQWlCRixTQUFTRTtBQUZBLEtBQVgsQ0FBakI7O0FBS0EsUUFBSSxDQUFDQyxTQUFTRSxNQUFULENBQWdCQyxXQUFqQixJQUFnQyxDQUFDTixTQUFTTyxNQUE5QyxFQUFzRDtBQUNwRCxZQUFNLDRMQUFOLENBRG9ELENBQ2dKO0FBQ3JNOztBQUVEbkIsTUFBRSxrQ0FBRixFQUFzQ1ksUUFBdEM7O0FBRUEsVUFBTVEsU0FBU1AsWUFBR1EsWUFBSCxDQUFnQjtBQUM3Qk47QUFENkIsS0FBaEIsQ0FBZjtBQUdBSyxXQUFPUCxFQUFQLENBQVVQLG9CQUFWLEdBQWlDLFlBQU0sQ0FBRSxDQUF6Qzs7QUFFQSxVQUFNZ0IsU0FBU1YsU0FBU1UsTUFBVCxJQUFtQlgsR0FBbkIsSUFBMEJILFlBQVllLE9BQXJEOztBQUVBLFFBQUlDLFdBQVcsQ0FBZjtBQUNBLFVBQU0sMEJBQVUsdUJBQXNCQSxRQUFTLElBQUdqQixVQUFVa0IsTUFBTyxFQUE3RDtBQUFBLDJDQUFnRSxXQUFPQyxhQUFQLEVBQXlCO0FBQzdGLGNBQU1DLGdCQUFnQixTQUFoQkEsYUFBZ0IsR0FBTTtBQUMxQkQsd0JBQWNFLElBQWQsR0FBc0IsdUJBQXNCSixRQUFTLElBQUdqQixVQUFVa0IsTUFBTyxFQUF6RSxDQUQwQixDQUNrRDtBQUM3RSxTQUZEOztBQUlBLGNBQU0sa0JBQVFJLEdBQVIsQ0FBWXRCLFVBQVV1QixHQUFWLENBQWM7QUFBQSxpQkFDOUI7QUFBQSxpREFBWSxXQUFPQyxPQUFQLEVBQWdCQyxNQUFoQixFQUEyQjtBQUNyQyxvQkFBTUMsT0FBTyxTQUFQQSxJQUFPLENBQUNDLEdBQUQsRUFBUztBQUNwQixvQkFBSUEsR0FBSixFQUFTLE9BQU9GLE9BQU9FLEdBQVAsQ0FBUDtBQUNUViw0QkFBWSxDQUFaO0FBQ0FHO0FBQ0FJO0FBQ0QsZUFMRDs7QUFPQSxvQkFBTUksV0FBV2YsT0FBT2dCLFVBQVAsQ0FBa0I7QUFDakNDLDJCQUFXQyxZQURzQjtBQUVqQ0MsMEJBQVU7QUFDUkMsMEJBQVE1QixTQUFTTyxNQURUO0FBRVJzQix1QkFBTSxHQUFFbkIsTUFBTyxJQUFHb0IsZUFBS0MsUUFBTCxDQUFjTCxZQUFkLENBQTRCLEVBRnRDO0FBR1JNLHVCQUFLaEMsU0FBU2lDLE1BQVQsR0FBa0IsYUFBbEIsR0FBa0M7QUFIL0I7QUFGdUIsZUFBbEIsQ0FBakI7QUFRQTdDLGdCQUFFLFlBQUYsRUFBZ0JzQyxZQUFoQjs7QUFFQUgsdUJBQVNXLEVBQVQsQ0FBWSxPQUFaLEVBQXFCO0FBQUEsdUJBQU9iLEtBQUtDLEdBQUwsQ0FBUDtBQUFBLGVBQXJCO0FBQ0FDLHVCQUFTVyxFQUFULENBQVksVUFBWixFQUF3QixZQUFNO0FBQzVCOUMsa0JBQUcsb0JBQW1CMEMsZUFBS0MsUUFBTCxDQUFjTCxZQUFkLENBQTRCLEtBQUlTLEtBQUtDLEtBQUwsQ0FBWWIsU0FBU2MsY0FBVCxHQUEwQmQsU0FBU2UsYUFBcEMsR0FBcUQsR0FBaEUsQ0FBcUUsR0FBM0g7QUFDRCxlQUZEO0FBR0FmLHVCQUFTVyxFQUFULENBQVksS0FBWixFQUFtQjtBQUFBLHVCQUFNYixNQUFOO0FBQUEsZUFBbkI7QUFDRCxhQXZCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUQ4QjtBQUFBLFNBQWQsQ0FBWixDQUFOO0FBMEJELE9BL0JLOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQU47QUFnQ0QsRyIsImZpbGUiOiJwdWJsaXNoZXJzL3MzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFXUyBmcm9tICdhd3Mtc2RrJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBzMyBmcm9tICdzMyc7XG5cbmltcG9ydCBhc3luY09yYSBmcm9tICcuLi91dGlsL29yYS1oYW5kbGVyJztcblxuY29uc3QgZCA9IGRlYnVnKCdlbGVjdHJvbi1mb3JnZTpwdWJsaXNoOnMzJyk7XG5cbkFXUy51dGlsLnVwZGF0ZShBV1MuUzMucHJvdG90eXBlLCB7XG4gIGFkZEV4cGVjdDEwMENvbnRpbnVlOiBmdW5jdGlvbiBhZGRFeHBlY3QxMDBDb250aW51ZSgpIHtcbiAgICAvLyBIYWNrIGFyb3VuZCBsYXJnZSB1cGxvYWQgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmRyZXdyay9ub2RlLXMzLWNsaWVudC9pc3N1ZXMvNzRcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBhcnRpZmFjdHMsIHBhY2thZ2VKU09OLCBmb3JnZUNvbmZpZywgYXV0aFRva2VuLCB0YWcgfSkgPT4ge1xuICBjb25zdCBzM0NvbmZpZyA9IGZvcmdlQ29uZmlnLnMzO1xuXG4gIHMzQ29uZmlnLnNlY3JldEFjY2Vzc0tleSA9IHMzQ29uZmlnLnNlY3JldEFjY2Vzc0tleSB8fCBhdXRoVG9rZW47XG5cbiAgY29uc3QgczNDbGllbnQgPSBuZXcgQVdTLlMzKHtcbiAgICBhY2Nlc3NLZXlJZDogczNDb25maWcuYWNjZXNzS2V5SWQsXG4gICAgc2VjcmV0QWNjZXNzS2V5OiBzM0NvbmZpZy5zZWNyZXRBY2Nlc3NLZXksXG4gIH0pO1xuXG4gIGlmICghczNDbGllbnQuY29uZmlnLmNyZWRlbnRpYWxzIHx8ICFzM0NvbmZpZy5idWNrZXQpIHtcbiAgICB0aHJvdyAnSW4gb3JkZXIgdG8gcHVibGlzaCB0byBzMyB5b3UgbXVzdCBzZXQgdGhlIFwiczMuYWNjZXNzS2V5SWRcIiwgXCJwcm9jZXNzLmVudi5FTEVDVFJPTl9GT1JHRV9TM19TRUNSRVRfQUNDRVNTX0tFWVwiIGFuZCBcInMzLmJ1Y2tldFwiIHByb3BlcnRpZXMgaW4geW91ciBmb3JnZSBjb25maWcuIFNlZSB0aGUgZG9jcyBmb3IgbW9yZSBpbmZvJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgZCgnY3JlYXRpbmcgczMgY2xpZW50IHdpdGggb3B0aW9uczonLCBzM0NvbmZpZyk7XG5cbiAgY29uc3QgY2xpZW50ID0gczMuY3JlYXRlQ2xpZW50KHtcbiAgICBzM0NsaWVudCxcbiAgfSk7XG4gIGNsaWVudC5zMy5hZGRFeHBlY3QxMDBDb250aW51ZSA9ICgpID0+IHt9O1xuXG4gIGNvbnN0IGZvbGRlciA9IHMzQ29uZmlnLmZvbGRlciB8fCB0YWcgfHwgcGFja2FnZUpTT04udmVyc2lvbjtcblxuICBsZXQgdXBsb2FkZWQgPSAwO1xuICBhd2FpdCBhc3luY09yYShgVXBsb2FkaW5nIEFydGlmYWN0cyAke3VwbG9hZGVkfS8ke2FydGlmYWN0cy5sZW5ndGh9YCwgYXN5bmMgKHVwbG9hZFNwaW5uZXIpID0+IHtcbiAgICBjb25zdCB1cGRhdGVTcGlubmVyID0gKCkgPT4ge1xuICAgICAgdXBsb2FkU3Bpbm5lci50ZXh0ID0gYFVwbG9hZGluZyBBcnRpZmFjdHMgJHt1cGxvYWRlZH0vJHthcnRpZmFjdHMubGVuZ3RofWA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9O1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoYXJ0aWZhY3RzLm1hcChhcnRpZmFjdFBhdGggPT5cbiAgICAgIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgZG9uZSA9IChlcnIpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgdXBsb2FkZWQgKz0gMTtcbiAgICAgICAgICB1cGRhdGVTcGlubmVyKCk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHVwbG9hZGVyID0gY2xpZW50LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIGxvY2FsRmlsZTogYXJ0aWZhY3RQYXRoLFxuICAgICAgICAgIHMzUGFyYW1zOiB7XG4gICAgICAgICAgICBCdWNrZXQ6IHMzQ29uZmlnLmJ1Y2tldCxcbiAgICAgICAgICAgIEtleTogYCR7Zm9sZGVyfS8ke3BhdGguYmFzZW5hbWUoYXJ0aWZhY3RQYXRoKX1gLFxuICAgICAgICAgICAgQUNMOiBzM0NvbmZpZy5wdWJsaWMgPyAncHVibGljLXJlYWQnIDogJ3ByaXZhdGUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBkKCd1cGxvYWRpbmc6JywgYXJ0aWZhY3RQYXRoKTtcblxuICAgICAgICB1cGxvYWRlci5vbignZXJyb3InLCBlcnIgPT4gZG9uZShlcnIpKTtcbiAgICAgICAgdXBsb2FkZXIub24oJ3Byb2dyZXNzJywgKCkgPT4ge1xuICAgICAgICAgIGQoYFVwbG9hZCBQcm9ncmVzcyAoJHtwYXRoLmJhc2VuYW1lKGFydGlmYWN0UGF0aCl9KSAke01hdGgucm91bmQoKHVwbG9hZGVyLnByb2dyZXNzQW1vdW50IC8gdXBsb2FkZXIucHJvZ3Jlc3NUb3RhbCkgKiAxMDApfSVgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHVwbG9hZGVyLm9uKCdlbmQnLCAoKSA9PiBkb25lKCkpO1xuICAgICAgfSlcbiAgICApKTtcbiAgfSk7XG59O1xuIl19