function changeMode(_mode) {
  mode = _mode;
  selectMode();
}

function selectMode() {
  switch(mode) {
    case 'encounters':
      $('.rng').show();
      $('.iterations').show();
      $('.partyLvl').show();
      $('.area').show();
      $('#addAreaButton').show();
      $('.enemyGroup').hide();
      $('#addEnemyGroup').hide();
      break;
    case 'drops':
      $('.rng').show();
      $('.iterations').show();
      $('.partyLvl').hide();
      $('.area').show();
      $('#addAreaButton').hide();
      $('.enemyGroup').show();
      $('#addEnemyGroup').hide();
      break;
    case 'sequence':
      $('.rng').show();
      $('.iterations').show();
      $('.partyLvl').hide();
      $('.area').hide();
      $('#addAreaButton').hide();
      $('.enemyGroup').hide();
      $('#addEnemyGroup').hide();
      break;
    case 'findRNG':
      $('.rng').hide();
      $('.iterations').hide();
      $('.partyLvl').hide();
      $('.area').show();
      $('#addAreaButton').hide();
      $('.enemyGroup').show();
      $('#addEnemyGroup').show();
      break;
    default:
      console.error('Default switch should never be hit.');
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
  var select = document.getElementById('area');
  var data = area !== undefined ? area.data : select.options[select.selectedIndex].data;
  selectedAreas.push(data);
}

function addEnemyGroup(group) {
  var areasSelect = document.getElementById('areas');
  var area = areasSelect.options[areasSelect.selectedIndex].value;
  var enemyGroup = document.getElementById('enemyGroup').selectedIndex;
  fightList.push(enemyGroup);
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
}

