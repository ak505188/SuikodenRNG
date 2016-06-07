var window;
var enemies = (typeof window === 'undefined' ? require('./enemies.js') : enemies);

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
          'enemies': encounter,
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

var EnemyGroup = function(name, enemies) {
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
      var drop = this.calculateDrop(rng);
      drops.push({ 'rng': rng.toString(16), 'drop': drop });
      rng = calculateRNG(rng);
    }
    return drops;
  };

  function calcChampionVal(enemies) {
    var level = 0;
    for (var i in enemies) {
      level += enemies[i].stats.lvl;
    }
    level = (level << 4) - level;
    return div32ulo(level, 0xa);
  }
};

var Area = function(name, area) {
  this.name = name;
  this.encounterTable = parseEncounterTable(area);
  this.encounterRate = area.encounterRate;
  this.isBattle = area.type === 'Dungeon' ? isBattleDungeon : isBattleWorldMap;

  this.getEncounter = function(rng) {
    rng = calculateRNG(rng);
    var r2 = calcR2FromRng(rng);
    r3 = div32ulo(0x7FFF, this.encounterTable.length);
    var encounterIndex = div32ulo(r2, r3);
    while (encounterIndex >= Object.keys(area.encounters).length) {
      console.error('Encounter out of bounds. Index =', encounterIndex, 'Length =', Object.keys(area.encounters).length, 'RNG =', rng.toString(16));
      encounterIndex--;
    }
    return this.encounterTable[encounterIndex];
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

function initAreas(enemies) {
  var areas = {};
  for (var area in enemies) {
    areas[area] = new Area(area, enemies[area]);
  }
  return areas;
}

areas = initAreas(enemies);

