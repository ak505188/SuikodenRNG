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

function fillAreaSelect(selectId: string): void {
  const areaSelect = $(`#${selectId}`);

  for (const area in Areas) {
    if (Areas[area].areaType !== null) {
      areaSelect.append($('<option>', {
        text: area,
        value: area
      }));
    }
  }
}

function run(): void {
  const rng: number = parseInt($('#startRNG').val());
  const iterations: number= parseInt($('#iterations').val());
  const partyLvl: number = parseInt($('#partyLvl').val());

  const areas: Area[] = $('#area-select').val().map((i) => {
    return Areas[i];
  });

  const encounters = new EncounterTool(areas, new RNG(rng), iterations, partyLvl);
  const encToolController = new EncounterToolController(encounters);
  const encToolView = new EncounterToolView(encToolController, 'table-container');

  $('#form-data').hide();
  // $('#encounter-gui').show();
}

$(document).ready(() => {
  // Bind events to buttons
  $('#run').click(run);
  // $('#hide').click(() => {
  //   $('#table tr > *:nth-child(2)').hide();
  // });
  fillAreaSelect('area-select');
});
