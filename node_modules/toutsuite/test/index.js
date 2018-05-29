import toutSuite from '../src/index';

describe('the toutSuite function', function () {
  it ('should run synchronously', function () {
    let canary;

    let block = () => {
      Promise.resolve(10)
        .then((x) => x * 5)
        .then((x) => canary = x);
    };

    canary = null;
    block();
    expect(canary).to.equal(null);

    canary = null;
    toutSuite(block);
    expect(canary).to.equal(50);

    canary = null;
    block();
    expect(canary).to.equal(null);
  });

  it('should resolve promises', function() {
    let block = () => {
      return Promise.resolve(10)
        .then((x) => x * 5);
    };

    expect(toutSuite(block)).to.equal(50);
  });
});