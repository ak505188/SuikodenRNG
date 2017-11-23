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
    var IDs;
    (function (IDs) {
        IDs["Form"] = "form-data";
        IDs["Table"] = "table";
        IDs["TableContainer"] = "table-container";
        IDs["RNG"] = "rng";
        IDs["Iterations"] = "iterations";
        IDs["PartyLevel"] = "partylvl";
        IDs["AreaSelect"] = "area-select";
        IDs["EnemySelect"] = "enemy-select";
        IDs["Download"] = "download";
        IDs["Reset"] = "reset";
        IDs["Modify"] = "modify";
        IDs["Run"] = "run";
    })(IDs = exports.IDs || (exports.IDs = {}));
});
