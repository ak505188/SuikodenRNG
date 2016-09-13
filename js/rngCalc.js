function Encounters(rng, iterations, areas, partyLvl, callback) {
  var encounters = [];
  for (var i = 0; i < iterations; i++) {
    rng = calculateRNG(rng);
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

function generateRNGSequence(rng, iterations) {
  var sequence = [];
  for (var i = 0; i < iterations; i++) {
    rng = calculateRNG(rng);
    sequence.push({index: i, rng: calculateRNG(rng)});
  }
  return sequence;
}

