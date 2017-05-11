import Area from './Area';
import Fight from './Fight';
import RNG from './rng';

export function Encounters(areas: Area[], rng: RNG, iterations: number, partyLvl?: number) {
  const encounters = [];
  for (let i = 0; i < iterations; i++) {
    for (const j in areas) {
      const area = areas[j];
      if (area.isBattle(rng)) {
        const fight = area.getEncounter(rng);
        encounters.push(fight);
      }
    }
    rng.next();
  }
  return encounters;
}

export function generateRNGSequence(rng: RNG, iterations: number) {
  const sequence = [];
  for (let i = 0; i < iterations; i++) {
    sequence.push({index: i, rng: rng.getRNG()});
    rng.next();
  }
  return sequence;
}
