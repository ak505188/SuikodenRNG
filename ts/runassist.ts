import * as $ from 'jquery';
import Area from './Area';
import { IDs } from './constants';
import DynamicTable from './DynamicTable';
import EncounterTool from './EncounterTool';
import EncounterToolController from './EncounterToolController';
import EncounterToolView from './EncounterToolView';
import Fight from './Fight';
import { IAreas } from './interfaces';
import { fillAreaSelect, initAreas } from './lib';
import RNG from './rng';
import Table from './tables';

const Areas: IAreas = initAreas();
const selectedAreas: string[] = [];

function run(): void {
  const rng: number = parseInt($(`#${IDs.RNG}`).val() as string);
  const iterations: number = $(`#${IDs.Iterations}`).val() as number;
  const partylvl: number = $(`#${IDs.PartyLevel}`).val() as number;

  const selectAreas = $(`#${IDs.AreaSelect}`).val() as string[];
  const areas: Area[] = selectAreas.map((i) => {
    return Areas[i];
  });

  const encounters = new EncounterTool(areas, new RNG(rng), iterations, partylvl);
  const encToolController = new EncounterToolController(encounters);
  const encToolView = new EncounterToolView(encToolController, 'table-container');

  $(`#${IDs.Form}`).hide();
  $(`#${IDs.TableContainer}`).show();
}

$(document).ready(() => {
  fillAreaSelect(Areas);
  $(`#${IDs.Run}`).click(run);
});
