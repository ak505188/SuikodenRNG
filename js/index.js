var selectedAreas = [];
var areas = [];
var fightList;

function encounterTableMaker(encounters, partyLvl) {
  var headers = [
    'Area Name',
    'Enemy Group',
    'Run?',
    'RNG Index',
    'Start RNG',
    'Battle RNG',
    'Encounter Value',
    'Wheel Attempt'
  ];

  if (partyLvl > 0) {
    encounters = encounters.filter(function(fight) {
      return fight.EnemyGroup.champVal > partyLvl;
    });
  }

  fightList = encounters.map(function(fight) {
    var arr = [];
    arr.push(fight.area.name);
    arr.push(fight.EnemyGroup.name);
    arr.push(fight.run ? 'Run' : 'Fail');
    arr.push(fight.index);
    arr.push(fight.startingRNG.toString(16));
    arr.push(fight.battleRNG.toString(16));
    arr.push(fight.encounterValue);
    arr.push(lib.wheelSuccess(fight.battleRNG));
    return arr;
  });

  tableMaker(fightList, headers);
}

function tableMaker(data, headers) {
  var table = document.getElementById('encounterTable');
  table.innerHTML = '';

  if (headers) {
    var header = table.createTHead();
    var headerRow = header.insertRow();
    var headerColumns = [];
    for (var k in headers) {
      headerColumns.push(headerRow.insertCell(k));
      headerColumns[k].innerHTML = headers[k];
    }
  }

  var body = table.appendChild(document.createElement('tbody'));
  for (var i in data) {
    var row = body.insertRow();
    var columns = [];
    for (var j in data[i]) {
      columns.push(row.insertCell(j));
      columns[j].innerHTML = data[i][j];
    }
  }
}

function dropTableMaker(group, rng, iterations) {
  var drops = group.calculateDrops(rng, iterations);
  var headers = [
    'Index',
    'RNG',
    'Drop'
  ];
  drops = drops.map(function(drop, index) {
    var arr = [];
    arr.push(index);
    arr.push(drop.rng);
    arr.push(drop.drop === null ? '---' : drop.drop);
    return arr;
  });
  tableMaker(drops, headers);
}


function selectMode() {
  var startRNG = document.getElementById('startRNGContainer');
  var iterations = document.getElementById('iterationsContainer');
  var partyLvl = document.getElementById('partyLvlContainer');
  var areas = document.getElementById('areasContainer');
  var addArea = document.getElementById('addAreaButton');
  var enemyGroup = document.getElementById('enemyGroupContainer');
  var addEnemyGroup = document.getElementById('addEnemyGroupButton');

  var selected = document.getElementById('mode');
  var mode = selected.options[selected.selectedIndex].value;
  switch(mode) {
    case 'encounters':
      startRNG.style.display = 'inline-block';
      iterations.style.display = 'inline-block';
      partyLvl.style.display = 'inline-block';
      areas.style.display = 'inline-block';
      addArea.style.display = 'inline-block';
      enemyGroup.style.display = 'none';
      addEnemyGroup.style.display = 'none';
      break;
    case 'drops':
      startRNG.style.display = 'inline-block';
      iterations.style.display = 'inline-block';
      partyLvl.style.display = 'none';
      areas.style.display = 'inline-block';
      addArea.style.display = 'none';
      enemyGroup.style.display = 'inline-block';
      addEnemyGroup.style.display = 'none';
      break;
    case 'sequence':
      startRNG.style.display = 'inline-block';
      iterations.style.display = 'inline-block';
      partyLvl.style.display = 'none';
      areas.style.display = 'none';
      addArea.style.display = 'none';
      enemyGroup.style.display = 'none';
      addEnemyGroup.style.display = 'none';
      break;
    case 'findRNG':
      startRNG.style.display = 'none';
      iterations.style.display = 'none';
      partyLvl.style.display = 'none';
      areas.style.display = 'inline-block';
      addArea.style.display = 'none';
      enemyGroup.style.display = 'inline-block';
      addEnemyGroup.style.display = 'inline-block';
      break;
    default:
      console.error('Default switch should never be hit.');
  }
}

function generateCSVFromJSON() {
  var CSV = '';
  var table = document.getElementById('encounterTable');
  for (var row in table.rows) {
    var columns = [];
    for (var column = 0; column < table.rows[row].childElementCount; column++) {
      columns.push(table.rows[row].cells[column].innerHTML);
    }
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
  var selected = document.getElementById('mode');
  var mode = selected.options[selected.selectedIndex].value;

  var rng = parseInt(document.getElementById('startRNG').value);
  var iterations = document.getElementById('iterations').value;
  var partyLvl = document.getElementById('partyLvl').value;
  var enemyGroup = document.getElementById('enemyGroup');
  enemyGroup = enemyGroup.options[enemyGroup.selectedIndex].data;

  switch(mode) {
    case 'encounters':
      Encounters(rng, iterations, selectedAreas, partyLvl, encounterTableMaker);
      break;
    case 'drops':
      dropTableMaker(enemyGroup, rng, iterations);
      break;
    case 'sequence':
      sequence = generateRNGSequence(rng, iterations).map(function(data) {
        var arr = [];
        arr.push(data.index);
        arr.push(data.rng.toString(16));
        return arr;
      });
      tableMaker(sequence, ['Index', 'RNG']);
      break;
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

function createEnemyGroupSelector(enemies) {
  var areasSelect = document.getElementById('areas');
  var area = areasSelect.options[areasSelect.selectedIndex].value;
  var select = document.getElementById('enemyGroup');
  // Clear
  while (select.options.length > 0) {
      select.remove(0);
  }
  for (var enemyGroup in areas[area].encounterTable) {
    var option = document.createElement('option');
    option.innerHTML = areas[area].encounterTable[enemyGroup].name;
    option.value = areas[area].encounterTable[enemyGroup].name;
    option.data = areas[area].encounterTable[enemyGroup];
    select.appendChild(option);
  }
}

function initAreas(enemies) {
  var areas = {};
  for (var area in enemies) {
    areas[area] = new Area(area, enemies[area]);
  }
  return areas;
}

window.onload = function() {
  areas = initAreas(enemies);
  createAreaSelector(enemies);
  createEnemyGroupSelector(enemies);
};

