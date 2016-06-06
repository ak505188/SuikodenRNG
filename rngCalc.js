function mult32ulo(n, m) {
  n >>>= 0;
  m >>>= 0;
  var nlo = n & 0xffff;
  var nhi = n - nlo;
  return (((nhi * m >>> 0) + (nlo * m)) & 0xFFFFFFFF) >>> 0;
}

function div32ulo(n, m) {
  return Math.floor(n/m) >>> 0;
}

function calculateRNG(prev_rng) {
  var r3 = prev_rng;
  var r1 = 0x41c60000;

  r1 = r1 | 0x4e6d;

  var lo = mult32ulo(r1, r3);

  r3 = lo;
  r3 = r3 + 0x3039;
  return r3;
}

function isRun(rng) {
  rng = calculateRNG(rng);
  var r2 = calcR2FromRng(rng);
  var r3 = 100;
  r3 = r2 % r3;
  return r3 > 50 ? true : false;
}

function calcR2FromRng(rng) {
  var r2 = rng >> 16;
  r2 = r2 & 0x7FFF;
  return r2;
}

function Encounters(rng, iterations, areas, partyLvl, callback) {
  var steps = new Array(areas.length).fill(0);
  var encounters = [];
  for (var i = 0; i < iterations; i++) {
    rng = calculateRNG(rng);
    for (var j in areas) {
      var area = areas[j];
      steps[j]++;
      var battle = area[j].isBattle(rng);
      if (battle) {
        var encounter = area.getEncounter(rng);
        var run = isRun(calculateRNG(rng)) ? 'Run' : 'Fail';
        var fight = {
          'area': area.name,
          'name': encounter.name,
          'steps': steps[j],
          'run': run,
          'startingRNG': rng,
          'battleRNG': calculateRNG(rng),
          'index': i,
          'enemies': encounter.enemies,
          'champVal': encounter.champVal
        };
        encounters.push(fight);
        steps[j] = 0;
      }
    }
  }
  callback(encounters, partyLvl);
}

function parseEncounterTable(area) {
  var encounterTable = area.encounters;
  var encounters = [];
  for (var i in encounterTable) {
    var name = encounterTable[i].name;
    var encounter = encounterTable[i].parseString;
    var enemyGroup = parseEncounter(encounter, area.enemies);
    var champVal = calcChampionVal(enemyGroup);
    encounters.push({'name': name, 'enemies': enemyGroup, 'champVal': champVal});
  }
  return encounters;
}

function parseEncounter(encounter, enemies) {
  encounter = encounter.split(' ');
  var enemyGroup = [];
  for (var j = 0; j < encounter.length; j = j + 2) {
    for (var k = 0; k < parseInt(encounter[j]); k++) {
      enemyGroup.push(enemies[encounter[j+1]]);
    }
  }
  return enemyGroup;
}

function printSequence(rng, iterations) {
  for (var i = 0; i < iterations; i++) {
    rng = calculateRNG(rng);
    console.log(rng.toString(16));
  }
}

var enemyGroup = function(name, enemies) {
  this.name = name;
  this.enemies = enemies;
  this.champVal = calcChampionVal(this.enemies);
  this.calculateDrop = function calculateDrop(rng) {
    for (var enemy in this.enemies) {
      rng = calculateRNG(rng);
      var r2 = calcR2FromRng(rng);
      var dropIndex = r2 % 3;
      if (dropIndex < this.enemies[enemy].drops.length) {
        var dropRate = this.enemies[enemy].drops[dropIndex].rate;
        rng = calculateRNG(rng);
        r2 = calcR2FromRng(rng);
        if (r2 % 100 < dropRate) {
          return this.enemies[enemy].drops[dropIndex].item;
        }
      }
    }
    return null;
  };

  this.calculateDrops = function (rng, iterations) {
    var drops = [];
    for (var i = 0; i < iterations; i++) {
      var drop = calculateDrop(rng);
      drops.push({ 'rng': rng.toString(16), 'drop': drop });
      rng = calculateRNG(rng);
    }
    return drops;
  };

  function calcChampionVal() {
    var level = 0;
    for (var i in this.enemies) {
      level += this.enemies[i].stats.lvl;
    }
    level = (level << 4) - level;
    return div32ulo(level, 0xa);
  }
};

var area = function(area) {
  this.encounterTable = parseEncounters(area.encounters);
  this.encounterRate = area.encounterRate;
  this.isBattle = area.type === 'Dungeon' ? isBattleDungeon : isBattleWorldMap;

  this.getEncounter = function(rng) {
    rng = calculateRNG(rng);
    var r2 = calcR2FromRng(rng);
    r3 = div32ulo(0x7FFF, this.encounterTable.length);
    var encounterIndex = div32ulo(r2, r3) + 1;
    while (encounterIndex >= Object.keys(area.encounters).length) {
      console.error('Encounter out of bounds. Index =', encounterIndex, 'Length =', Object.keys(area.encounters).length, 'RNG =', rng.toString(16));
      encounterIndex--;
    }
    return encounterIndex;
  };

  function isBattleWorldMap(rng) {
    var r3 = rng;
    var r2 = calcR2FromRng(rng);
    r3 = r2;
    r2 = r2 >> 8;
    r2 = r2 << 8;
    r2 = r3 - r2;
    return r2 < 0x8 ? true : false;
  }

  function isBattleDungeon(rng, encounterRate) {
    encounterRate = encounterRate || this.encounterRate;
    var r2 = calcR2FromRng(rng);
    var r3 = 0x7F;
    var mflo = div32ulo(r2, r3);
    // There is some code here but it should never be called when determining battle
    r2 = mflo;
    r2 = r2 & 0xFF;
    return r2 < encounterRate ? true : false;
  }
};

