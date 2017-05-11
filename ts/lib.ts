export function mult32ulo(n: number, m: number): number {
  n >>>= 0;
  m >>>= 0;
  const nlo = n & 0xffff;
  const nhi = n - nlo;
  return (((nhi * m >>> 0) + (nlo * m)) & 0xFFFFFFFF) >>> 0;
}

export function mult32uhi(n: number, m: number): number {
  n >>>= 0;
  m >>>= 0;

  return ((n * m) - this.mult32ulo(n, m)) / Math.pow(2, 32);
}

export function div32ulo(n: number, m: number): number {
  return Math.floor(n / m) >>> 0;
}
