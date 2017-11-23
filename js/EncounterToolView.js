(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jquery", "./DynamicTable"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var $ = require("jquery");
    var DynamicTable_1 = require("./DynamicTable");
    var EncounterToolView = /** @class */ (function () {
        function EncounterToolView(controller, containerID) {
            this.controller = controller;
            this.tableContainer = $('#table-container');
            this.controlContainer = $('#control-container');
            this.container = $("#" + containerID);
            this.table = new DynamicTable_1["default"](this.tableContainer.attr('id'));
            this.init();
        }
        EncounterToolView.prototype.init = function () {
            this.generateTable(this.controller.getFights());
            this.selectRow(this.controller.getEncounterIndex());
            // this.controlContainer.empty();
            this.generateAreaSelect(this.controller.getAreas());
            this.generateNavigationButtons();
            this.generateFightSelect(this.controller.getEnemyGroups());
            this.controlContainer.show();
        };
        EncounterToolView.prototype.generateTable = function (fights) {
            var _this = this;
            var headers = [
                'Area',
                'Enemy Group',
                'RNG Index',
                'Run',
                'Encounter RNG',
                'Battle RNG',
                'Wheel attempts'
            ];
            this.table.generateTable(fights, headers, function (index) {
                _this.selectRow(index);
                _this.controller.selectFight(index);
            });
        };
        EncounterToolView.prototype.selectRow = function (row) {
            this.table.selectRow(row);
        };
        // Column methods index from 1
        EncounterToolView.prototype.hideColumn = function (column) {
            this.table.hideColumn(column);
        };
        EncounterToolView.prototype.showColumn = function (column) {
            this.table.showColumn(column);
        };
        EncounterToolView.prototype.generateFightSelect = function (enemyGroups) {
            var _this = this;
            var div = $('#controls-enemies');
            div.empty();
            $.each(enemyGroups, function (i, name) {
                var button = $("<button>" + name + "</button>");
                button.addClass('control-btn')
                    .click(function () {
                    _this.jumpToFight(name);
                    _this.selectRow(_this.controller.getEncounterIndex());
                });
                div.append(button);
            });
            // this.controlContainer.append(div);
        };
        EncounterToolView.prototype.generateNavigationButtons = function () {
            var _this = this;
            var div = $('#controls-navigation');
            div.empty();
            var jumps = [100, 500, 1000];
            $.each(jumps, function (i, jump) {
                var button = $("<button>+" + jump + "</button>");
                button.addClass('control-btn wide-btn')
                    .addClass('wide-btn')
                    .click(function () {
                    _this.controller.incrementRNG(jump);
                    _this.selectRow(_this.controller.getEncounterIndex());
                });
                div.append(button);
            });
            var undo = $('<button>Undo</button>')
                .addClass('control-btn wide-btn')
                .click(function () {
                _this.controller.undo();
                _this.selectRow(_this.controller.getEncounterIndex());
            });
            div.append(undo);
            var next = $('<button>Next</button>')
                .addClass('control-btn wide-btn')
                .click(function () {
                _this.controller.incrementFight();
                _this.selectRow(_this.controller.getEncounterIndex());
            });
            div.append(next);
            // this.controlContainer.append(div);
        };
        EncounterToolView.prototype.generateAreaSelect = function (areas) {
            var _this = this;
            var div = $('#controls-areas');
            div.empty();
            $.each(areas, function (k, name) {
                var button = $("<button>" + name + "</button>")
                    .addClass('control-btn wide-btn')
                    .click(function () {
                    _this.controller.switchArea(name);
                    _this.init();
                });
                div.append(button);
            });
            // this.controlContainer.append(div);
        };
        EncounterToolView.prototype.jumpToFight = function (name) {
            this.controller.findFight(name);
            this.selectRow(this.controller.getEncounterIndex());
        };
        return EncounterToolView;
    }());
    exports["default"] = EncounterToolView;
});
