import Area from './Area';
import { enemies } from './enemies';

const Areas = [];
for (const area in enemies) {
  Areas.push(new Area(area, enemies[area]));
}

// console.log(JSON.stringify(Areas, null, 4));
