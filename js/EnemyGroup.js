(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./lib"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var lib_1 = require("./lib");
    var EnemyGroup = /** @class */ (function () {
        function EnemyGroup(name, enemies) {
            this.name = name;
            this.enemies = enemies;
            this.champVal = this.calcChampionVal(this.enemies);
        }
        EnemyGroup.prototype.calculateDrops = function (rng, iterations) {
            var drops = [];
            for (var i = 0; i < iterations; i++) {
                var drop = this.calculateDrop(rng);
                drops.push({ rng: rng.getRNG(), drop: drop });
                rng.next();
            }
            return drops;
        };
        EnemyGroup.prototype.calculateDrop = function (rng) {
            for (var enemy in this.enemies) {
                var r2 = rng.getNext().rng2;
                var dropIndex = r2 % 3;
                if (dropIndex < this.enemies[enemy].drops.length) {
                    var dropRate = this.enemies[enemy].drops[dropIndex].rate;
                    r2 = rng.getNext(2).rng2;
                    if (r2 % 100 < dropRate) {
                        return this.enemies[enemy].drops[dropIndex].item;
                    }
                }
            }
            return null;
        };
        EnemyGroup.prototype.calcChampionVal = function (enemies) {
            var level = 0;
            for (var i in enemies) {
                level += enemies[i].stats.lvl;
            }
            level = (level << 4) - level;
            return lib_1.div32ulo(level, 0xa);
        };
        return EnemyGroup;
    }());
    exports["default"] = EnemyGroup;
});
