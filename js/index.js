function changeMode(_mode) {
  mode = _mode;
  selectMode();
}

function selectMode() {
  switch(mode) {
    case 'encounters':
      showElements(['.rng', '.iterations', '.partyLvl', '#addable_and_selected']);
      hideElements(['.area', '.enemyGroup']);
      fillAddableAreas();
      fillCurrentlySelectedAreas();
      break;
    case 'drops':
      showElements(['.rng', '.iterations', '.area', '.enemyGroup']);
      hideElements(['.partyLvl', '#addable_and_selected']);
      $('.rng').show();
      $('.iterations').show();
      $('.partyLvl').hide();
      $('.area').show();
      $('.enemyGroup').show();
      $('#addable_and_selected').hide();
      break;
    case 'sequence':
      showElements(['.rng', '.iterations']);
      hideElements(['.partyLvl', '.area', '.enemyGroup', '#addable_and_selected']);
      break;
    case 'findRNG':
      showElements(['.rng', '.area', '#addable_and_selected']);
      hideElements(['.iterations', '.partyLvl', '.enemyGroup']);
      fillAddableEnemies();
      fillCurrentlySelectedEnemies();
      break;
    default:
      console.error('Default switch should never be hit.');
  }
}

function showElements(element_ids) {
  for (var id in element_ids) {
    $(element_ids[id]).show();
  }
}

function hideElements(element_ids) {
  for (var id in element_ids) {
    $(element_ids[id]).hide();
  }
}

function modify() {
  $('#table-container').hide();
  $('#form-container').show();
  selectMode();
}

function reset() {
  selectedAreas = [];
  fightList = [];
  modify();
}

function addArea(area) {
  var select = document.getElementById('area');
  var data = area !== undefined ? area.data : select.options[select.selectedIndex].data;
  if ($.inArray(data, selectedAreas) === -1) {
    selectedAreas.push(data);
    fillCurrentlySelectedAreas();
  }
}

function addEnemyGroup(data) {
  fightList.push(data.data);
  fillCurrentlySelectedEnemies();
}

function fillAddableEnemies() {
  var area = areas[$('#area').val()];
  var divs = $('.addable').empty();
  var index = 0;
  var count = 0;

  for (var i in area.encounterTable) {
    var div = $('<div></div>', {
      'class': 'clearfix',
      text: area.encounterTable[i].name
    });
    var button = $('<button></button>', {
      'class': 'btn btn-primary btn-xs pull-right',
      text:  'Add'
    });
    $(button).click(parseInt(i), addEnemyGroup);
    $(div).append(button);
    $(divs[index]).append(div);
    index = Math.floor(++count/(Object.keys(area.encounterTable).length/divs.length));
  }
}

function fillAddableAreas() {
  var divs = $('.addable').empty();
  var index = 0;
  var count = 0;
  var invalid = 0;

  for (var i in areas) {
    if (areas[i].type === null) invalid++;
  }

  for (var area in areas) {
    var div = $('<div></div>', {
      'class': 'clearfix'
    });
    var button = $('<button></button>', {
      'class': 'btn btn-primary btn-xs pull-right',
      text:  'Add'
    });
    var data = areas[area];
    if (data.type !== null) {
      $(div).text(area);
      $(button).click(data, addArea);
      $(div).append(button);
      $(divs[index]).append(div);
      index = Math.floor(++count/((Object.keys(areas).length - invalid)/divs.length));
    }
  }
}

function fillCurrentlySelectedAreas() {
  var currently_selected = $('#currently_selected').empty();

  for (var i = 0; i < selectedAreas.length; i++) {
    var div = $('<div></div>', {
      'class': 'clearfix'
    });
    var button = $('<button></button>', {
      'class': 'btn btn-danger btn-xs pull-right',
      text:  'Remove'
    });
    $(div).text(selectedAreas[i].name);
    $(button).click(selectedAreas[i], removeArea);
    $(div).append(button);
    $(currently_selected).append(div);
  }
}

function fillCurrentlySelectedEnemies() {
  var currently_selected = $('#currently_selected').empty();
  var area = areas[$('#area').val()];

  for (var i = 0; i < fightList.length; i++) {
    var div = $('<div></div>', {
      'class': 'clearfix'
    });
    var button = $('<button></button>', {
      'class': 'btn btn-danger btn-xs pull-right',
      text:  'Remove'
    });
    $(div).text(area.encounterTable[fightList[i]].name);
    $(button).click(i, removeEnemy);
    $(div).append(button);
    $(currently_selected).append(div);
  }
}

function removeArea(area) {
  index = $.inArray(area.data, selectedAreas);
  if (index !== -1) {
    selectedAreas.splice(index, 1);
    fillCurrentlySelectedAreas();
  }
}

function generateCSVFromJSON() {
  var CSV = '';
  var table = document.getElementById('table');
  for (var row in table.rows) {
    var columns = [];
    for (var column = 0; column < table.rows[row].childElementCount; column++) {
      columns
        .push(table.rows[row].cells[column].innerHTML);
    }
    CSV += generateCSVRow(columns);
  }
  return CSV;
}

function removeEnemy(data) {
  index = data.data;
  fightList.splice(index, 1);
  fillCurrentlySelectedEnemies();
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

function run() {
  var selected = document.getElementById('mode');

  var areasSelect = document.getElementById('area');
  var area = areasSelect.options[areasSelect.selectedIndex].value;
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
      sequenceTableMaker(rng, iterations);
      break;
    case 'findRNG':
      alert('RNG found: ' + areas[area].findRNG(fightList));
      break;
  }
  if (mode != 'findRNG') {
    $('#form-container').hide();
    $('#table-container').show();
  }
}

