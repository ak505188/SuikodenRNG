var Area = function(name, area) {
  this.name = name;
  this.encounterTable = parseEncounterTable(area);
  this.encounterRate = area.encounterRate;
  this.type = area.type;
  this.isBattle = area.type === 'Dungeon' ? isBattleDungeon : isBattleWorldMap;

  this.getEncounter = function(rng) {
    return this.encounterTable[this.getEncounterIndex(rng)];
  };

  this.findRNG = function(encounters, rng) {
    var startTime = new Date().getTime();
    if (encounters.length <= 1) return false;
    // Smaller array size is slower but more space efficient. Performance drop should be negligable.
    var arraySize = 0xffff;
    var fights = new Array(arraySize);
    var fightsRNG = new Array(arraySize);
    rng = rng === undefined ? new RNG(0x12) : rng;
    var index = 0;
    for (var i = 0; i < 0xffffffff; i++) {
      if (this.isBattle(rng) < this.encounterRate) {
        fights[index] = this.getEncounterIndex(rng);
        fightsRNG[index] = rng.getRNG();
        index++;
        if (index === arraySize - 1) {
          var result = bayerMoore(fights, encounters, this.encounterTable.length);
          if (result !== false) {
            console.log('Runtime: ' + (new Date().getTime() - startTime)/1000 + ' seconds.');
            return fightsRNG[result].toString(16);
          }

          // Takes end of fights and puts it in the beginning for next iteration
          // Number of fight taken is length of pattern.
          for (var j = arraySize - encounters.length, k = 0; j < encounters.length; j++, k++) {
            fights[k] = fights[j];
            fightsRNG[k] = fights[j];
          }
          index = encounters.length;
        }
      }
      rng.next();
      if (i % 42949672 === 0) console.log(Math.floor(i/42949662) + '%');
    }
    return false;
  };

  function bayerMoore(input, pattern, max) {
    // Create bad char array
    var badChar = new Array(max).fill(-1);
    for (var j = 0; j < pattern.length - 1; j++) {
      badChar[pattern[j]] = j;
    }

    // var pttrnIndx = pattern.length - 1;
    var i = pattern.length - 1;
    while (i < input.length) {
      // check if match
      var inputIndx = i;
      var pttrnIndx = pattern.length - 1;
      while (input[inputIndx] === pattern[pttrnIndx]) {
        inputIndx--;
        pttrnIndx--;
        if (pttrnIndx === -1) return i - pattern.length + 1;
      }
      var badCharVal = badChar[input[inputIndx]];
      // console.log('badCharVal:', badCharVal);
      var jump = badCharVal === -1 ? pattern.length - 1 : pattern.length - badCharVal - 1;
      i += jump;
    }
    return false;
  }

  function isBattleWorldMap(rng) {
    var r3 = rng.getRNG();
    var r2 = rng.getRNG2();
    r3 = r2;
    r2 = r2 >> 8;
    r2 = r2 << 8;
    r2 = r3 - r2;
    return r2;
  }

  function isBattleDungeon(rng) {
    var r2 = rng.getRNG2();
    var r3 = 0x7F;
    var mflo = div32ulo(r2, r3);
    r2 = mflo;
    r2 = r2 & 0xFF;
    return r2;
  }

  this.getEncounterIndex = function(rng) {
    var r2 = rng.getNext().rng2;
    r3 = div32ulo(0x7FFF, this.encounterTable.length);
    var encounterIndex = div32ulo(r2, r3);
    while (encounterIndex >= Object.keys(area.encounters).length) {
      // console.error('Encounter out of bounds. Index =', encounterIndex, 'Length =', Object.keys(area.encounters).length, 'RNG =', rng.toString(16));
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
