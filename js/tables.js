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

  var fights = encounters.map(function(fight) {
    var arr = [];
    arr.push(fight.area.name);
    arr.push(fight.EnemyGroup.name);
    arr.push(fight.run ? 'Run' : 'Fail');
    arr.push(fight.index);
    arr.push(fight.startingRNG.toString(16));
    arr.push(fight.battleRNG.toString(16));
    arr.push(fight.encounterValue);
    arr.push(fight.wheel);
    return arr;
  });

  tableMaker(fights, headers);
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

function sequenceTableMaker(rng, iterations) {
  sequence = generateRNGSequence(rng, iterations).map(function(data) {
    var arr = [];
    arr.push(data.index);
    arr.push(data.rng.toString(16));
    return arr;
  });
  tableMaker(sequence, ['Index', 'RNG']);
}

function tableMaker(data, headers) {
  var table = document.getElementById('table');
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

