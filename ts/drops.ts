import * as $ from 'jquery';
import Area from './Area';
import { IDs } from './constants';
import { IAreas, ICalculatedDrop } from './interfaces';
import { download, fillAreaSelect, initAreas } from './lib';
import RNG from './rng';
import Table from './tables';

const Areas: IAreas = initAreas();
let table: Table = null;

function fillEnemySelect(area: Area): void {
  const enemySelect = $(`#${IDs.EnemySelect}`);
  // const area: string = $('#area').find(':selected').text();
  const encounterTable = area.encounterTable;

  // Clear select element
  enemySelect.find('option').remove().end();

  $.each(encounterTable, (index, enemyGroup) => {
    enemySelect.append($('<option>', {
      text: enemyGroup.name,
      value: enemyGroup.name,
    }));
  });
}

function run(): void {
  const rng: number = parseInt($(`#${IDs.RNG}`).val() as string);
  const iterations: number = $(`#${IDs.Iterations}`).val() as number;
  const area: string = $(`#${IDs.AreaSelect}`).val() as string;
  const enemyGroup: string = $(`#${IDs.EnemySelect}`).val() as string;

  const group = Areas[area].getEnemyGroup(enemyGroup);
  const drops: ICalculatedDrop[] = group.calculateDrops(new RNG(rng), iterations);
  const data = drops.map((drop, index) => {
    return {
      drop: drop.drop,
      index,
      rng: drop.rng.toString(16),
    };
  });
  const headers = [
    { key: 'index', name: 'Index' },
    { key: 'drop', name: 'Drop' },
    { key: 'rng', name: 'RNG' },
  ];
  table = new Table(headers, data);
  $('#form-data').hide();
  $('#table').empty();
  $('#table').append(table.generateHTMLTable());
  $('#table-container').show();
}

$(document).ready(() => {
  fillAreaSelect(Areas);
  fillEnemySelect(Areas['Cave of the Past']);
  $(`#${IDs.AreaSelect}`).change(() => {
    const area = Areas[$(`#${IDs.AreaSelect}`).val() as string];
    fillEnemySelect(area);
  });
  // Bind events to buttons
  $('#run').click(run);
  $('#download').click(() => {
    if (table !== null) {
      download(table.generateCSV(), 'table.csv');
    } else {
      alert('No table to download!');
    }
  });
});
