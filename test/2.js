var co = require('../');

function* yieldFunc() {
  var i = 0;
  var a = yield ++i;
  var a2 = yield ++i;
  var ret = yield * yieldFunc2();
  return ret.then(function(b) {
    return Promise.resolve({
      1: a,
      2: a2,
      b: b
    });
  });
}

function* yieldFunc2() {
  var i = 0;
  var b = yield --i;
  var b2 = yield --i;
  return new Promise(function(resolve, reject) {
    resolve({
      3: b,
      4: b2
    });
  });
}

co(function*() {
  var ret = yield * yieldFunc();
  return ret;
}).then(function(ret) {
  console.log(ret);
  var testResult = ret['1'] === 1 && ret['2'] === 2 && ret['b']['3'] === -1 && ret['b']['4'] === -2;
  console.log('test result: ', testResult ? 'success' : 'fail');
});