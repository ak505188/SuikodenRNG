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
    function findRNG(area, encounters, rng, progress) {
        var startTime = new Date().getTime();
        if (encounters.length <= 1) {
            return false;
        }
        // Smaller array size is slower but more space efficient. Performance drop should be negligable.
        var arraySize = 0xffff;
        var fights = new Array(arraySize);
        var fightsRNG = new Array(arraySize);
        for (var i = 0, index = 0; i < 0xffffffff; i++) {
            if (area.isBattle(rng)) {
                fights[index] = area.getEncounterIndex(rng);
                fightsRNG[index] = rng.getRNG();
                index++;
                if (index === arraySize - 1) {
                    var result = bayerMoore(fights, encounters, area.encounterTable.length);
                    if (result !== false) {
                        console.log('Runtime: ' + (new Date().getTime() - startTime) / 1000 + ' seconds.');
                        return fightsRNG[result].toString(16);
                    }
                    // Takes end of fights and puts it in the beginning for next iteration
                    // Number of fight taken is length of pattern.
                    for (var j = arraySize - encounters.length, k = 0; j < encounters.length; j++, k++) {
                        fights[k] = fights[j];
                        fightsRNG[k] = fights[j];
                    }
                    index = encounters.length;
                }
            }
            rng.next();
            if (i % 42949672 === 0) {
                console.log(Math.floor(i / 42949662) + '%');
            }
        }
        return false;
    }
    exports.findRNG = findRNG;
    function bayerMoore(input, pattern, max) {
        // Create bad char array
        var badChar = new Array(max).fill(-1);
        for (var j = 0; j < pattern.length - 1; j++) {
            badChar[pattern[j]] = j;
        }
        // var pttrnIndx = pattern.length - 1;
        var i = pattern.length - 1;
        while (i < input.length) {
            // check if match
            var inputIndx = i;
            var pttrnIndx = pattern.length - 1;
            while (input[inputIndx] === pattern[pttrnIndx]) {
                inputIndx--;
                pttrnIndx--;
                if (pttrnIndx === -1) {
                    return i - pattern.length + 1;
                }
            }
            var badCharVal = badChar[input[inputIndx]];
            // console.log('badCharVal:', badCharVal);
            var jump = badCharVal === -1 ? pattern.length - 1 : pattern.length - badCharVal - 1;
            i += jump;
        }
        return false;
    }
});
