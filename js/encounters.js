(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jquery", "./constants", "./lib", "./rng", "./rngCalc", "./tables"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var $ = require("jquery");
    var constants_1 = require("./constants");
    var lib_1 = require("./lib");
    var rng_1 = require("./rng");
    var rngCalc_1 = require("./rngCalc");
    var tables_1 = require("./tables");
    var Areas = lib_1.initAreas();
    var table = null;
    function run() {
        var rng = parseInt($("#" + constants_1.IDs.RNG).val());
        var iterations = $("#" + constants_1.IDs.Iterations).val();
        var partyLevel = $("#" + constants_1.IDs.PartyLevel).val();
        var selectAreas = $("#" + constants_1.IDs.AreaSelect).val();
        var areas = selectAreas.map(function (i) {
            return Areas[i];
        });
        var encounters = rngCalc_1.Encounters(areas, new rng_1["default"](rng), iterations, partyLevel);
        var data = encounters.map(function (enc) {
            return {
                area: enc.area.name,
                enemyGroup: enc.enemyGroup.name,
                index: enc.index,
                run: enc.run ? 'Run' : 'Fail'
            };
        });
        var headers = [
            { key: 'area', name: 'Area' },
            { key: 'enemyGroup', name: 'Enemy Group' },
            { key: 'index', name: 'Index' },
            { key: 'run', name: 'Run?' },
        ];
        table = new tables_1["default"](headers, data);
        $("#" + constants_1.IDs.Table).empty();
        $("#" + constants_1.IDs.Table).append(table.generateHTMLTable());
        $("#" + constants_1.IDs.Form).hide();
        $("#" + constants_1.IDs.TableContainer).show();
    }
    $(document).ready(function () {
        lib_1.fillAreaSelect(Areas);
        // Bind events to buttons
        $("#" + constants_1.IDs.Run).click(run);
        $("#" + constants_1.IDs.Download).click(function () {
            if (table !== null) {
                lib_1.download(table.generateCSV(), 'table.csv');
            }
            else {
                alert('No table to download!');
            }
        });
    });
});
