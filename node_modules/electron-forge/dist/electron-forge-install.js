'use strict';

var _bluebird = require('bluebird');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

require('./util/terminate');

var _api = require('./api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _bluebird.coroutine)(function* () {
  let repo;

  _commander2.default.version(require('../package.json').version).arguments('[repository]').option('--prerelease', 'Fetch prerelease versions').action(function (repository) {
    repo = repository;
  }).parse(process.argv);

  yield (0, _api.install)({
    repo,
    interactive: true,
    prerelease: _commander2.default.prerelease
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZWN0cm9uLWZvcmdlLWluc3RhbGwuanMiXSwibmFtZXMiOlsicmVwbyIsInByb2dyYW0iLCJ2ZXJzaW9uIiwicmVxdWlyZSIsImFyZ3VtZW50cyIsIm9wdGlvbiIsImFjdGlvbiIsInJlcG9zaXRvcnkiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2IiwiaW50ZXJhY3RpdmUiLCJwcmVyZWxlYXNlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7OztBQUVBLHlCQUFDLGFBQVk7QUFDWCxNQUFJQSxJQUFKOztBQUVBQyxzQkFDR0MsT0FESCxDQUNXQyxRQUFRLGlCQUFSLEVBQTJCRCxPQUR0QyxFQUVHRSxTQUZILENBRWEsY0FGYixFQUdHQyxNQUhILENBR1UsY0FIVixFQUcwQiwyQkFIMUIsRUFJR0MsTUFKSCxDQUlVLFVBQUNDLFVBQUQsRUFBZ0I7QUFDdEJQLFdBQU9PLFVBQVA7QUFDRCxHQU5ILEVBT0dDLEtBUEgsQ0FPU0MsUUFBUUMsSUFQakI7O0FBU0EsUUFBTSxrQkFBUTtBQUNaVixRQURZO0FBRVpXLGlCQUFhLElBRkQ7QUFHWkMsZ0JBQVlYLG9CQUFRVztBQUhSLEdBQVIsQ0FBTjtBQUtELENBakJEIiwiZmlsZSI6ImVsZWN0cm9uLWZvcmdlLWluc3RhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvZ3JhbSBmcm9tICdjb21tYW5kZXInO1xuXG5pbXBvcnQgJy4vdXRpbC90ZXJtaW5hdGUnO1xuaW1wb3J0IHsgaW5zdGFsbCB9IGZyb20gJy4vYXBpJztcblxuKGFzeW5jICgpID0+IHtcbiAgbGV0IHJlcG87XG5cbiAgcHJvZ3JhbVxuICAgIC52ZXJzaW9uKHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpLnZlcnNpb24pXG4gICAgLmFyZ3VtZW50cygnW3JlcG9zaXRvcnldJylcbiAgICAub3B0aW9uKCctLXByZXJlbGVhc2UnLCAnRmV0Y2ggcHJlcmVsZWFzZSB2ZXJzaW9ucycpXG4gICAgLmFjdGlvbigocmVwb3NpdG9yeSkgPT4ge1xuICAgICAgcmVwbyA9IHJlcG9zaXRvcnk7XG4gICAgfSlcbiAgICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuICBhd2FpdCBpbnN0YWxsKHtcbiAgICByZXBvLFxuICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgIHByZXJlbGVhc2U6IHByb2dyYW0ucHJlcmVsZWFzZSxcbiAgfSk7XG59KSgpO1xuIl19