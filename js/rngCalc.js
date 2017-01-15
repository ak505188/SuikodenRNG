function Encounters(rng, iterations, areas, partyLvl, callback) {
  var encounters = [];
  for (var i = 0; i < iterations; i++) {
    for (var j in areas) {
      var area = areas[j];
      var encounterVal = area.isBattle(rng);
      if (encounterVal < area.encounterRate) {
        var encounter = area.getEncounter(rng);
        var fight = new Fight(areas[j], encounter, rng, i, encounterVal);
        encounters.push(fight);
      }
    }
    rng.next();
  }
  callback(encounters, partyLvl);
}

function generateRNGSequence(rng, iterations) {
  var sequence = [];
  for (var i = 0; i < iterations; i++) {
    sequence.push({index: i, rng: rng.getRNG()});
    rng.next();
  }
  return sequence;
}

