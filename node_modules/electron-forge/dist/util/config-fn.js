'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (configObject, ...args) => {
  if (typeof configObject === 'function') {
    return configObject(...args);
  }
  return configObject;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvY29uZmlnLWZuLmpzIl0sIm5hbWVzIjpbImNvbmZpZ09iamVjdCIsImFyZ3MiXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFBZSxDQUFDQSxZQUFELEVBQWUsR0FBR0MsSUFBbEIsS0FBMkI7QUFDeEMsTUFBSSxPQUFPRCxZQUFQLEtBQXdCLFVBQTVCLEVBQXdDO0FBQ3RDLFdBQU9BLGFBQWEsR0FBR0MsSUFBaEIsQ0FBUDtBQUNEO0FBQ0QsU0FBT0QsWUFBUDtBQUNELEMiLCJmaWxlIjoidXRpbC9jb25maWctZm4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAoY29uZmlnT2JqZWN0LCAuLi5hcmdzKSA9PiB7XG4gIGlmICh0eXBlb2YgY29uZmlnT2JqZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGNvbmZpZ09iamVjdCguLi5hcmdzKTtcbiAgfVxuICByZXR1cm4gY29uZmlnT2JqZWN0O1xufTtcbiJdfQ==