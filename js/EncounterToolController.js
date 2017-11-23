(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var EncounterToolController = /** @class */ (function () {
        function EncounterToolController(encounterTool) {
            this.encounterTool = encounterTool;
        }
        EncounterToolController.prototype.getFights = function () {
            return this.encounterTool.fights.map(function (fight) {
                return [
                    fight.area.name,
                    fight.enemyGroup.name,
                    fight.index,
                    fight.run ? 'Run' : 'Fail',
                    "0x" + fight.startRNG.toString(16),
                    "0x" + fight.battleRNG.toString(16),
                    fight.wheel
                ];
            });
        };
        EncounterToolController.prototype.getAreas = function () {
            var _this = this;
            return Object.keys(this.encounterTool.areas).map(function (key) {
                return _this.encounterTool.areas[key].name;
            });
        };
        EncounterToolController.prototype.incrementRNG = function (jump) {
            this.encounterTool.incrementRNG(jump);
        };
        EncounterToolController.prototype.findFight = function (name) {
            this.encounterTool.findFight(name);
        };
        EncounterToolController.prototype.undo = function () {
            this.encounterTool.undo();
        };
        EncounterToolController.prototype.incrementFight = function (num) {
            if (num === void 0) { num = 1; }
            this.encounterTool.incrementFight(num);
        };
        EncounterToolController.prototype.selectFight = function (num) {
            this.encounterTool.selectFight(num);
        };
        EncounterToolController.prototype.getEnemyGroups = function () {
            var currentArea = this.encounterTool.areas[this.encounterTool.currentArea];
            var enemyGroups = currentArea.encounterTable.map(function (enemyGroup) {
                return enemyGroup.name;
            });
            return enemyGroups;
        };
        EncounterToolController.prototype.getEncounterIndex = function () {
            return this.encounterTool.getEncounterIndex();
        };
        EncounterToolController.prototype.switchArea = function (area) {
            this.encounterTool.switchArea(area);
        };
        return EncounterToolController;
    }());
    exports["default"] = EncounterToolController;
});
