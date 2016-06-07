var lib = {
  mult32ulo: function(n, m) {
    n >>>= 0;
    m >>>= 0;
    var nlo = n & 0xffff;
    var nhi = n - nlo;
    return (((nhi * m >>> 0) + (nlo * m)) & 0xFFFFFFFF) >>> 0;
  },

  div32ulo: function(n, m) {
    return Math.floor(n/m) >>> 0;
  },

  calculateRNG: function(prev_rng) {
    var r3 = prev_rng;
    var r1 = 0x41c60000;

    r1 = r1 | 0x4e6d;

    var lo = mult32ulo(r1, r3);

    r3 = lo;
    r3 = r3 + 0x3039;
    return r3;
  },

  isRun: function(rng) {
    rng = calculateRNG(rng);
    var r2 = calcR2FromRng(rng);
    var r3 = 100;
    r3 = r2 % r3;
    return r3 > 50 ? true : false;
  },

  calcR2FromRng: function(rng) {
    var r2 = rng >> 16;
    r2 = r2 & 0x7FFF;
    return r2;
  }
}

var window;
if (typeof window === 'undefined') {
  module.exports = lib;
}

