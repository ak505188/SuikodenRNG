import Area from './Area';
import EncounterTool from './EncounterTool';
import { enemies } from './enemies';
import RNG from './rng';
import Table from './tables';

const Areas = {};
for (const area in enemies) {
  Areas[area] = new Area(area, enemies[area]);
}

const rng = new RNG(0);

console.log('{');
console.log(`  0: ${rng.next().getRNG},'`);

while(rng.getRNG() !== 0) {
  console.log(`${rng.getRNG()}: ${rng.next().getRNG()},`);
}
