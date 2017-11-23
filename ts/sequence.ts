import * as $ from 'jquery';
import { IDs } from './constants';
import { download, fillAreaSelect, initAreas } from './lib';
import RNG from './rng';
import { generateRNGSequence } from './rngCalc';
import Table from './tables';

let table: Table = null;

function run(): void {
  const rng: number = parseInt($(`#${IDs.RNG}`).val() as string);
  const iterations: number = $(`#${IDs.Iterations}`).val() as number;

  const sequence = generateRNGSequence(new RNG(rng), iterations);
  const data = sequence.map((r, index) => {
    return {
      index,
      rng: r.toString(16),
    };
  });
  const headers = [
    { key: 'index', name: 'Index' },
    { key: 'rng', name: 'RNG' },
  ];
  table = new Table(headers, data);
  $(`#${IDs.Form}`).hide();
  $(`#${IDs.Table}`).empty();
  $(`#${IDs.Table}`).append(table.generateHTMLTable());
  $(`#${IDs.TableContainer}`).show();
}

$(document).ready(() => {
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
