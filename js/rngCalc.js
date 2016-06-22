function Encounters(rng, iterations, areas, partyLvl, callback) {
  var encounters = [];
  for (var i = 0; i < iterations; i++) {
    rng = lib.calculateRNG(rng);
    for (var j in areas) {
      var area = areas[j];
      var encounterVal = area.isBattle(rng);
      if (encounterVal < area.encounterRate) {
        var encounter = area.getEncounter(rng);
        var fight = new Fight(areas[j], encounter, rng, i, encounterVal);
        encounters.push(fight);
      }
    }
  }
  callback(encounters, partyLvl);
}

function printSequence(rng, iterations) {
  for (var i = 0; i < iterations; i++) {
    rng = lib.calculateRNG(rng);
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

