'use strict'

var regex = /\^|~|<|>|\||( - )/

module.exports = function exactVersion (version) {
  return !regex.test(version)
}
