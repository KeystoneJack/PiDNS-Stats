# exact-version [![Build Status](https://travis-ci.org/bendrucker/exact-version.svg?branch=master)](https://travis-ci.org/bendrucker/exact-version)

> Detect if a version string is an exact version and not a range


## Install

```
$ npm install --save exact-version
```


## Usage

```js
var exactVersion = require('exact-version')

exactVersion('4.0.0')
//=> true

exactVersion('~4.0.0')
//=> false
```

## API

#### `exactVersion(version)` -> `boolean`

##### version

*Required*  
Type: `string`

A semver range / version.

## License

MIT © [Ben Drucker](http://bendrucker.me)
