var Fight = function(_area, _EnemyGroup, rng, index, encounterVal) {
  this.area = {
    name: _area.name,
    type: _area.type
  };
  this.startingRNG = rng.getRNG();
  this.battleRNG = rng.getNext().rng;
  this.index = index;
  this.EnemyGroup = _EnemyGroup;
  this.encounterValue = encounterVal;
  this.run = isRun(rng.getNext().rng2);
  this.wheel = wheelSuccess(rng.clone().next());

  function isRun(r2) {
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
      rng.next();
    } while (!success(div32ulo(rng.getRNG2(), 0x5a)));
    return --counter;
  }
};

