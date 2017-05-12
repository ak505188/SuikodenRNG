import Area from './Area';
import { enemies } from './enemies';

function createAreaSelector(areas: Area[]) {
  const select = document.getElementById('area');
  for (const area in areas) {
    if (areas.hasOwnProperty(area)) {
      const option = document.createElement('option');
      option.innerHTML = area;
      option.value = area;
      select.appendChild(option);
    }
  }
}

function createEnemyGroupSelector(enemies, areas: Area[]) {
  const areasSelect = document.getElementById('area') as HTMLSelectElement;
  const area = areasSelect.options[areasSelect.selectedIndex].value;
  const select = document.getElementById('enemyGroup') as HTMLSelectElement;
  // Clear
  while (select.options.length > 0) {
      select.remove(0);
  }
  for (const enemyGroup in areas[area].encounterTable) {
    if (areas[area].encounterTable.hasOwnProperty(enemyGroup)) {
      const option = document.createElement('option');
      option.innerHTML = areas[area].encounterTable[enemyGroup].name;
      option.value = areas[area].encounterTable[enemyGroup].name;
      select.appendChild(option);
    }
  }
}

function initAreas(enemies) {
  const areas = {};
  for (const area in enemies) {
    if (enemies.hasOwnProperty(area)) {
      areas[area] = new Area(area, enemies[area]);
    }
  }
  return areas;
}

export const Areas: Area {} = initAreas(enemies);
export let mode: string = 'encounters';

createAreaSelector(Areas);
createEnemyGroupSelector(enemies, Areas);
