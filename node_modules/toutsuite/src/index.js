import {SynchronousPromise} from 'synchronous-promise';

function isObject(obj) {
  return obj === Object(obj);
}

function fakeSetTimeout(f, d, ...args) {
  f(...args);
}

function fakeSetImmediate(f, ...args) {
  f(...args);
}

export default function toutSuite(block) {
  let realPromise = global.Promise;
  let realSetImmediate = global.setImmediate;
  let realSetTimeout = global.setTimeout;
  let realNextTick = process.nextTick;

  global.Promise = SynchronousPromise;
  global.setImmediate = fakeSetImmediate;
  global.setTimeout = fakeSetTimeout;
  process.nextTick = fakeSetImmediate;

  try {
    let ret = block();
    if (isObject(ret) && 'then' in ret) {
      let val;
      ret.then((x) => val = x);

      return val;
    }
  } finally {
    global.Promise = realPromise;
    global.setImmediate = realSetImmediate;
    global.setTimeout = realSetTimeout;
    process.nextTick = realNextTick;
  }
}