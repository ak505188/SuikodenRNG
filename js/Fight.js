var Fight = function(_area, _EnemyGroup, rng, index, encounterVal) {
  this.area = {
    name: _area.name,
    type: _area.type
  };
  this.run = isRun(rng);
  this.startingRNG = rng;
  this.battleRNG = lib.calculateRNG(rng);
  this.index = index;
  this.EnemyGroup = _EnemyGroup;
  this.encounterValue = encounterVal;

  function isRun(rng) {
    rng = lib.calculateRNG(rng);
    var r2 = lib.calcR2FromRng(rng);
    var r3 = 100;
    r3 = r2 % r3;
    return r3 > 50 ? true : false;
  }
};

