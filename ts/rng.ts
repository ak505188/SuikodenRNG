import { mult32ulo } from './lib';

export default class RNG {
  // rng used to determine next rng
  // rng2 used for most calculations
  private rng: number;
  private rng2: number;
  private count: number;
  private originalRNG: number;

  constructor(rng: number) {
    this.rng         = rng;
    this.rng2        = this.calcRNG2(rng);
    this.originalRNG = rng;
    this.count       = 0;
  }

  public clone(): RNG {
    return new RNG(this.rng);
  }

  public getRNG() {
    return this.rng;
  }

  public getRNG2() {
    return this.rng2;
  }

  public getCount() {
    return this.count;
  }

  public reset() {
    this.rng   = this.originalRNG;
    this.rng2  = this.calcRNG2(this.rng);
    this.count = 0;
  }

  // Returns the next set of RNG values
  // Used when you don't want to advance
  // the RNG but need to see next value
  public getNext(iterations?: number) {
    iterations = iterations ? iterations : 1;
    let rng  = this.getRNG();
    let rng2 = this.getRNG2();
    for (let i = 0; i < iterations; i++) {
      rng  = mult32ulo(rng, 0x41c64e6d) + 0x3039;
      rng2 = rng >> 16 & 0x7FFF;
    }
    return { rng, rng2 };
  }

  // Advances the RNG internally
  public next() {
    const next = this.getNext();
    this.rng   = next.rng;
    this.rng2  = next.rng2;
    this.count++;
    return this;
  }

  private calcRNG2(rng: number) {
    return rng >> 16 & 0x7FFF;
  }
}
