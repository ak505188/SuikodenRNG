class RNG {
  // rng used to determine next rng
  // rng2 used for most calculations
  constructor(rng, psp, rng2) {
    this.rng = rng;
    if (psp === true) {
      this.psp = true;
      this.rng2 = rng2;
    } else {
      this.rng2 = lib.calcR2FromRng(rng);
    }
  }

  // Advances the RNG internally
  next() {
    var next = getNext();
    this.rng = next.rng;
    this.rng2 = next.rng2;
  }

  // Returns the next set of RNG values
  // Used when you don't want to advance
  // the RNG but need to see next value
  getNext() {
    if (!this.psp) {
      var rng = lib.mult32ulo(this.rng, 0x41c64e6d) + 0x3039;
      return { rng: rng, rng2: ((this.rng >> 16) & 0x7FFF) };
    } else {
      var a2 = 0x4c957f2d;
      var a3 = 0x5851f42d;
      var t1 = 0x7fffffff;
      var v0 = this.rng;
      var v1 = this.rng2;
      var t0 = lib.mult32ulo(v0, a3);
      var a0 = lib.mult32ulo(v0, a2);
      var a1 = lib.mult32uhi(v0, a2);
      a0 += 1;
      t0 += a1;
      v0 = a0 < 1 ? 1 : 0;
      var a2 = lib.mult32ulo(v1, a2);
      a1 = t0 + a2 + v0;
      v0 = a1;
      return { rng: a0, rng2: a1 };
    }
  }

  // get relevant value which is rng2
  // might need to change this after I look at how rng is used
  getRNG() {
    return this.rng2;
  }
}
