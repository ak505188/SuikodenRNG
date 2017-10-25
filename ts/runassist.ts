import * as $ from 'jquery';
import Area from './Area';
import DynamicTable from './DynamicTable';
import EncounterTool from './EncounterTool';
import EncounterToolController from './EncounterToolController';
import EncounterToolView from './EncounterToolView';
import { enemies } from './enemies';
import Fight from './Fight';
import RNG from './rng';
import Table from './tables';

interface IAreas {
  [key: string]: Area;
}

const Areas: IAreas = initAreas(enemies);
const selectedAreas: string[] = [];
let table: DynamicTable = null;

function initAreas(enemies) {
  const areas = {};
  for (const area in enemies) {
    if (enemies.hasOwnProperty(area)) {
      areas[area] = new Area(area, enemies[area]);
    }
  }
  return areas;
}

function addArea(area: string) {
  if ($.inArray(area, selectedAreas) === -1) {
    selectedAreas.push(area);
    fillCurrentlySelectedAreas();
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
    const div = $('<div></div>', { class: 'clearfix' });
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

function removeArea(area) {
  const index = $.inArray(area.data, selectedAreas);
  if (index !== -1) {
    selectedAreas.splice(index, 1);
    fillCurrentlySelectedAreas();
  }
}

function run(): void {
  const rng: number = parseInt($('#startRNG').val());
  const iterations: number= parseInt($('#iterations').val());
  const partyLvl: number = parseInt($('#partyLvl').val());

  const areas: Area[] = selectedAreas.map((i) => {
    return Areas[i];
  });
  const encounters = new EncounterTool(areas, new RNG(rng), iterations, partyLvl);
  const encToolController = new EncounterToolController(encounters);
  const encToolView = new EncounterToolView(encToolController, 'table-container');

  $('#form-container').hide();
  // $('#encounter-gui').show();
}

$(document).ready(() => {
  // Bind events to buttons
  $('#run').click(run);
  // $('#hide').click(() => {
  //   $('#table tr > *:nth-child(2)').hide();
  // });
  fillAddableAreas();
});
