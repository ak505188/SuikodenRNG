function mult32ulo(n, m) {
  n >>>= 0;
  m >>>= 0;
  var nlo = n & 0xffff;
  var nhi = n - nlo;
  return (((nhi * m >>> 0) + (nlo * m)) & 0xFFFFFFFF) >>> 0;
}

function div32ulo(n, m) {
  return Math.floor(n/m) >>> 0;
}

function calculateRNG(prev_rng) {
  return mult32ulo(0x41c64e6d, prev_rng) + 0x3039;
}

function advanceRNG(rng, iterations) {
  for (var i = 0; i < iterations; i++) {
    rng = calculateRNG(rng);
  }
  return rng;
}

function calcR2FromRng(rng) {
  var r2 = rng >> 16;
  r2 = r2 & 0x7FFF;
  return r2;
}

