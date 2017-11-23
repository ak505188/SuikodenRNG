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
    var EncounterTool = /** @class */ (function () {
        // TODO: Table will only display one area at a time.
        // Therefore only need to manipulate one area at a time.
        // This matters for advanceFight
        function EncounterTool(areas, rng, iterations, partyLvl) {
            if (partyLvl === void 0) { partyLvl = 0; }
            this.fightAreaMap = {};
            this.encounterIndex = 0;
            this.encIndxStck = [];
            this.createEncounters(areas, rng, iterations, partyLvl);
            this.currentArea = areas[0].name;
            this.areas = areas.reduce(function (result, area) {
                result[area.name] = area;
                return result;
            }, {});
            this.fights = this.fightAreaMap[this.currentArea];
            this.rngIndex = this.fights[0].index;
        }
        EncounterTool.prototype.incrementRNG = function (jump) {
            this.encIndxStck.push(this.encounterIndex);
            this.rngIndex += jump;
            if (this.encounterIndex + 1 >= this.fights.length) {
                return this;
            }
            while (this.rngIndex > this.fights[this.encounterIndex + 1].index) {
                if (++this.encounterIndex + 1 >= this.fights.length) {
                    return this;
                }
            }
            return this;
        };
        EncounterTool.prototype.decrementRNG = function (jump) {
            this.encIndxStck.push(this.encounterIndex);
            if (this.rngIndex - jump <= 0) {
                this.rngIndex = 0;
                this.encounterIndex = 0;
                return this;
            }
            while (this.getSelectedFight().index > this.rngIndex - jump) {
                this.encounterIndex--;
            }
            this.encounterIndex++;
            this.rngIndex = this.getSelectedFight().index;
            return this;
        };
        EncounterTool.prototype.incrementFight = function (battles) {
            if (battles === void 0) { battles = 1; }
            this.encIndxStck.push(this.encounterIndex);
            if (this.encounterIndex + battles > this.fights.length) {
                this.encounterIndex = this.fights.length - 1;
                return this;
            }
            this.encounterIndex += battles;
            this.rngIndex = this.getSelectedFight().index;
            return this;
        };
        EncounterTool.prototype.decrementFight = function (battles) {
            if (battles === void 0) { battles = 1; }
            this.encIndxStck.push(this.encounterIndex);
            if (this.encounterIndex - battles < 0) {
                this.encounterIndex = 0;
                return this;
            }
            this.encounterIndex -= battles;
            this.rngIndex = this.getSelectedFight().index;
            return this;
        };
        EncounterTool.prototype.selectFight = function (num) {
            this.encIndxStck.push(this.encounterIndex);
            this.encounterIndex = num;
            this.rngIndex = this.getSelectedFight().index;
            return this;
        };
        EncounterTool.prototype.undo = function () {
            if (this.encIndxStck.length > 0) {
                this.encounterIndex = this.encIndxStck.pop();
                this.rngIndex = this.getSelectedFight().index;
            }
            return this;
        };
        EncounterTool.prototype.getEncounterIndex = function () {
            return this.encounterIndex;
        };
        EncounterTool.prototype.getEncounterIndexDiff = function () {
            return this.encounterIndex - this.encIndxStck[this.encIndxStck.length - 1];
        };
        // Rudimentary implementation that just advances forward
        // until it finds an matching fight
        EncounterTool.prototype.findFight = function (enemyGroup) {
            var index = this.encounterIndex + 1;
            while (index < this.fights.length) {
                if (this.fights[index].enemyGroup.name === enemyGroup) {
                    return this.incrementFight(index - this.encounterIndex);
                }
                index++;
            }
            return this;
        };
        EncounterTool.prototype.switchArea = function (area) {
            if (area === this.currentArea || !this.fightAreaMap.hasOwnProperty(area)) {
                return this;
            }
            this.currentArea = area;
            this.fights = this.fightAreaMap[area];
            this.encIndxStck.push(this.encounterIndex);
            if (this.encounterIndex >= this.fights.length) {
                this.encounterIndex = this.fights.length - 1;
            }
            // Decrement fights until rng is lower than current
            while (this.getSelectedFight().index > this.rngIndex) {
                this.encounterIndex--;
            }
            // Then increment fights until rng is 1 higher than current
            while (this.getSelectedFight().index < this.rngIndex) {
                this.encounterIndex++;
            }
            return this;
        };
        EncounterTool.prototype.getSelectedFight = function () {
            return this.fights[this.encounterIndex];
        };
        EncounterTool.prototype.createEncounters = function (areas, rng, iterations, partyLvl) {
            if (partyLvl === void 0) { partyLvl = 0; }
            for (var _i = 0, areas_1 = areas; _i < areas_1.length; _i++) {
                var area = areas_1[_i];
                var encounters = [];
                for (var i = 0; i < iterations; i++) {
                    if (area.isBattle(rng)) {
                        var fight = area.getEncounter(rng);
                        if (!(partyLvl > 0 && partyLvl > fight.enemyGroup.champVal)) {
                            encounters.push(fight);
                        }
                    }
                    rng.next();
                }
                this.fightAreaMap[area.name] = encounters;
                rng.reset();
            }
        };
        return EncounterTool;
    }());
    exports["default"] = EncounterTool;
});
