import * as $ from 'jquery';
import Area from './Area';
import { enemies } from './enemies';
import Fight from './Fight';
import { findRNG } from './findRNG';
import RNG from './rng';
import { Encounters, generateRNGSequence } from './rngCalc';
import Table from './tables';

interface IAreas {
  [key: string]: Area;
}

const Areas: IAreas = initAreas(enemies);
let fightList: number[] = [];
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

function addEnemyGroup(index: number) {
  fightList.push(index);
  fillCurrentlySelectedEnemies();
}

function fillAddableEnemies() {
  const area: Area = Areas[$('#area').val()];
  const divs = $('.addable').empty();
  let count = 0;
  let index = 0;

  for (const i in area.encounterTable) {
    console.log(i);
    const div = $('<div></div>', {
      class: 'clearfix',
      text: area.encounterTable[i].name
    });
    const button = $('<button></button>', {
      class: 'btn btn-primary btn-xs pull-right',
      text:  'Add'
    });
    $(button).click(() => {
      addEnemyGroup(parseInt(i, 10)); });
    $(div).append(button);
    $(divs[index]).append(div);
    index = Math.floor(++count / (Object.keys(area.encounterTable).length / divs.length));
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
    $(div).text(area.encounterTable[fightList[fight]].name);
    $(button).click(fight, removeEnemy);
    $(div).append(button);
    $(currentlySelected).append(div);
  }
}

function removeEnemy(data) {
  const index = data.data;
  fightList.splice(index, 1);
  fillCurrentlySelectedEnemies();
}

function run(): void {
  const area: string = $('#area').find(':selected').text();
  const rng: number = parseInt($('#startRNG').val());
  const frArea = Areas[area];
  alert(findRNG(frArea, fightList, new RNG(0x12)).toString(16));
}

$(document).ready(() => {
  createAreaSelector();
  fillAddableEnemies();
  // Bind events to buttons
  $('#area').change(() => {
    fillAddableEnemies();
  });
  $('#run').click(run);
});
