(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jquery", "./constants", "./lib", "./rng", "./tables"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var $ = require("jquery");
    var constants_1 = require("./constants");
    var lib_1 = require("./lib");
    var rng_1 = require("./rng");
    var tables_1 = require("./tables");
    var Areas = lib_1.initAreas();
    var table = null;
    function fillEnemySelect(area) {
        var enemySelect = $("#" + constants_1.IDs.EnemySelect);
        // const area: string = $('#area').find(':selected').text();
        var encounterTable = area.encounterTable;
        // Clear select element
        enemySelect.find('option').remove().end();
        $.each(encounterTable, function (index, enemyGroup) {
            enemySelect.append($('<option>', {
                text: enemyGroup.name,
                value: enemyGroup.name
            }));
        });
    }
    function run() {
        var rng = parseInt($("#" + constants_1.IDs.RNG).val());
        var iterations = $("#" + constants_1.IDs.Iterations).val();
        var area = $("#" + constants_1.IDs.AreaSelect).val();
        var enemyGroup = $("#" + constants_1.IDs.EnemySelect).val();
        var group = Areas[area].getEnemyGroup(enemyGroup);
        var drops = group.calculateDrops(new rng_1["default"](rng), iterations);
        var data = drops.map(function (drop, index) {
            return {
                drop: drop.drop,
                index: index,
                rng: drop.rng.toString(16)
            };
        });
        var headers = [
            { key: 'index', name: 'Index' },
            { key: 'drop', name: 'Drop' },
            { key: 'rng', name: 'RNG' },
        ];
        table = new tables_1["default"](headers, data);
        $("#" + constants_1.IDs.Table).empty();
        $("#" + constants_1.IDs.Table).append(table.generateHTMLTable());
        $("#" + constants_1.IDs.Form).hide();
        $("#" + constants_1.IDs.TableContainer).show();
    }
    $(document).ready(function () {
        lib_1.fillAreaSelect(Areas);
        fillEnemySelect(Areas['Cave of the Past']);
        $("#" + constants_1.IDs.AreaSelect).change(function () {
            var area = Areas[$("#" + constants_1.IDs.AreaSelect).val()];
            fillEnemySelect(area);
        });
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
