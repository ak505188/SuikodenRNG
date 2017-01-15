class RNG {
  // rng used to determine next rng
  // rng2 used for most calculations
  constructor(rng, psp, rng2) {
    this.rng = rng;
    if (psp === true) {
      this.psp = true;
      this.rng2 = rng2;
    } else {
      this.rng2 = calcR2FromRng(rng);
    }
  }

  clone() {
    return new RNG(this.rng, this.psp, this.rng2);
  }

  getRNG() {
    return this.rng;
  }

  getRNG2() {
    return this.rng2;
  }

  // Returns the next set of RNG values
  // Used when you don't want to advance
  // the RNG but need to see next value
  getNext(rng, rng2) {
    if (rng === undefined) {
      rng = this.rng;
      rng2 = this.rng2;
    }
    if (!this.psp) {
      rng = mult32ulo(rng, 0x41c64e6d) + 0x3039;
      return { rng: rng, rng2: ((rng >> 16) & 0x7FFF) };
    } else {
      var a2 = 0x4c957f2d;
      var a3 = 0x5851f42d;
      var t1 = 0x7fffffff;
      var v0 = rng;
      var v1 = rng2;
      var t0 = mult32ulo(v0, a3);
      var a0 = mult32ulo(v0, a2);
      var a1 = mult32uhi(v0, a2);
      a0 += 1;
      t0 += a1;
      v0 = a0 < 1 ? 1 : 0;
      var a2 = mult32ulo(v1, a2);
      a1 = t0 + a2 + v0;
      v0 = a1;
      return { rng: a0, rng2: a1 };
    }
  }

  // Advances the RNG internally
  next() {
    var next = this.getNext();
    this.rng = next.rng;
    this.rng2 = next.rng2;
    return this;
  }
}
