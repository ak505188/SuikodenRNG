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

function calcR2FromRng(rng) {
  var r2 = rng >> 16;
  r2 = r2 & 0x7FFF;
  return r2;
}

function isRun(rng) {
  rng = calculateRNG(rng);
  var r2 = calcR2FromRng(rng);
  var r3 = 100;
  r3 = r2 % r3;
  return r3 > 50 ? true : false;
}

function isBattle(rng, type) {
  switch(type) {
    case "World Map":
      if (isBattleWorldMap(rng)) {
        return true;
      }
      break;
    case "Dungeon":
      if (isBattleDungeon(rng)) {
        return true;
      }
      break;
    default:
      return false;
  }
}

function isBattleWorldMap(rng) {
  var r3 = rng;
  var r2 = calcR2FromRng(rng);
  r3 = r2;
  r2 = r2 >> 8;
  r2 = r2 << 8;
  r2 = r3 - r2;
  return r2 < 0x8 ? true : false;
}

function isBattleDungeon(rng) {
  var r2 = calcR2FromRng(rng);
  var r3 = 0x7F;
  var mflo = div32ulo(r2, r3);
  // There is some code here but it should never be called when determining battle
  r2 = mflo;
  // Instructions here are
  // lui r3, 0x8017
  // lbu r3, 0x159d(r3)
  // In my testing so far, this = 2
  r3 = 2;
  r2 = r2 & 0xFF;
  return r2 < r3 ? true : false;
}

function getEncounter(rng, possibleEncounters) {
  rng = calculateRNG(rng);
  var r2 = calcR2FromRng(rng);
  var r3 = 0x7FFF;
  var r5 = possibleEncounters;
  r3 = div32ulo(r3, r5);
  r2 = div32ulo(r2, r3);
  r19 = r2 + 1;
  return r19;
}

function Encounters(rng, iterations, areas, partyLvl, callback) {
  var steps = new Array(areas.length).fill(0);
  var parsedEncounterTable = new Array(areas.length);
  for (var x in areas)
    parsedEncounterTable[x] = parseEncounterTable(areas[x]);
  var encounters = [];
  for (var i = 0; i < iterations; i++) {
    rng = calculateRNG(rng);
    for (var j in areas) {
      var area = areas[j];
      steps[j]++;
      var battle = isBattle(rng, area.type);
      if (battle) {
        var encounterIndex = getEncounter(rng, Object.keys(area.encounters).length) - 1;
        var encounter = area.encounters[encounterIndex];
        if (encounter >= Object.keys(area.encounters).length) {
          console.error('Encounter out of bounds. Encounter =', encounter, 'Length =', Object.keys(area.encounters).length);
          encounter = encounter % Object.keys(area.encounters).length;
        }
        var run = isRun(calculateRNG(rng)) ? 'Run' : 'Fail';
        var fight = {
          'area': area.name,
          'name': encounter.name,
          'steps': steps[j],
          'run': run,
          'startingRNG': rng,
          'battleRNG': calculateRNG(rng),
          'index': i,
          'enemies': parsedEncounterTable[j][encounterIndex]
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
    var encounter = encounterTable[i].parseString;
    var enemyGroup = parseEncounter(encounter, area.enemies);
    var champVal = calcChampionVal(enemyGroup);
    encounters.push({'enemies': enemyGroup, 'champVal': champVal});
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

function calculateDrops(rng, enemyGroup, iterations) {
  for (var i = 0; i < iterations; i++) {
    var drop = calculateDrop(rng, enemyGroup);
    console.log(rng.toString(16), drop);
    rng = calculateRNG(rng);
  }
}

function calculateDrop(rng, enemyGroup) {
  for (var enemy in enemyGroup) {
    rng = calculateRNG(rng);
    var r2 = calcR2FromRng(rng);
    var dropIndex = r2 % 3;
    if (dropIndex < enemyGroup[enemy].drops.length) {
      var dropRate = enemyGroup[enemy].drops[dropIndex].rate;
      rng = calculateRNG(rng);
      r2 = calcR2FromRng(rng);
      if (r2 % 100 < dropRate) {
        return enemyGroup[enemy].drops[dropIndex].item;
      }
    }
  }
  return null;
}

function calcChampionVal(group) {
  var level = 0;
  for (var i in group) {
    level += group[i].stats.lvl;
  }
  level = (level << 4) - level;
  return div32ulo(level, 0xa);
}

function printSequence(rng, iterations) {
  for (var i = 0; i < iterations; i++) {
    rng = calculateRNG(rng);
    console.log(rng.toString(16));
  }
}
