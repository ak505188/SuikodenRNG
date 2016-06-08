var selectedAreas = [];
var areas = [];
var fightList;

function tableMaker(encounters, partyLvl) {
  var table = document.getElementById('encounterTable');
  fightList = encounters;
  table.innerHTML = '';
  for (var i in encounters) {
    var row = table.insertRow(i);
    row.data = encounters[i];
    var columns = [];
    for (var j = 0; j < 7; j++) {
      columns.push(row.insertCell(j));
    }
    columns[0].innerHTML = row.data.area.name;
    columns[1].innerHTML = row.data.EnemyGroup.name;
    columns[2].innerHTML = row.data.run ? 'Run' : 'Fail';
    columns[3].innerHTML = row.data.index;
    columns[4].innerHTML = row.data.startingRNG.toString(16);
    columns[5].innerHTML = row.data.battleRNG.toString(16);
    columns[6].innerHTML = row.data.encounterValue;
    if (partyLvl && row.data.champVal < partyLvl) {
      row.style.display = 'none';
    }
  }
}

function createAreaSelector(enemies) {
  var select = document.getElementById('areas');
  for (var area in areas) {
    var option = document.createElement('option');
    option.innerHTML = area;
    option.value = area;
    option.data = areas[area];
    select.appendChild(option);
  }
}

function generateCSVfromJSON(fightList) {
  var CSV = '';
  for (var row in fightList) {
    var columns = [
      fightList[row].area.name,
      fightList[row].EnemyGroup.name,
      fightList[row].run ? 'Run' : 'Fail',
      fightList[row].index,
      fightList[row].startingRNG.toString(16),
      fightList[row].battleRNG.toString(16),
      fightList[row].encounterValue
    ];
    CSV += generateCSVRow(columns);
  }
  return CSV;
}

function download(item, filename) {
  // http://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(item));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function generateCSVRow(arr) {
  var row = '';
  for (var index in arr) {
    row += '"' + arr[index] + '"';
    if (index < arr.length - 1) row += ',';
  }
  row += String.fromCharCode(13);
  return row;
}

function addArea(area) {
  var select = document.getElementById('areas');
  var data = select.options[select.selectedIndex].data;
  selectedAreas.push(data);
}

function run() {
  var rng = parseInt(document.getElementById('startRNG').value);
  var iterations = document.getElementById('iterations').value;
  var partyLvl = document.getElementById('partyLvl').value;
  Encounters(rng, iterations, selectedAreas, partyLvl, tableMaker);
}

window.onload = function() {
  areas = initAreas(enemies);
  createAreaSelector(enemies);
};

