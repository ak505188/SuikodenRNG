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

interface ICalculatedDrop {
  rng: number;
  drop: string;
}

const Areas: IAreas = initAreas(enemies);
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

function modify(): void {
  $('#table-container').hide();
  $('#form-container').show();
}

function fillAreaSelect(selectID: string): void {
  const areaSelect = $(`#${selectID}`);

  for (const area in Areas) {
    if (Areas[area].areaType !== null) {
      areaSelect.append($('<option>', {
        text: area,
        value: area
      }));
    }
  }
}

function fillEnemySelect(selectID: string, area: Area): void {
  const enemySelect = $(`#${selectID}`);
  // const area: string = $('#area').find(':selected').text();
  const encounterTable = area.encounterTable;

  // Clear select element
  enemySelect.find('option').remove().end();

  $.each(encounterTable, (index, enemyGroup) => {
    enemySelect.append($('<option>', {
      text: enemyGroup.name,
      value: enemyGroup.name
    }));
  });
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
  const area: string = $('#area-select').val();
  const enemyGroup: string = $('#enemy-select').val();

  const group = Areas[area].getEnemyGroup(enemyGroup);
  const drops: ICalculatedDrop[] = group.calculateDrops(new RNG(rng), iterations);
  const data = drops.map((drop, index) => {
    return {
      drop: drop.drop,
      index: index,
      rng: drop.rng.toString(16)
    };
  });
  const headers = [
    { key: 'index', name: 'Index' },
    { key: 'drop', name: 'Drop' },
    { key: 'rng', name: 'RNG' }
  ];
  table = new Table(headers, data);
  $('#form-data').hide();
  $('#table').empty();
  $('#table').append(table.generateHTMLTable());
  $('#table-container').show();
}

$(document).ready(() => {
  fillAreaSelect('area-select');
  fillEnemySelect('enemy-select', Areas['Cave of the Past']);
  $('#area-select').change(() => {
    fillEnemySelect('enemy-select', Areas[$('#area-select').val()]);
  });
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
