'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _bluebird = require('bluebird');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

var _github = require('../util/github');

var _github2 = _interopRequireDefault(_github);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* ({ artifacts, packageJSON, forgeConfig, authToken, tag }) {
    if (!(forgeConfig.github_repository && typeof forgeConfig.github_repository === 'object' && forgeConfig.github_repository.owner && forgeConfig.github_repository.name)) {
      throw 'In order to publish to github you must set the "github_repository.owner" and "github_repository.name" properties in your forge config. See the docs for more info'; // eslint-disable-line
    }

    const github = new _github2.default(authToken, true, forgeConfig.github_repository.options);

    let release;
    yield (0, _oraHandler2.default)('Searching for target release', (0, _bluebird.coroutine)(function* () {
      try {
        release = (yield github.getGitHub().repos.getReleases({
          owner: forgeConfig.github_repository.owner,
          repo: forgeConfig.github_repository.name,
          per_page: 100
        })).data.find(function (testRelease) {
          return testRelease.tag_name === (tag || `v${packageJSON.version}`);
        });
        if (!release) {
          throw { code: 404 };
        }
      } catch (err) {
        if (err.code === 404) {
          // Release does not exist, let's make it
          release = (yield github.getGitHub().repos.createRelease({
            owner: forgeConfig.github_repository.owner,
            repo: forgeConfig.github_repository.name,
            tag_name: tag || `v${packageJSON.version}`,
            name: tag || `v${packageJSON.version}`,
            draft: forgeConfig.github_repository.draft !== false,
            prerelease: forgeConfig.github_repository.prerelease === true
          })).data;
        } else {
          // Unknown error
          throw err;
        }
      }
    }));

    let uploaded = 0;
    yield (0, _oraHandler2.default)(`Uploading Artifacts ${uploaded}/${artifacts.length}`, (() => {
      var _ref3 = (0, _bluebird.coroutine)(function* (uploadSpinner) {
        const updateSpinner = function updateSpinner() {
          uploadSpinner.text = `Uploading Artifacts ${uploaded}/${artifacts.length}`; // eslint-disable-line
        };

        yield _promise2.default.all(artifacts.map(function (artifactPath) {
          return new _promise2.default((() => {
            var _ref4 = (0, _bluebird.coroutine)(function* (resolve) {
              const done = function done() {
                uploaded += 1;
                updateSpinner();
                resolve();
              };
              if (release.assets.find(function (asset) {
                return asset.name === _path2.default.basename(artifactPath);
              })) {
                return done();
              }
              yield github.getGitHub().repos.uploadAsset({
                url: release.upload_url,
                file: _fsExtra2.default.createReadStream(artifactPath),
                contentType: _mimeTypes2.default.lookup(artifactPath) || 'application/octet-stream',
                contentLength: (yield _fsExtra2.default.stat(artifactPath)).size,
                name: _path2.default.basename(artifactPath)
              });
              return done();
            });

            return function (_x3) {
              return _ref4.apply(this, arguments);
            };
          })());
        }));
      });

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    })());
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2hlcnMvZ2l0aHViLmpzIl0sIm5hbWVzIjpbImFydGlmYWN0cyIsInBhY2thZ2VKU09OIiwiZm9yZ2VDb25maWciLCJhdXRoVG9rZW4iLCJ0YWciLCJnaXRodWJfcmVwb3NpdG9yeSIsIm93bmVyIiwibmFtZSIsImdpdGh1YiIsIkdpdEh1YiIsIm9wdGlvbnMiLCJyZWxlYXNlIiwiZ2V0R2l0SHViIiwicmVwb3MiLCJnZXRSZWxlYXNlcyIsInJlcG8iLCJwZXJfcGFnZSIsImRhdGEiLCJmaW5kIiwidGVzdFJlbGVhc2UiLCJ0YWdfbmFtZSIsInZlcnNpb24iLCJjb2RlIiwiZXJyIiwiY3JlYXRlUmVsZWFzZSIsImRyYWZ0IiwicHJlcmVsZWFzZSIsInVwbG9hZGVkIiwibGVuZ3RoIiwidXBsb2FkU3Bpbm5lciIsInVwZGF0ZVNwaW5uZXIiLCJ0ZXh0IiwiYWxsIiwibWFwIiwicmVzb2x2ZSIsImRvbmUiLCJhc3NldHMiLCJhc3NldCIsInBhdGgiLCJiYXNlbmFtZSIsImFydGlmYWN0UGF0aCIsInVwbG9hZEFzc2V0IiwidXJsIiwidXBsb2FkX3VybCIsImZpbGUiLCJmcyIsImNyZWF0ZVJlYWRTdHJlYW0iLCJjb250ZW50VHlwZSIsIm1pbWUiLCJsb29rdXAiLCJjb250ZW50TGVuZ3RoIiwic3RhdCIsInNpemUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7c0NBRWUsV0FBTyxFQUFFQSxTQUFGLEVBQWFDLFdBQWIsRUFBMEJDLFdBQTFCLEVBQXVDQyxTQUF2QyxFQUFrREMsR0FBbEQsRUFBUCxFQUFtRTtBQUNoRixRQUFJLEVBQUVGLFlBQVlHLGlCQUFaLElBQWlDLE9BQU9ILFlBQVlHLGlCQUFuQixLQUF5QyxRQUExRSxJQUNKSCxZQUFZRyxpQkFBWixDQUE4QkMsS0FEMUIsSUFDbUNKLFlBQVlHLGlCQUFaLENBQThCRSxJQURuRSxDQUFKLEVBQzhFO0FBQzVFLFlB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QUt6QzdDLHNCQUFNK0IsZUFBS0MsUUFBTCxDQUFjQyxZQUFkO0FBTG1DLGVBQXJDLENBQU47QUFPQSxxQkFBT0wsTUFBUDtBQUNELGFBakJEOztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRDhCO0FBQUEsU0FBZCxDQUFaLENBQU47QUFvQkQsT0F6Qks7O0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBTjtBQTBCRCxHIiwiZmlsZSI6InB1Ymxpc2hlcnMvZ2l0aHViLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBtaW1lIGZyb20gJ21pbWUtdHlwZXMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCBhc3luY09yYSBmcm9tICcuLi91dGlsL29yYS1oYW5kbGVyJztcbmltcG9ydCBHaXRIdWIgZnJvbSAnLi4vdXRpbC9naXRodWInO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBhcnRpZmFjdHMsIHBhY2thZ2VKU09OLCBmb3JnZUNvbmZpZywgYXV0aFRva2VuLCB0YWcgfSkgPT4ge1xuICBpZiAoIShmb3JnZUNvbmZpZy5naXRodWJfcmVwb3NpdG9yeSAmJiB0eXBlb2YgZm9yZ2VDb25maWcuZ2l0aHViX3JlcG9zaXRvcnkgPT09ICdvYmplY3QnICYmXG4gICAgZm9yZ2VDb25maWcuZ2l0aHViX3JlcG9zaXRvcnkub3duZXIgJiYgZm9yZ2VDb25maWcuZ2l0aHViX3JlcG9zaXRvcnkubmFtZSkpIHtcbiAgICB0aHJvdyAnSW4gb3JkZXIgdG8gcHVibGlzaCB0byBnaXRodWIgeW91IG11c3Qgc2V0IHRoZSBcImdpdGh1Yl9yZXBvc2l0b3J5Lm93bmVyXCIgYW5kIFwiZ2l0aHViX3JlcG9zaXRvcnkubmFtZVwiIHByb3BlcnRpZXMgaW4geW91ciBmb3JnZSBjb25maWcuIFNlZSB0aGUgZG9jcyBmb3IgbW9yZSBpbmZvJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgY29uc3QgZ2l0aHViID0gbmV3IEdpdEh1YihhdXRoVG9rZW4sIHRydWUsIGZvcmdlQ29uZmlnLmdpdGh1Yl9yZXBvc2l0b3J5Lm9wdGlvbnMpO1xuXG4gIGxldCByZWxlYXNlO1xuICBhd2FpdCBhc3luY09yYSgnU2VhcmNoaW5nIGZvciB0YXJnZXQgcmVsZWFzZScsIGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmVsZWFzZSA9IChhd2FpdCBnaXRodWIuZ2V0R2l0SHViKCkucmVwb3MuZ2V0UmVsZWFzZXMoe1xuICAgICAgICBvd25lcjogZm9yZ2VDb25maWcuZ2l0aHViX3JlcG9zaXRvcnkub3duZXIsXG4gICAgICAgIHJlcG86IGZvcmdlQ29uZmlnLmdpdGh1Yl9yZXBvc2l0b3J5Lm5hbWUsXG4gICAgICAgIHBlcl9wYWdlOiAxMDAsXG4gICAgICB9KSkuZGF0YS5maW5kKHRlc3RSZWxlYXNlID0+IHRlc3RSZWxlYXNlLnRhZ19uYW1lID09PSAodGFnIHx8IGB2JHtwYWNrYWdlSlNPTi52ZXJzaW9ufWApKTtcbiAgICAgIGlmICghcmVsZWFzZSkge1xuICAgICAgICB0aHJvdyB7IGNvZGU6IDQwNCB9O1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyci5jb2RlID09PSA0MDQpIHtcbiAgICAgICAgLy8gUmVsZWFzZSBkb2VzIG5vdCBleGlzdCwgbGV0J3MgbWFrZSBpdFxuICAgICAgICByZWxlYXNlID0gKGF3YWl0IGdpdGh1Yi5nZXRHaXRIdWIoKS5yZXBvcy5jcmVhdGVSZWxlYXNlKHtcbiAgICAgICAgICBvd25lcjogZm9yZ2VDb25maWcuZ2l0aHViX3JlcG9zaXRvcnkub3duZXIsXG4gICAgICAgICAgcmVwbzogZm9yZ2VDb25maWcuZ2l0aHViX3JlcG9zaXRvcnkubmFtZSxcbiAgICAgICAgICB0YWdfbmFtZTogdGFnIHx8IGB2JHtwYWNrYWdlSlNPTi52ZXJzaW9ufWAsXG4gICAgICAgICAgbmFtZTogdGFnIHx8IGB2JHtwYWNrYWdlSlNPTi52ZXJzaW9ufWAsXG4gICAgICAgICAgZHJhZnQ6IGZvcmdlQ29uZmlnLmdpdGh1Yl9yZXBvc2l0b3J5LmRyYWZ0ICE9PSBmYWxzZSxcbiAgICAgICAgICBwcmVyZWxlYXNlOiBmb3JnZUNvbmZpZy5naXRodWJfcmVwb3NpdG9yeS5wcmVyZWxlYXNlID09PSB0cnVlLFxuICAgICAgICB9KSkuZGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFVua25vd24gZXJyb3JcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgbGV0IHVwbG9hZGVkID0gMDtcbiAgYXdhaXQgYXN5bmNPcmEoYFVwbG9hZGluZyBBcnRpZmFjdHMgJHt1cGxvYWRlZH0vJHthcnRpZmFjdHMubGVuZ3RofWAsIGFzeW5jICh1cGxvYWRTcGlubmVyKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlU3Bpbm5lciA9ICgpID0+IHtcbiAgICAgIHVwbG9hZFNwaW5uZXIudGV4dCA9IGBVcGxvYWRpbmcgQXJ0aWZhY3RzICR7dXBsb2FkZWR9LyR7YXJ0aWZhY3RzLmxlbmd0aH1gOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKGFydGlmYWN0cy5tYXAoYXJ0aWZhY3RQYXRoID0+XG4gICAgICBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCBkb25lID0gKCkgPT4ge1xuICAgICAgICAgIHVwbG9hZGVkICs9IDE7XG4gICAgICAgICAgdXBkYXRlU3Bpbm5lcigpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHJlbGVhc2UuYXNzZXRzLmZpbmQoYXNzZXQgPT4gYXNzZXQubmFtZSA9PT0gcGF0aC5iYXNlbmFtZShhcnRpZmFjdFBhdGgpKSkge1xuICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgZ2l0aHViLmdldEdpdEh1YigpLnJlcG9zLnVwbG9hZEFzc2V0KHtcbiAgICAgICAgICB1cmw6IHJlbGVhc2UudXBsb2FkX3VybCxcbiAgICAgICAgICBmaWxlOiBmcy5jcmVhdGVSZWFkU3RyZWFtKGFydGlmYWN0UGF0aCksXG4gICAgICAgICAgY29udGVudFR5cGU6IG1pbWUubG9va3VwKGFydGlmYWN0UGF0aCkgfHwgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG4gICAgICAgICAgY29udGVudExlbmd0aDogKGF3YWl0IGZzLnN0YXQoYXJ0aWZhY3RQYXRoKSkuc2l6ZSxcbiAgICAgICAgICBuYW1lOiBwYXRoLmJhc2VuYW1lKGFydGlmYWN0UGF0aCksXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgfSlcbiAgICApKTtcbiAgfSk7XG59O1xuIl19