var Area = function(name, area) {
  this.name = name;
  this.encounterTable = parseEncounterTable(area);
  this.encounterRate = area.encounterRate;
  this.type = area.type;
  this.isBattle = area.type === 'Dungeon' ? isBattleDungeon : isBattleWorldMap;

  this.getEncounter = function(rng) {
    return this.encounterTable[this.getEncounterIndex(rng)];
  };

  this.findRNG = function(rng, max_iterations, encounters) {
    var steps = 0;
    var current = 0;
    var startRNG = rng;
    for (var i = 0; i < max_iterations; i++) {
      var prevRNG = rng;
      rng = lib.calculateRNG(rng);
      if (this.isBattle(rng) < this.encounterRate) {
        if (this.getEncounterIndex(rng) === encounters[current].encounterIndex && (current === 0 || steps === encounters[current].steps)) {
          if (current === 0) {
            startRNG = rng;
          }
          if (++current >= encounters.length) {
            return startRNG.toString(16);
          }
        } else {
          if (current !== 0) {
            rng = prevRNG;
          }
          current = 0;
        }
        steps = 0;
      }
      steps++;
    }
    return false;
  };

  function isBattleWorldMap(rng) {
    var r3 = rng;
    var r2 = lib.calcR2FromRng(rng);
    r3 = r2;
    r2 = r2 >> 8;
    r2 = r2 << 8;
    r2 = r3 - r2;
    return r2;
  }

  function isBattleDungeon(rng) {
    var r2 = lib.calcR2FromRng(rng);
    var r3 = 0x7F;
    var mflo = lib.div32ulo(r2, r3);
    r2 = mflo;
    r2 = r2 & 0xFF;
    return r2;
  }

  this.getEncounterIndex = function(rng) {
    rng = lib.calculateRNG(rng);
    var r2 = lib.calcR2FromRng(rng);
    r3 = lib.div32ulo(0x7FFF, this.encounterTable.length);
    var encounterIndex = lib.div32ulo(r2, r3);
    while (encounterIndex >= Object.keys(area.encounters).length) {
      console.error('Encounter out of bounds. Index =', encounterIndex, 'Length =', Object.keys(area.encounters).length, 'RNG =', rng.toString(16));
      encounterIndex--;
    }
    return encounterIndex;
  };

  function parseEncounterTable(area) {
    var encounterTable = [];
    for (var i in area.encounters) {
      var name = area.encounters[i].name;
      var enemies = parseEncounter(area.encounters[i].parseString, area.enemies);
      var enemyGroup = new EnemyGroup(name, enemies);
      encounterTable.push(enemyGroup);
    }
    return encounterTable;
  }

  function parseEncounter(encounter, enemies) {
    encounter = encounter.split(' ');
    var enemyGroup = [];
    for (var j = 0; j < encounter.length; j = j + 2) {
      var name = encounter[j+1];
      for (var k = 0; k < parseInt(encounter[j]); k++) {
        var enemy = enemies[encounter[j+1]];
        enemy.name = name;
        enemyGroup.push(enemies[encounter[j+1]]);
      }
    }
    return enemyGroup;
  }
};
