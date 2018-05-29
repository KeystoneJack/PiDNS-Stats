'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rest = require('@octokit/rest');

var _rest2 = _interopRequireDefault(_rest);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GitHub {
  constructor(authToken, requireAuth, options = {}) {
    this.options = (0, _lodash2.default)(options, { headers: { 'user-agent': 'Electron Forge' } });
    if (authToken) {
      this.token = authToken;
    } else if (process.env.GITHUB_TOKEN) {
      this.token = process.env.GITHUB_TOKEN;
    } else if (requireAuth) {
      throw 'Please set GITHUB_TOKEN in your environment to access these features';
    }
  }

  getGitHub() {
    const github = new _rest2.default(this.options);
    if (this.token) {
      github.authenticate({
        type: 'token',
        token: this.token
      });
    }
    return github;
  }
}
exports.default = GitHub;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvZ2l0aHViLmpzIl0sIm5hbWVzIjpbIkdpdEh1YiIsImNvbnN0cnVjdG9yIiwiYXV0aFRva2VuIiwicmVxdWlyZUF1dGgiLCJvcHRpb25zIiwiaGVhZGVycyIsInRva2VuIiwicHJvY2VzcyIsImVudiIsIkdJVEhVQl9UT0tFTiIsImdldEdpdEh1YiIsImdpdGh1YiIsIkdpdEh1YkFQSSIsImF1dGhlbnRpY2F0ZSIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVlLE1BQU1BLE1BQU4sQ0FBYTtBQUMxQkMsY0FBWUMsU0FBWixFQUF1QkMsV0FBdkIsRUFBb0NDLFVBQVUsRUFBOUMsRUFBa0Q7QUFDaEQsU0FBS0EsT0FBTCxHQUFlLHNCQUNiQSxPQURhLEVBRWIsRUFBRUMsU0FBUyxFQUFFLGNBQWMsZ0JBQWhCLEVBQVgsRUFGYSxDQUFmO0FBSUEsUUFBSUgsU0FBSixFQUFlO0FBQ2IsV0FBS0ksS0FBTCxHQUFhSixTQUFiO0FBQ0QsS0FGRCxNQUVPLElBQUlLLFFBQVFDLEdBQVIsQ0FBWUMsWUFBaEIsRUFBOEI7QUFDbkMsV0FBS0gsS0FBTCxHQUFhQyxRQUFRQyxHQUFSLENBQVlDLFlBQXpCO0FBQ0QsS0FGTSxNQUVBLElBQUlOLFdBQUosRUFBaUI7QUFDdEIsWUFBTSxzRUFBTjtBQUNEO0FBQ0Y7O0FBRURPLGNBQVk7QUFDVixVQUFNQyxTQUFTLElBQUlDLGNBQUosQ0FBYyxLQUFLUixPQUFuQixDQUFmO0FBQ0EsUUFBSSxLQUFLRSxLQUFULEVBQWdCO0FBQ2RLLGFBQU9FLFlBQVAsQ0FBb0I7QUFDbEJDLGNBQU0sT0FEWTtBQUVsQlIsZUFBTyxLQUFLQTtBQUZNLE9BQXBCO0FBSUQ7QUFDRCxXQUFPSyxNQUFQO0FBQ0Q7QUF4QnlCO2tCQUFQWCxNIiwiZmlsZSI6InV0aWwvZ2l0aHViLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdpdEh1YkFQSSBmcm9tICdAb2N0b2tpdC9yZXN0JztcbmltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gubWVyZ2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHaXRIdWIge1xuICBjb25zdHJ1Y3RvcihhdXRoVG9rZW4sIHJlcXVpcmVBdXRoLCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBtZXJnZShcbiAgICAgIG9wdGlvbnMsXG4gICAgICB7IGhlYWRlcnM6IHsgJ3VzZXItYWdlbnQnOiAnRWxlY3Ryb24gRm9yZ2UnIH0gfVxuICAgICk7XG4gICAgaWYgKGF1dGhUb2tlbikge1xuICAgICAgdGhpcy50b2tlbiA9IGF1dGhUb2tlbjtcbiAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52LkdJVEhVQl9UT0tFTikge1xuICAgICAgdGhpcy50b2tlbiA9IHByb2Nlc3MuZW52LkdJVEhVQl9UT0tFTjtcbiAgICB9IGVsc2UgaWYgKHJlcXVpcmVBdXRoKSB7XG4gICAgICB0aHJvdyAnUGxlYXNlIHNldCBHSVRIVUJfVE9LRU4gaW4geW91ciBlbnZpcm9ubWVudCB0byBhY2Nlc3MgdGhlc2UgZmVhdHVyZXMnO1xuICAgIH1cbiAgfVxuXG4gIGdldEdpdEh1YigpIHtcbiAgICBjb25zdCBnaXRodWIgPSBuZXcgR2l0SHViQVBJKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKHRoaXMudG9rZW4pIHtcbiAgICAgIGdpdGh1Yi5hdXRoZW50aWNhdGUoe1xuICAgICAgICB0eXBlOiAndG9rZW4nLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZ2l0aHViO1xuICB9XG59XG4iXX0=