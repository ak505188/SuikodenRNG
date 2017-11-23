import * as $ from 'jquery';
import Area from './Area';
import { IDs } from './constants';
import { enemies } from './enemies';
import Fight from './Fight';
import { findRNG } from './findRNG';
import { IAreas } from './interfaces';
import { fillAreaSelect, initAreas } from './lib';
import RNG from './rng';
import { Encounters, generateRNGSequence } from './rngCalc';
import Table from './tables';

const Areas: IAreas = initAreas();
const table: Table = null;
let fightList: number[] = [];

function fillAddableEnemiesList() {
  const areaName: string = $(`#${IDs.AreaSelect}`).val() as string;
  const area: Area = Areas[areaName];
  const ul = $('#addable-enemy-groups').empty();

  for (let i = 0; i < area.encounterTable.length; i++) {
    const li = $('<li></li>', { class: 'addable' });
    const button = $('<button></button>', {
      class: 'option addable',
      text: area.encounterTable[i].name,
      value: i,
    });
    $(button).click(() => {
      addEnemyGroup(i);
    });
    $(li).append(button);
    $(ul).append(li);
  }
}

function fillSelectedEnemiesList() {
  const areaName: string = $(`#${IDs.AreaSelect}`).val() as string;
  const area: Area = Areas[areaName];
  const ul = $('#selected-enemy-groups').empty();

  if (fightList.length === 0) {
    ul.append($('<i>Selected fights show here.</i>'));
  }

  for (let i = 0; i < fightList.length; i++) {
    const li = $('<li></li>', { class: 'removable' });
    const button = $('<button></button>', {
      class: 'option removable',
      text: area.encounterTable[fightList[i]].name,
    });
    $(button).click(() => {
      removeEnemy(i);
    });
    $(li).append(button);
    $(ul).append(li);
  }
}

function addEnemyGroup(index: number) {
  fightList.push(index);
  fillSelectedEnemiesList();
}

function removeEnemy(index: number) {
  fightList.splice(index, 1);
  fillSelectedEnemiesList();
}

function run(): void {
  const area: string = $(`#${IDs.AreaSelect}`).val() as string;
  const rng: number = parseInt($('#startRNG').val() as string);
  const frArea = Areas[area];
  alert(findRNG(frArea, fightList, new RNG(0x12)).toString(16));
}

$(document).ready(() => {
  fillAreaSelect(Areas);
  fillAddableEnemiesList();

  fillSelectedEnemiesList();
  // Bind events to buttons
  $(`#${IDs.AreaSelect}`).change(() => {
    fillAddableEnemiesList();
    fightList = [];
    fillSelectedEnemiesList();
  });
  $(`#${IDs.Run}`).click(run);
});
