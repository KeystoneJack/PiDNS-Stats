"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInstalled;
function isInstalled(pkg) {
  try {
    require(pkg);
    return true;
  } catch (e) {
    // Package doesn't exist -- must not be installable on this platform
    return false;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvaXMtaW5zdGFsbGVkLmpzIl0sIm5hbWVzIjpbImlzSW5zdGFsbGVkIiwicGtnIiwicmVxdWlyZSIsImUiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUF3QkEsVztBQUFULFNBQVNBLFdBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCO0FBQ3ZDLE1BQUk7QUFDRkMsWUFBUUQsR0FBUjtBQUNBLFdBQU8sSUFBUDtBQUNELEdBSEQsQ0FHRSxPQUFPRSxDQUFQLEVBQVU7QUFDVjtBQUNBLFdBQU8sS0FBUDtBQUNEO0FBQ0YiLCJmaWxlIjoidXRpbC9pcy1pbnN0YWxsZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0luc3RhbGxlZChwa2cpIHtcbiAgdHJ5IHtcbiAgICByZXF1aXJlKHBrZyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBQYWNrYWdlIGRvZXNuJ3QgZXhpc3QgLS0gbXVzdCBub3QgYmUgaW5zdGFsbGFibGUgb24gdGhpcyBwbGF0Zm9ybVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19