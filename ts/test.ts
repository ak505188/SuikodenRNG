import Area from './Area';
import { enemies } from './enemies';
import RNG from './rng';
import { Encounters } from './rngCalc';

const Areas = {};
for (const area in enemies) {
  Areas[area] = new Area(area, enemies[area]);
}

const encounters = Encounters([Areas['Cave of the Past']], new RNG(0x12), 1000);
console.log(encounters[0].enemyGroup.enemies[0].drops);

// console.log(JSON.stringify(encounters, null, 4));
