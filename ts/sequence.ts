import * as $ from 'jquery';
import { IDs } from './constants';
import { download, fillAreaSelect, initAreas } from './lib';
import RNG from './rng';
import { generateRNGSequence } from './rngCalc';
import DynamicTable from './DynamicTable';

let table: DynamicTable = null;

function run(): void {
  const rng: number = parseInt($(`#${IDs.RNG}`).val() as string);
  const iterations: number = $(`#${IDs.Iterations}`).val() as number;

  const sequence = generateRNGSequence(new RNG(rng), iterations);
  const data = sequence.map((r, index) => {
    return [
      index,
      r.toString(16),
    ]
  });
  const headers = [
    'Index',
    'RNG',
  ];
  table = new DynamicTable(IDs.TableContainer);
  table.generateTable(data, headers);
  $(`#${IDs.Form}`).hide();
  $('#output-container').show();
  $(`#${IDs.TableContainer}`).show();
}

$(document).ready(() => {
  // Bind events to buttons
  $(`#${IDs.Run}`).click(run);
});
