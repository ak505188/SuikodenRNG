import * as $ from 'jquery';
import Area from './Area';
import { enemies } from './enemies';
import Fight from './Fight';
import RNG from './rng';
import { Encounters, generateRNGSequence } from './rngCalc';
import Table from './tables';

interface IAreas {
  [key: string]: Area;
}

interface ICalculatedDrop {
  rng: number;
  drop: string;
}

const Areas: IAreas = initAreas(enemies);
let selectedAreas: string[] = [];
let fightList: Fight[] = [];
let mode: string = 'encounters';
let table: Table = null;

function initAreas(enemies) {
  const areas = {};
  for (const area in enemies) {
    if (enemies.hasOwnProperty(area)) {
      areas[area] = new Area(area, enemies[area]);
    }
  }
  return areas;
}

function createAreaSelector() {
  $.each(Areas, (name, area) => {
    $('#area').append($('<option>', { value: name }).text(name));
  });
}

function createEnemyGroupSelector() {
  const area: string = $('#area').find(':selected').text();
  const encounterTable = Areas[area].encounterTable;

  // Clear select element
  $('#enemyGroup').find('option').remove().end();

  $.each(encounterTable, (index, enemyGroup) => {
    $('#enemyGroup').append($('<option>', { value: index }).text(enemyGroup.name));
  });
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

function run(): void {
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
      const data = encounters.map((enc) => {
        return {
          area: enc.area.name,
          enemyGroup: enc.enemyGroup.name,
          index: enc.index,
          run: enc.run ? 'Run' : 'Fail'
        };
      });
      const headers = [
        { key: 'area', name: 'Area' },
        { key: 'enemyGroup', name: 'Enemy Group' },
        { key: 'index', name: 'Index' },
        { key: 'run', name: 'Run?' }
      ];
      table = new Table(headers, data);
      $('#table').append(table.generateHTMLTable());
      break;
    case 'drops':

      const group = Areas[area].getEnemyGroup(enemyGroup);
      const drops: ICalculatedDrop[] = group.calculateDrops(new RNG(rng), iterations);
      const dropsData = drops.map((drop, index) => {
        return {
          drop: drop.drop,
          index: index,
          rng: drop.rng.toString(16)
        };
      });
      const dropsHeaders = [
        { key: 'index', name: 'index' },
        { key: 'drop', name: 'Drop' },
        { key: 'rng', name: 'RNG' }
      ];
      table = new Table(dropsHeaders, dropsData);
      $('#table').append(table.generateHTMLTable());
      break;
    case 'sequence':
      const sequence = generateRNGSequence(new RNG(rng), iterations);
      const h = [
        { key: 'index', name: 'Index' },
        { key: 'rng', name: 'RNG' }
      ];
      const d = sequence.map((r, index) => {
        return { index: index, rng: r.toString(16) };
      });
      table = new Table(h, d);
      $('#table').append(table.generateHTMLTable());
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
  selectMode();
  modify();

  createAreaSelector();
  createEnemyGroupSelector();

  // Bind events to buttons
  $('#modeEncounters').click(() => { changeMode('encounters'); });
  $('#modeDrops').click(() => { changeMode('drops'); });
  $('#modeSequence').click(() =>  { changeMode('sequence'); });
  $('#modeFindRNG').click(() => { changeMode('findRNG'); });
  $('#area').change(() => {
    createEnemyGroupSelector();
    fillAddableEnemies();
  });
  $('#run').click(run);
  $('#modify').click(modify);
  $('#reset').click(reset);
  $('#download').click(() => {
    if (table !== null) {
      download(table.generateCSV(), 'table.csv');
    } else {
      alert('No table to download!');
    }
  });
});
