selectedAreas = [];

function tableMaker(encounters, partyLvl) {
  var table = document.getElementById('encounterTable');
  table.innerHTML = '';
  for (var i in encounters) {
    var row = table.insertRow(i);
    row.data = encounters[i];
    var columns = [];
    for (var j = 0; j < 7; j++) {
      columns.push(row.insertCell(j));
    }
    columns[0].innerHTML = row.data.area;
    columns[1].innerHTML = row.data.name;
    columns[2].innerHTML = row.data.run;
    columns[3].innerHTML = row.data.startingRNG.toString(16);
    columns[4].innerHTML = row.data.battleRNG.toString(16);
    columns[5].innerHTML = row.data.index;
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
  createAreaSelector(enemies);
};

