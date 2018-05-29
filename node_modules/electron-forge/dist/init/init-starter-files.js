'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('electron-forge:init:starter-files');

const copy = exports.copy = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (source, target) {
    d(`copying "${source}" --> "${target}"`);
    yield _fsExtra2.default.copy(source, target);
  });

  return function copy(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* (dir, { lintStyle, copyCIFiles }) {
    yield (0, _oraHandler2.default)('Copying Starter Files', (0, _bluebird.coroutine)(function* () {
      const tmplPath = _path2.default.resolve(__dirname, '../../tmpl');

      d('creating directory:', _path2.default.resolve(dir, 'src'));
      yield _fsExtra2.default.mkdirs(_path2.default.resolve(dir, 'src'));
      const rootFiles = ['_gitignore', '_compilerc'];
      if (copyCIFiles) rootFiles.push(...['_travis.yml', '_appveyor.yml']);
      if (lintStyle === 'airbnb') rootFiles.push('_eslintrc');
      const srcFiles = ['index.js', 'index.html'];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(rootFiles), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const file = _step.value;

          yield copy(_path2.default.resolve(tmplPath, file), _path2.default.resolve(dir, file.replace(/^_/, '.')));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(srcFiles), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          const file = _step2.value;

          yield copy(_path2.default.resolve(tmplPath, file), _path2.default.resolve(dir, 'src', file));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }));
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQvaW5pdC1zdGFydGVyLWZpbGVzLmpzIl0sIm5hbWVzIjpbImQiLCJjb3B5Iiwic291cmNlIiwidGFyZ2V0IiwiZnMiLCJkaXIiLCJsaW50U3R5bGUiLCJjb3B5Q0lGaWxlcyIsInRtcGxQYXRoIiwicGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJta2RpcnMiLCJyb290RmlsZXMiLCJwdXNoIiwic3JjRmlsZXMiLCJmaWxlIiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFFQSxNQUFNQSxJQUFJLHFCQUFNLG1DQUFOLENBQVY7O0FBRU8sTUFBTUM7QUFBQSxzQ0FBTyxXQUFPQyxNQUFQLEVBQWVDLE1BQWYsRUFBMEI7QUFDNUNILE1BQUcsWUFBV0UsTUFBTyxVQUFTQyxNQUFPLEdBQXJDO0FBQ0EsVUFBTUMsa0JBQUdILElBQUgsQ0FBUUMsTUFBUixFQUFnQkMsTUFBaEIsQ0FBTjtBQUNELEdBSFk7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTjs7O3VDQUtRLFdBQU9FLEdBQVAsRUFBWSxFQUFFQyxTQUFGLEVBQWFDLFdBQWIsRUFBWixFQUEyQztBQUN4RCxVQUFNLDBCQUFTLHVCQUFULDJCQUFrQyxhQUFZO0FBQ2xELFlBQU1DLFdBQVdDLGVBQUtDLE9BQUwsQ0FBYUMsU0FBYixFQUF3QixZQUF4QixDQUFqQjs7QUFFQVgsUUFBRSxxQkFBRixFQUF5QlMsZUFBS0MsT0FBTCxDQUFhTCxHQUFiLEVBQWtCLEtBQWxCLENBQXpCO0FBQ0EsWUFBTUQsa0JBQUdRLE1BQUgsQ0FBVUgsZUFBS0MsT0FBTCxDQUFhTCxHQUFiLEVBQWtCLEtBQWxCLENBQVYsQ0FBTjtBQUNBLFlBQU1RLFlBQVksQ0FBQyxZQUFELEVBQWUsWUFBZixDQUFsQjtBQUNBLFVBQUlOLFdBQUosRUFBaUJNLFVBQVVDLElBQVYsQ0FBZSxHQUFHLENBQUMsYUFBRCxFQUFnQixlQUFoQixDQUFsQjtBQUNqQixVQUFJUixjQUFjLFFBQWxCLEVBQTRCTyxVQUFVQyxJQUFWLENBQWUsV0FBZjtBQUM1QixZQUFNQyxXQUFXLENBQUMsVUFBRCxFQUFhLFlBQWIsQ0FBakI7O0FBUmtEO0FBQUE7QUFBQTs7QUFBQTtBQVVsRCx3REFBbUJGLFNBQW5CLDRHQUE4QjtBQUFBLGdCQUFuQkcsSUFBbUI7O0FBQzVCLGdCQUFNZixLQUFLUSxlQUFLQyxPQUFMLENBQWFGLFFBQWIsRUFBdUJRLElBQXZCLENBQUwsRUFBbUNQLGVBQUtDLE9BQUwsQ0FBYUwsR0FBYixFQUFrQlcsS0FBS0MsT0FBTCxDQUFhLElBQWIsRUFBbUIsR0FBbkIsQ0FBbEIsQ0FBbkMsQ0FBTjtBQUNEO0FBWmlEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBYWxELHlEQUFtQkYsUUFBbkIsaUhBQTZCO0FBQUEsZ0JBQWxCQyxJQUFrQjs7QUFDM0IsZ0JBQU1mLEtBQUtRLGVBQUtDLE9BQUwsQ0FBYUYsUUFBYixFQUF1QlEsSUFBdkIsQ0FBTCxFQUFtQ1AsZUFBS0MsT0FBTCxDQUFhTCxHQUFiLEVBQWtCLEtBQWxCLEVBQXlCVyxJQUF6QixDQUFuQyxDQUFOO0FBQ0Q7QUFmaUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWdCbkQsS0FoQkssRUFBTjtBQWlCRCxHIiwiZmlsZSI6ImluaXQvaW5pdC1zdGFydGVyLWZpbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IGFzeW5jT3JhIGZyb20gJy4uL3V0aWwvb3JhLWhhbmRsZXInO1xuXG5jb25zdCBkID0gZGVidWcoJ2VsZWN0cm9uLWZvcmdlOmluaXQ6c3RhcnRlci1maWxlcycpO1xuXG5leHBvcnQgY29uc3QgY29weSA9IGFzeW5jIChzb3VyY2UsIHRhcmdldCkgPT4ge1xuICBkKGBjb3B5aW5nIFwiJHtzb3VyY2V9XCIgLS0+IFwiJHt0YXJnZXR9XCJgKTtcbiAgYXdhaXQgZnMuY29weShzb3VyY2UsIHRhcmdldCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZGlyLCB7IGxpbnRTdHlsZSwgY29weUNJRmlsZXMgfSkgPT4ge1xuICBhd2FpdCBhc3luY09yYSgnQ29weWluZyBTdGFydGVyIEZpbGVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHRtcGxQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3RtcGwnKTtcblxuICAgIGQoJ2NyZWF0aW5nIGRpcmVjdG9yeTonLCBwYXRoLnJlc29sdmUoZGlyLCAnc3JjJykpO1xuICAgIGF3YWl0IGZzLm1rZGlycyhwYXRoLnJlc29sdmUoZGlyLCAnc3JjJykpO1xuICAgIGNvbnN0IHJvb3RGaWxlcyA9IFsnX2dpdGlnbm9yZScsICdfY29tcGlsZXJjJ107XG4gICAgaWYgKGNvcHlDSUZpbGVzKSByb290RmlsZXMucHVzaCguLi5bJ190cmF2aXMueW1sJywgJ19hcHB2ZXlvci55bWwnXSk7XG4gICAgaWYgKGxpbnRTdHlsZSA9PT0gJ2FpcmJuYicpIHJvb3RGaWxlcy5wdXNoKCdfZXNsaW50cmMnKTtcbiAgICBjb25zdCBzcmNGaWxlcyA9IFsnaW5kZXguanMnLCAnaW5kZXguaHRtbCddO1xuXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIHJvb3RGaWxlcykge1xuICAgICAgYXdhaXQgY29weShwYXRoLnJlc29sdmUodG1wbFBhdGgsIGZpbGUpLCBwYXRoLnJlc29sdmUoZGlyLCBmaWxlLnJlcGxhY2UoL15fLywgJy4nKSkpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2Ygc3JjRmlsZXMpIHtcbiAgICAgIGF3YWl0IGNvcHkocGF0aC5yZXNvbHZlKHRtcGxQYXRoLCBmaWxlKSwgcGF0aC5yZXNvbHZlKGRpciwgJ3NyYycsIGZpbGUpKTtcbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==