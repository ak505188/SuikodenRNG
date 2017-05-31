import Area from './Area';
import RNG from './rng';

export function findRNG(area: Area, encounters: number[], rng: RNG, progress?: () => void) {
  const startTime = new Date().getTime();
  if (encounters.length <= 1) { return false; }
    // Smaller array size is slower but more space efficient. Performance drop should be negligable.
  const arraySize = 0xffff;
  const fights = new Array(arraySize);
  const fightsRNG = new Array(arraySize);
  for (let i = 0, index = 0; i < 0xffffffff; i++) {
    if (area.isBattle(rng)) {
      fights[index] = area.getEncounterIndex(rng);
      fightsRNG[index] = rng.getRNG();
      index++;
      if (index === arraySize - 1) {
        const result = bayerMoore(fights, encounters, area.encounterTable.length);
        if (result !== false) {
          console.log('Runtime: ' + (new Date().getTime() - startTime) / 1000 + ' seconds.');
          return fightsRNG[result].toString(16);
        }

        // Takes end of fights and puts it in the beginning for next iteration
        // Number of fight taken is length of pattern.
        for (let j = arraySize - encounters.length, k = 0; j < encounters.length; j++, k++) {
          fights[k] = fights[j];
          fightsRNG[k] = fights[j];
        }
        index = encounters.length;
      }
    }
    rng.next();
    if (i % 42949672 === 0) {
      console.log(Math.floor(i / 42949662) + '%');
    }
  }
  return false;
}

function bayerMoore(input, pattern, max) {
  // Create bad char array
  const badChar = new Array(max).fill(-1);
  for (let j = 0; j < pattern.length - 1; j++) {
    badChar[pattern[j]] = j;
  }

  // var pttrnIndx = pattern.length - 1;
  let i = pattern.length - 1;
  while (i < input.length) {
    // check if match
    let inputIndx = i;
    let pttrnIndx = pattern.length - 1;
    while (input[inputIndx] === pattern[pttrnIndx]) {
      inputIndx--;
      pttrnIndx--;
      if (pttrnIndx === -1) {
        return i - pattern.length + 1;
      }
    }
    const badCharVal = badChar[input[inputIndx]];
    // console.log('badCharVal:', badCharVal);
    const jump = badCharVal === -1 ? pattern.length - 1 : pattern.length - badCharVal - 1;
    i += jump;
  }
  return false;
}
