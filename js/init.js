var selectedAreas = [];
var areas = [];
var fightList = [];
var mode = '';

function createAreaSelector(enemies) {
  var select = document.getElementById('area');
  for (var area in areas) {
    var option = document.createElement('option');
    option.innerHTML = area;
    option.value = area;
    option.data = areas[area];
    select.appendChild(option);
  }
}

function createEnemyGroupSelector(enemies) {
  var areasSelect = document.getElementById('area');
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

function fillAddableAreas() {
  var divs = $('.addable').empty();
  var index = 0;
  var count = 0;
  var cap = Math.ceil(Object.keys(areas).length / divs.length);

  for (var area in areas) {
    var div = $('<div></div>');
    var button = $('<button></button>').text('Add');
    var data = areas[area];
    $(div).text(area);
    $(button).click(data, addArea);
    $(div).append(button);
    $(divs[index]).append(div);
    index = ++count > cap * (index + 1) ? index + 1 : index;
    console.log(count, cap, index);
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
  changeMode('encounters');
};
