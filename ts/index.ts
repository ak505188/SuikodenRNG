import * as $ from 'jquery';
import Area from './Area';
import { enemies } from './enemies';
import Fight from './Fight';
import RNG from './rng';
import { Encounters } from './rngCalc';
import Table from './tables';

interface IAreas {
  [key: string]: Area;
}

const Areas: IAreas = initAreas(enemies);

let selectedAreas: string[] = [];
let fightList: Fight[] = [];
let mode: string = 'encounters';

function initAreas(enemies) {
  const areas = {};
  for (const area in enemies) {
    if (enemies.hasOwnProperty(area)) {
      areas[area] = new Area(area, enemies[area]);
    }
  }
  return areas;
}

function createAreaSelector(areas: IAreas) {
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

function createEnemyGroupSelector(enemies, areas: Area) {
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

function changeMode(m: string): void {
  mode = m;
  selectMode();
}

function selectMode(): void {
  switch (mode) {
    case 'encounters':
      showElements(['.rng', '.iterations', '.partyLvl', '#addable_options', '#currently_selected']);
      hideElements(['.area', '.enemyGroup']);
      fillAddableAreas();
      fillCurrentlySelectedAreas();
      break;
    case 'drops':
      showElements(['.rng', '.iterations', '.area', '.enemyGroup']);
      hideElements(['.partyLvl', '#addable_options', '#currently_selected']);
      break;
    case 'sequence':
      showElements(['.rng', '.iterations']);
      hideElements(['.partyLvl', '.area', '.enemyGroup', '#addable_options', '#currently_selected']);
      break;
    case 'findRNG':
      showElements(['.rng', '.area', '#addable_options', '#currently_selected']);
      hideElements(['.iterations', '.partyLvl', '.enemyGroup']);
      fillAddableEnemies();
      fillCurrentlySelectedEnemies();
      break;
    default:
      console.error('Default switch should never be hit.');
  }
}

function showElements(ids: string[]): void {
  for (const id of ids) {
    // for (const id of ids) {
    $(id).show();
  }
}

function hideElements(ids: string[]): void {
  for (const id of ids) {
    $(id).hide();
  }
}

function modify(): void {
  $('#table-container').hide();
  $('#form-container').show();
  selectMode();
}

function reset() {
  selectedAreas = [];
  fightList = [];
  modify();
}

function addArea(area: string) {
  if ($.inArray(area, selectedAreas) === -1) {
    selectedAreas.push(area);
    fillCurrentlySelectedAreas();
  }
}

function addEnemyGroup(data) {
  fightList.push(data.data);
  fillCurrentlySelectedEnemies();
}

function fillAddableEnemies() {
  const area: Area = Areas[$('#area').val()];
  const divs = $('.addable').empty();
  let count = 0;
  let index = 0;

  for (const i in area.encounterTable) {
    const div = $('<div></div>', {
      class: 'clearfix',
      text: area.encounterTable[i].name
    });
    const button = $('<button></button>', {
      class: 'btn btn-primary btn-xs pull-right',
      text:  'Add'
    });
    $(button).click(parseInt(i, 10), addEnemyGroup);
    $(div).append(button);
    $(divs[index]).append(div);
    index = Math.floor(++count / (Object.keys(area.encounterTable).length / divs.length));
  }
}

function fillAddableAreas() {
  const divs = $('.addable').empty();
  let index = 0;
  let count = 0;
  let invalid = 0;

  for (const area in Areas) {
    if (Areas[area].areaType === null)  {
      invalid++;
    }
  }

  for (const area in Areas) {
    const div = $('<div></div>', { class: 'clearfix' });
    const button = $('<button></button>', {
      class: 'btn btn-primary btn-xs pull-right',
      text:  'Add'
    });
    if (Areas[area].areaType !== null) {
      $(div).text(area);
      $(button).click(() => { addArea(area); });
      $(div).append(button);
      $(divs[index]).append(div);
      index = Math.floor(++count / ((Object.keys(Areas).length - invalid) / divs.length));
    }
  }
}

function fillCurrentlySelectedAreas() {
  const currentlySelected = $('#currently_selected').empty();

  for (const area of selectedAreas) {
    const div = $('<div></div>', {
      'class': 'clearfix'
    });
    const button = $('<button></button>', {
      class: 'btn btn-danger btn-xs pull-right',
      text:  'Remove'
    });
    $(div).text(Areas[area].name);
    $(button).click(area, removeArea);
    $(div).append(button);
    $(currentlySelected).append(div);
  }
}

function fillCurrentlySelectedEnemies() {
  const currentlySelected = $('#currently_selected').empty();
  const area = Areas[$('#area').val()];

  for (const fight in fightList) {
    const div = $('<div></div>', { class: 'clearfix' });
    const button = $('<button></button>', {
      class: 'btn btn-danger btn-xs pull-right',
      text:  'Remove'
    });
    $(div).text(fightList[fight].enemyGroup.name);
    $(button).click(fight, removeEnemy);
    $(div).append(button);
    $(currentlySelected).append(div);
  }
}

function removeArea(area) {
  const index = $.inArray(area.data, selectedAreas);
  if (index !== -1) {
    selectedAreas.splice(index, 1);
    fillCurrentlySelectedAreas();
  }
}

function removeEnemy(data) {
  const index = data.data;
  fightList.splice(index, 1);
  fillCurrentlySelectedEnemies();
}

function download(item, filename) {
  // http://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(item));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function run() {
  const area: string = $('#area').find(':selected').text();
  const rng: number = parseInt($('#startRNG').val());
  const iterations: number= parseInt($('#iterations').val());
  const partyLvl: number = parseInt($('#partyLvl').val());
  const enemyGroup: string = $('#enemyGroup').find(':selected').text();

  switch (mode) {
    case 'encounters':
      const areas: Area[] = selectedAreas.map((i) => {
        return Areas[i];
      });
      const encounters = Encounters(areas, new RNG(rng), iterations, partyLvl);
      console.log(encounters);
      const data = encounters.map((enc) => {
        const e = {};
        e['area'] = enc.area.name;
        e['enemyGroup'] = enc.enemyGroup.name;
        e['index'] = enc.index;
        e['run'] = enc.run ? 'Run' : 'Fail';
        return e;
      });
      const headers = [
        { key: 'area', name: 'Area' },
        { key: 'enemyGroup', name: 'Enemy Group' },
        { key: 'index', name: 'Index' },
        { key: 'run', name: 'Run?' }
      ];
      const table = new Table(headers, data);
      $('#table').append(table.generateHTMLTable());
      break;
    case 'drops':
      // dropTableMaker(enemyGroup, new RNG(rng), iterations);
      break;
    case 'sequence':
      // sequenceTableMaker(new RNG(rng), iterations);
      break;
    case 'findRNG':
      alert('RNG found: ' + areas[area].findRNG(fightList));
      break;
  }
  if (mode !== 'findRNG') {
    $('#form-container').hide();
    $('#table-container').show();
  }
}

$(document).ready(() => {
  // Bind events
  $('#run').click(run);
  $('#modify').click(modify);
  $('#reset').click(reset);

  selectMode();
  modify();
});
