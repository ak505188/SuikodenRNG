(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jquery", "./constants", "./findRNG", "./lib", "./rng"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var $ = require("jquery");
    var constants_1 = require("./constants");
    var findRNG_1 = require("./findRNG");
    var lib_1 = require("./lib");
    var rng_1 = require("./rng");
    var Areas = lib_1.initAreas();
    var table = null;
    var fightList = [];
    function fillAddableEnemiesList() {
        var areaName = $("#" + constants_1.IDs.AreaSelect).val();
        var area = Areas[areaName];
        var ul = $('#addable-enemy-groups').empty();
        var _loop_1 = function (i) {
            var li = $('<li></li>', { "class": 'addable' });
            var button = $('<button></button>', {
                "class": 'option addable',
                text: area.encounterTable[i].name,
                value: i
            });
            $(button).click(function () {
                addEnemyGroup(i);
            });
            $(li).append(button);
            $(ul).append(li);
        };
        for (var i = 0; i < area.encounterTable.length; i++) {
            _loop_1(i);
        }
    }
    function fillSelectedEnemiesList() {
        var areaName = $("#" + constants_1.IDs.AreaSelect).val();
        var area = Areas[areaName];
        var ul = $('#selected-enemy-groups').empty();
        if (fightList.length === 0) {
            ul.append($('<i>Selected fights show here.</i>'));
        }
        var _loop_2 = function (i) {
            var li = $('<li></li>', { "class": 'removable' });
            var button = $('<button></button>', {
                "class": 'option removable',
                text: area.encounterTable[fightList[i]].name
            });
            $(button).click(function () {
                removeEnemy(i);
            });
            $(li).append(button);
            $(ul).append(li);
        };
        for (var i = 0; i < fightList.length; i++) {
            _loop_2(i);
        }
    }
    function addEnemyGroup(index) {
        fightList.push(index);
        fillSelectedEnemiesList();
    }
    function removeEnemy(index) {
        fightList.splice(index, 1);
        fillSelectedEnemiesList();
    }
    function run() {
        var area = $("#" + constants_1.IDs.AreaSelect).val();
        var rng = parseInt($('#startRNG').val());
        var frArea = Areas[area];
        alert(findRNG_1.findRNG(frArea, fightList, new rng_1["default"](0x12)).toString(16));
    }
    $(document).ready(function () {
        lib_1.fillAreaSelect(Areas);
        fillAddableEnemiesList();
        fillSelectedEnemiesList();
        // Bind events to buttons
        $("#" + constants_1.IDs.AreaSelect).change(function () {
            fillAddableEnemiesList();
            fightList = [];
            fillSelectedEnemiesList();
        });
        $("#" + constants_1.IDs.Run).click(run);
    });
});
