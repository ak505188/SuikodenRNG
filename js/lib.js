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
    return lib.mult32ulo(0x41c64e6d, prev_rng) + 0x3039;
  },

  advanceRNG: function(rng, iterations) {
    for (var i = 0; i < iterations; i++) {
      rng = lib.calculateRNG(rng);
    }
    return rng;
  },

  calcR2FromRng: function(rng) {
    var r2 = rng >> 16;
    r2 = r2 & 0x7FFF;
    return r2;
  },

  wheelSuccess: function(rng) {
    var counter = 0;
    var success = function(pos) {
      return pos >= 0x7f && pos <= 0xa0;
    };
    do {
      counter++;
      rng = this.calculateRNG(rng);
    } while (!success(this.div32ulo(this.calcR2FromRng(rng), 0x5a)));
    return --counter;
  }
};
