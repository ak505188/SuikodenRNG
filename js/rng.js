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
    var RNG = /** @class */ (function () {
        function RNG(rng) {
            this.rng = rng;
            this.rng2 = this.calcRNG2(rng);
            this.originalRNG = rng;
            this.count = 0;
        }
        RNG.prototype.clone = function () {
            return new RNG(this.rng);
        };
        RNG.prototype.getRNG = function () {
            return this.rng;
        };
        RNG.prototype.getRNG2 = function () {
            return this.rng2;
        };
        RNG.prototype.getCount = function () {
            return this.count;
        };
        RNG.prototype.reset = function () {
            this.rng = this.originalRNG;
            this.rng2 = this.calcRNG2(this.rng);
            this.count = 0;
        };
        // Returns the next set of RNG values
        // Used when you don't want to advance
        // the RNG but need to see next value
        RNG.prototype.getNext = function (iterations) {
            iterations = iterations ? iterations : 1;
            var rng = this.getRNG();
            var rng2 = this.getRNG2();
            for (var i = 0; i < iterations; i++) {
                rng = lib_1.mult32ulo(rng, 0x41c64e6d) + 0x3039;
                rng2 = rng >> 16 & 0x7FFF;
            }
            return { rng: rng, rng2: rng2 };
        };
        // Advances the RNG internally
        RNG.prototype.next = function () {
            var next = this.getNext();
            this.rng = next.rng;
            this.rng2 = next.rng2;
            this.count++;
            return this;
        };
        RNG.prototype.calcRNG2 = function (rng) {
            return rng >> 16 & 0x7FFF;
        };
        return RNG;
    }());
    exports["default"] = RNG;
});
