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
    var Fight = /** @class */ (function () {
        function Fight(enemyGroup, rng, area) {
            this.enemyGroup = enemyGroup;
            this.area = { areaType: area.areaType, name: area.name };
            this.startRNG = rng.getRNG();
            this.battleRNG = rng.getNext().rng;
            this.index = rng.getCount();
            this.run = this.isRun(rng.getNext(2).rng2);
            this.wheel = this.wheelSuccess(rng.clone().next());
        }
        Fight.prototype.isRun = function (r2) {
            var r3 = 100;
            r3 = r2 % r3;
            return r3 > 50 ? true : false;
        };
        Fight.prototype.wheelSuccess = function (rng) {
            var counter = 0;
            var success = function (pos) {
                return pos >= 0x7f && pos <= 0xa0;
            };
            do {
                counter++;
                rng.next();
            } while (!success(lib_1.div32ulo(rng.getRNG2(), 0x5a)));
            return --counter;
        };
        return Fight;
    }());
    exports["default"] = Fight;
});
