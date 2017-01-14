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
