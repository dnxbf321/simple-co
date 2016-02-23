module.exports = simpleCo;

/**
 * 最简单的 co
 * @param  {generator} gen
 * @return {Promise}
 */

function simpleCo(gen) {
  var ctx = this;
  return new Promise(function(resolve, reject) {
    gen = gen.call(ctx);
    fulNext();
    function fulNext(res) {
      try {
        var ret = gen.next(res);
        if (!ret.done) {
          fulNext(ret.value);
        } else {
          resolve(ret.value);
        }
      } catch ( e ) {
        reject(e);
      }
    }
  });
}