var window;
if (typeof window === 'undefined') {
  // no var because I want global namespace
  require('./lib.js');
  var enemies = require('./enemies.js');
  var Area = require('./Area.js');
}

function Encounters(rng, iterations, areas, partyLvl, callback) {
  var encounters = [];
  for (var i = 0; i < iterations; i++) {
    rng = calculateRNG(rng);
    for (var j in areas) {
      var area = areas[j];
      var battle = area.isBattle(rng);
      if (battle) {
        var encounter = area.getEncounter(rng);
        var run = isRun(calculateRNG(rng)) ? 'Run' : 'Fail';
        var fight = {
          'area': area.name,
          'name': encounter.name,
          'run': run,
          'startingRNG': rng,
          'battleRNG': calculateRNG(rng),
          'index': i,
          'enemies': encounter.enemies,
          'champVal': encounter.champVal
        };
        encounters.push(fight);
      }
    }
  }
  callback(encounters, partyLvl);
}

function printSequence(rng, iterations) {
  for (var i = 0; i < iterations; i++) {
    rng = calculateRNG(rng);
    console.log(rng.toString(16));
  }
}

function initAreas(enemies) {
  var areas = {};
  for (var area in enemies) {
    areas[area] = new Area(area, enemies[area]);
  }
  return areas;
}


areas = initAreas(enemies);
