var Fight = function(_area, _EnemyGroup, rng, index, encounterVal) {
  this.area = {
    name: _area.name,
    type: _area.type
  };
  this.startingRNG = rng;
  this.battleRNG = calculateRNG(rng);
  this.index = index;
  this.EnemyGroup = _EnemyGroup;
  this.encounterValue = encounterVal;
  this.run = isRun(this.battleRNG);
  this.wheel = wheelSuccess(this.battleRNG);

  function isRun(rng) {
    rng = calculateRNG(rng);
    var r2 = calcR2FromRng(rng);
    var r3 = 100;
    r3 = r2 % r3;
    return r3 > 50 ? true : false;
  }

  function wheelSuccess(rng) {
    var counter = 0;
    var success = function(pos) {
      return pos >= 0x7f && pos <= 0xa0;
    };
    do {
      counter++;
      rng = calculateRNG(rng);
    } while (!success(div32ulo(calcR2FromRng(rng), 0x5a)));
    return --counter
  }
};

