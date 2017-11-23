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
    function Encounters(areas, rng, iterations, partyLvl) {
        if (partyLvl === void 0) { partyLvl = 0; }
        var encounters = [];
        for (var i = 0; i < iterations; i++) {
            for (var j in areas) {
                var area = areas[j];
                if (area.isBattle(rng)) {
                    var fight = area.getEncounter(rng);
                    if (!(partyLvl > 0 && partyLvl > fight.enemyGroup.champVal)) {
                        encounters.push(fight);
                    }
                }
            }
            rng.next();
        }
        return encounters;
    }
    exports.Encounters = Encounters;
    function generateRNGSequence(rng, iterations) {
        var sequence = [];
        for (var i = 0; i < iterations; i++) {
            sequence.push(rng.getRNG());
            rng.next();
        }
        return sequence;
    }
    exports.generateRNGSequence = generateRNGSequence;
});
