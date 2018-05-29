# toutsuite

Run your Promise code as synchronously as possible

This library attempts to make code written using Promises to run synchronously, kind of. 

### But how is that possible!

This library only works with code that doesn't actually use any real sources of asynchrony - i.e. code whose promises only are combinations of `then`, `resolve`, and `reject`. Any code that uses a real source of asynchrony (i.e. `setTimeout`, `fs.readFile`, etc etc) will _still_ run asynchronously. 

However, certain libraries like PostCSS for the most part are _not actually_ async, so this library will let you use it synchronously.

## Examples

```js
// Normally, Promise guarantees that it will be scheduled on the next tick
// (aka a "microtask")
let result = toutSuite(() => Promise.resolve(5).then((x) => x * 10));
console.log(result);
>>> 50
```