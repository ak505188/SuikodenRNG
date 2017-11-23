import * as $ from 'jquery';
import Area from './Area';
import { IDs } from './constants';
import { IAreas } from './interfaces';
import { download, fillAreaSelect, initAreas } from './lib';
import RNG from './rng';
import { Encounters, generateRNGSequence } from './rngCalc';
import Table from './tables';

const Areas: IAreas = initAreas();
let table: Table = null;

function run(): void {
  const rng: number = parseInt($(`#${IDs.RNG}`).val() as string);
  const iterations: number = $(`#${IDs.Iterations}`).val() as number;
  const partyLevel: number = $(`#${IDs.PartyLevel}`).val() as number;

  const selectAreas = $(`#${IDs.AreaSelect}`).val() as string[];
  const areas: Area[] = selectAreas.map((i) => {
    return Areas[i];
  });
  const encounters = Encounters(areas, new RNG(rng), iterations, partyLevel);
  const data = encounters.map((enc) => {
    return {
      area: enc.area.name,
      enemyGroup: enc.enemyGroup.name,
      index: enc.index,
      run: enc.run ? 'Run' : 'Fail',
    };
  });
  const headers = [
    { key: 'area', name: 'Area' },
    { key: 'enemyGroup', name: 'Enemy Group' },
    { key: 'index', name: 'Index' },
    { key: 'run', name: 'Run?' },
  ];
  table = new Table(headers, data);
  $(`#${IDs.Table}`).empty();
  $(`#${IDs.Table}`).append(table.generateHTMLTable());
  $(`#${IDs.Form}`).hide();
  $(`#${IDs.TableContainer}`).show();
}

$(document).ready(() => {
  fillAreaSelect(Areas);
  // Bind events to buttons
  $(`#${IDs.Run}`).click(run);
  $(`#${IDs.Download}`).click(() => {
    if (table !== null) {
      download(table.generateCSV(), 'table.csv');
    } else {
      alert('No table to download!');
    }
  });
});
