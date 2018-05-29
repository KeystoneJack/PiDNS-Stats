'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNameFromAuthor;

var _parseAuthor = require('parse-author');

var _parseAuthor2 = _interopRequireDefault(_parseAuthor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNameFromAuthor(author) {
  let publisher = author || '';

  if (typeof publisher === 'string') {
    publisher = (0, _parseAuthor2.default)(publisher);
  }

  if (typeof publisher.name === 'string') {
    publisher = publisher.name;
  }

  if (typeof publisher !== 'string') {
    publisher = '';
  }

  return publisher;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvYXV0aG9yLW5hbWUuanMiXSwibmFtZXMiOlsiZ2V0TmFtZUZyb21BdXRob3IiLCJhdXRob3IiLCJwdWJsaXNoZXIiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFFd0JBLGlCOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBU0EsaUJBQVQsQ0FBMkJDLE1BQTNCLEVBQW1DO0FBQ2hELE1BQUlDLFlBQVlELFVBQVUsRUFBMUI7O0FBRUEsTUFBSSxPQUFPQyxTQUFQLEtBQXFCLFFBQXpCLEVBQW1DO0FBQ2pDQSxnQkFBWSwyQkFBWUEsU0FBWixDQUFaO0FBQ0Q7O0FBRUQsTUFBSSxPQUFPQSxVQUFVQyxJQUFqQixLQUEwQixRQUE5QixFQUF3QztBQUN0Q0QsZ0JBQVlBLFVBQVVDLElBQXRCO0FBQ0Q7O0FBRUQsTUFBSSxPQUFPRCxTQUFQLEtBQXFCLFFBQXpCLEVBQW1DO0FBQ2pDQSxnQkFBWSxFQUFaO0FBQ0Q7O0FBRUQsU0FBT0EsU0FBUDtBQUNEIiwiZmlsZSI6InV0aWwvYXV0aG9yLW5hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFyc2VBdXRob3IgZnJvbSAncGFyc2UtYXV0aG9yJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TmFtZUZyb21BdXRob3IoYXV0aG9yKSB7XG4gIGxldCBwdWJsaXNoZXIgPSBhdXRob3IgfHwgJyc7XG5cbiAgaWYgKHR5cGVvZiBwdWJsaXNoZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgcHVibGlzaGVyID0gcGFyc2VBdXRob3IocHVibGlzaGVyKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcHVibGlzaGVyLm5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcHVibGlzaGVyID0gcHVibGlzaGVyLm5hbWU7XG4gIH1cblxuICBpZiAodHlwZW9mIHB1Ymxpc2hlciAhPT0gJ3N0cmluZycpIHtcbiAgICBwdWJsaXNoZXIgPSAnJztcbiAgfVxuXG4gIHJldHVybiBwdWJsaXNoZXI7XG59XG4iXX0=