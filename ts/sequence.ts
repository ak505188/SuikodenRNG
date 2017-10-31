import * as $ from 'jquery';
import RNG from './rng';
import { generateRNGSequence } from './rngCalc';
import Table from './tables';

let table: Table = null;

function modify(): void {
  $('#table-container').hide();
  $('#form-data').show();
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
  const rng: number = parseInt($('#startRNG').val());
  const iterations: number= parseInt($('#iterations').val());

  const sequence = generateRNGSequence(new RNG(rng), iterations);
  const data = sequence.map((r, index) => {
    return {
      index,
      rng: r.toString(16) };
  });
  const headers = [
    { key: 'index', name: 'Index' },
    { key: 'rng', name: 'RNG' }
  ];
  table = new Table(headers, data);
  $('#form-data').hide();
  $('#table').empty();
  $('#table').append(table.generateHTMLTable());
  $('#table-container').show();
}

$(document).ready(() => {
  // Bind events to buttons
  $('#run').click(run);
  $('#modify').click(modify);
  $('#download').click(() => {
    if (table !== null) {
      download(table.generateCSV(), 'table.csv');
    } else {
      alert('No table to download!');
    }
  });
});
