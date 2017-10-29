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
  const partyLvl: number = parseInt($('#partyLvl').val());

  const areas: Area[] = $('#area-select').val().map((i) => {
    return Areas[i];
  });
  const encounters = Encounters(areas, new RNG(rng), iterations, partyLvl);
  const data = encounters.map((enc) => {
    return {
      area: enc.area.name,
      enemyGroup: enc.enemyGroup.name,
      index: enc.index,
      run: enc.run ? 'Run' : 'Fail'
    };
  });
  const headers = [
    { key: 'area', name: 'Area' },
    { key: 'enemyGroup', name: 'Enemy Group' },
    { key: 'index', name: 'Index' },
    { key: 'run', name: 'Run?' }
  ];
  table = new Table(headers, data);
  $('#table
    ').empty();
  $('#table').append(table.generateHTMLTable());
  $('#form-container').hide();
  $('#table-container').show();
}

$(document).ready(() => {
  fillAreaSelect('area-select');
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
