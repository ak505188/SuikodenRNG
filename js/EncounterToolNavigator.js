define(["require", "exports", "jquery", "./DynamicTable"], function (require, exports, $, DynamicTable_1) {
    "use strict";
    exports.__esModule = true;
    var EncounterToolNavigator = (function () {
        function EncounterToolNavigator(encounterTool, containerID) {
            this.encounterTool = encounterTool;
            this.tableContainer = $('<div/>', { id: 'table' });
            this.controlContainer = $('<div/>');
            this.container = $("#" + containerID);
            this.container.append(this.tableContainer);
            this.container.append(this.controlContainer);
            this.table = new DynamicTable_1["default"](this.tableContainer.attr('id'));
            this.initDisplay();
        }
        EncounterToolNavigator.prototype.initDisplay = function () {
            var fights = this.encounterTool.fights.map(function (fight) {
                return [
                    fight.area.name,
                    fight.enemyGroup.name,
                    fight.index,
                    fight.run ? 'Run' : 'Fail',
                    fight.wheel
                ];
            });
            this.table.generateTable(fights);
            this.table.selectRow(this.encounterTool.getEncounterIndex());
            this.controlContainer.empty();
            this.generateAreaSelect();
            this.generateNavigationButtons();
            this.generateFightSelect();
        };
        EncounterToolNavigator.prototype.generateFightSelect = function () {
            var _this = this;
            var div = $('<div/>');
            var currentArea = this.encounterTool.areas[this.encounterTool.currentArea];
            var enemyGroupNames = currentArea.encounterTable.map(function (fight) {
                return fight.name;
            });
            $.each(enemyGroupNames, function (i, name) {
                var button = $("<button>" + name + "</button>");
                button.addClass('btn').addClass('btn-success').addClass('btn-sm')
                    .click(function () {
                    _this.jumpToFight(name);
                });
                div.append(button);
            });
            this.controlContainer.append(div);
        };
        EncounterToolNavigator.prototype.generateNavigationButtons = function () {
            var _this = this;
            var div = $('<div/>');
            var jumps = [100, 500, 1000];
            $.each(jumps, function (i, jump) {
                var button = $("<button>RNG + " + jump + "</button>");
                button.addClass('btn').addClass('btn-success').addClass('btn-sm')
                    .click(function () {
                    _this.encounterTool.incrementRNG(jump);
                    _this.table.selectRow(_this.encounterTool.getEncounterIndex());
                });
                div.append(button);
            });
            var undo = $('<button>Undo</button>').click(function () {
                _this.encounterTool.undo();
                _this.table.selectRow(_this.encounterTool.getEncounterIndex());
            });
            undo.addClass('btn').addClass('btn-success').addClass('btn-sm');
            div.append(undo);
            var next = $('<button>Next</button>').click(function () {
                _this.encounterTool.incrementFight();
                _this.table.selectRow(_this.encounterTool.getEncounterIndex());
            });
            next.addClass('btn').addClass('btn-success').addClass('btn-md');
            div.append(next);
            this.controlContainer.append(div);
        };
        EncounterToolNavigator.prototype.generateAreaSelect = function () {
            var _this = this;
            var div = $('<div/>');
            $.each(this.encounterTool.areas, function (name, v) {
                var button = $("<button>" + name + "</button>");
                button.addClass('btn').addClass('btn-success').addClass('btn-sm')
                    .click(function () {
                    _this.switchArea(name);
                });
                div.append(button);
            });
            this.controlContainer.append(div);
        };
        EncounterToolNavigator.prototype.jumpToFight = function (name) {
            var index = this.encounterTool.findFight(name).getEncounterIndex();
            this.table.selectRow(index);
        };
        EncounterToolNavigator.prototype.switchArea = function (area) {
            this.encounterTool.switchArea(area);
            this.initDisplay();
        };
        return EncounterToolNavigator;
    }());
    exports["default"] = EncounterToolNavigator;
});
