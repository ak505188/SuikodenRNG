(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jquery", "./constants", "./EncounterTool", "./EncounterToolController", "./EncounterToolView", "./lib", "./rng"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var $ = require("jquery");
    var constants_1 = require("./constants");
    var EncounterTool_1 = require("./EncounterTool");
    var EncounterToolController_1 = require("./EncounterToolController");
    var EncounterToolView_1 = require("./EncounterToolView");
    var lib_1 = require("./lib");
    var rng_1 = require("./rng");
    var Areas = lib_1.initAreas();
    var selectedAreas = [];
    function run() {
        var rng = parseInt($("#" + constants_1.IDs.RNG).val());
        var iterations = $("#" + constants_1.IDs.Iterations).val();
        var partylvl = $("#" + constants_1.IDs.PartyLevel).val();
        var selectAreas = $("#" + constants_1.IDs.AreaSelect).val();
        var areas = selectAreas.map(function (i) {
            return Areas[i];
        });
        var encounters = new EncounterTool_1["default"](areas, new rng_1["default"](rng), iterations, partylvl);
        var encToolController = new EncounterToolController_1["default"](encounters);
        var encToolView = new EncounterToolView_1["default"](encToolController, 'table-container');
        $("#" + constants_1.IDs.Form).hide();
        $("#" + constants_1.IDs.TableContainer).show();
    }
    $(document).ready(function () {
        lib_1.fillAreaSelect(Areas);
        $("#" + constants_1.IDs.Run).click(run);
    });
});
