(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./EnemyGroup", "./Fight", "./lib"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var EnemyGroup_1 = require("./EnemyGroup");
    var Fight_1 = require("./Fight");
    var lib_1 = require("./lib");
    var Area = /** @class */ (function () {
        function Area(name, area) {
            this.name = name;
            this.areaType = area.areaType;
            this.encounterRate = area.encounterRate;
            this.enemies = area.enemies;
            // Encounter table has to be initialized after enemies
            this.encounterTable = this.parseEncounterTable(area.encounters);
        }
        Area.prototype.getEncounter = function (rng) {
            var enemyGroup = this.encounterTable[this.getEncounterIndex(rng)];
            return new Fight_1["default"](enemyGroup, rng, this);
        };
        Area.prototype.isBattle = function (rng) {
            return this.areaType === 'Dungeon'
                ? this.isBattleDungeon(rng) : this.isBattleWorldMap(rng);
        };
        Area.prototype.getEnemyGroup = function (name) {
            for (var _i = 0, _a = this.encounterTable; _i < _a.length; _i++) {
                var enemyGroup = _a[_i];
                if (enemyGroup.name === name) {
                    return enemyGroup;
                }
            }
            return null;
        };
        Area.prototype.getEncounterIndex = function (rng) {
            var r2 = rng.getNext().rng2;
            var r3 = lib_1.div32ulo(0x7FFF, this.encounterTable.length);
            var encounterIndex = lib_1.div32ulo(r2, r3);
            while (encounterIndex >= this.encounterTable.length) {
                encounterIndex--;
            }
            return encounterIndex;
        };
        Area.prototype.isBattleWorldMap = function (rng) {
            var r2 = rng.getRNG2();
            var r3 = r2;
            r2 = r2 >> 8 << 8;
            r2 = r3 - r2;
            return r2 < this.encounterRate;
        };
        Area.prototype.isBattleDungeon = function (rng) {
            var r2 = rng.getRNG2();
            var r3 = 0x7F;
            var mflo = lib_1.div32ulo(r2, r3);
            r2 = mflo;
            r2 = r2 & 0xFF;
            return r2 < this.encounterRate;
        };
        Area.prototype.parseEncounterTable = function (encounters) {
            var encounterTable = [];
            for (var i = 0; i < encounters.length; i++) {
                var name_1 = encounters[i].name;
                var enemies = this.parseEncounter(encounters[i].parseString, this.enemies);
                var enemyGroup = new EnemyGroup_1["default"](name_1, enemies);
                encounterTable.push(enemyGroup);
            }
            return encounterTable;
        };
        Area.prototype.parseEncounter = function (parseString, enemies) {
            var encounter = parseString.split(' ');
            var enemyGroup = [];
            for (var j = 0; j < encounter.length; j = j + 2) {
                var name_2 = encounter[j + 1];
                for (var k = 0; k < parseInt(encounter[j], 10); k++) {
                    var enemy = enemies[encounter[j + 1]];
                    enemy.name = name_2;
                    enemyGroup.push(enemies[encounter[j + 1]]);
                }
            }
            return enemyGroup;
        };
        return Area;
    }());
    exports["default"] = Area;
});
