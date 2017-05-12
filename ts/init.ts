import Area from './Area';
import { enemies } from './enemies';

const selectedAreas = [];
const Areas = [];
const fightList = [];
const mode = 'encounters';

function createAreaSelector(areas: Area[]) {
  const select = document.getElementById('area');
  for (const area in areas) {
    const option = document.createElement('option');
    option.innerHTML = area;
    option.value = area;
    option.data = areas[area];
    select.appendChild(option);
  }
}

function createEnemyGroupSelector(enemies, areas: Area[]) {
  const areasSelect = document.getElementById('area');
  const area = areasSelect.options[areasSelect.selectedIndex].value;
  const select = document.getElementById('enemyGroup');
  // Clear
  while (select.options.length > 0) {
      select.remove(0);
  }
  for (const enemyGroup in areas[area].encounterTable) {
    const option = document.createElement('option');
    option.innerHTML = areas[area].encounterTable[enemyGroup].name;
    option.value = areas[area].encounterTable[enemyGroup].name;
    option.data = areas[area].encounterTable[enemyGroup];
    select.appendChild(option);
  }
}

function initAreas(enemies) {
  const areas = {};
  for (const area in enemies) {
    areas[area] = new Area(area, enemies[area]);
  }
  return areas;
}

Areas = initAreas(enemies);
createAreaSelector(Areas);
createEnemyGroupSelector(enemies, Areas);
