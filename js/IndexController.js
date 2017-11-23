define(["require", "exports", "jquery", "./Area", "./enemies", "./rng", "./rngCalc", "./tables"], function (require, exports, $, Area_1, enemies_1, rng_1, rngCalc_1, tables_1) {
    "use strict";
    exports.__esModule = true;
    var Areas = initAreas(enemies_1.enemies);
    var selectedAreas = [];
    var fightList = [];
    var mode = 'encounters';
    var table = null;
    function initAreas(enemies) {
        var areas = {};
        for (var area in enemies) {
            if (enemies.hasOwnProperty(area)) {
                areas[area] = new Area_1["default"](area, enemies[area]);
            }
        }
        return areas;
    }
    function createAreaSelector() {
        $.each(Areas, function (name, area) {
            $('#area').append($('<option>', { value: name }).text(name));
        });
    }
    function createEnemyGroupSelector() {
        var area = $('#area').find(':selected').text();
        var encounterTable = Areas[area].encounterTable;
        // Clear select element
        $('#enemyGroup').find('option').remove().end();
        $.each(encounterTable, function (index, enemyGroup) {
            $('#enemyGroup').append($('<option>', { value: index }).text(enemyGroup.name));
        });
    }
    function changeMode(m) {
        mode = m;
        selectMode();
    }
    function selectMode() {
        switch (mode) {
            case 'encounters':
                showElements(['.rng', '.iterations', '.partyLvl', '#addable_options', '#currently_selected']);
                hideElements(['.area', '.enemyGroup']);
                fillAddableAreas();
                fillCurrentlySelectedAreas();
                break;
            case 'drops':
                showElements(['.rng', '.iterations', '.area', '.enemyGroup']);
                hideElements(['.partyLvl', '#addable_options', '#currently_selected']);
                break;
            case 'sequence':
                showElements(['.rng', '.iterations']);
                hideElements(['.partyLvl', '.area', '.enemyGroup', '#addable_options', '#currently_selected']);
                break;
            case 'findRNG':
                showElements(['.rng', '.area', '#addable_options', '#currently_selected']);
                hideElements(['.iterations', '.partyLvl', '.enemyGroup']);
                fillAddableEnemies();
                fillCurrentlySelectedEnemies();
                break;
            default:
                console.error('Default switch should never be hit.');
        }
    }
    function showElements(ids) {
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var id = ids_1[_i];
            // for (const id of ids) {
            $(id).show();
        }
    }
    function hideElements(ids) {
        for (var _i = 0, ids_2 = ids; _i < ids_2.length; _i++) {
            var id = ids_2[_i];
            $(id).hide();
        }
    }
    function modify() {
        $('#table-container').hide();
        $('#form-container').show();
        selectMode();
    }
    function reset() {
        selectedAreas = [];
        fightList = [];
        modify();
    }
    function addArea(area) {
        if ($.inArray(area, selectedAreas) === -1) {
            selectedAreas.push(area);
            fillCurrentlySelectedAreas();
        }
    }
    function addEnemyGroup(data) {
        fightList.push(data.data);
        fillCurrentlySelectedEnemies();
    }
    function fillAddableEnemies() {
        var area = Areas[$('#area').val()];
        var divs = $('.addable').empty();
        var count = 0;
        var index = 0;
        for (var i in area.encounterTable) {
            var div = $('<div></div>', {
                "class": 'clearfix',
                text: area.encounterTable[i].name
            });
            var button = $('<button></button>', {
                "class": 'btn btn-primary btn-xs pull-right',
                text: 'Add'
            });
            $(button).click(parseInt(i, 10), addEnemyGroup);
            $(div).append(button);
            $(divs[index]).append(div);
            index = Math.floor(++count / (Object.keys(area.encounterTable).length / divs.length));
        }
    }
    function fillAddableAreas() {
        var divs = $('.addable').empty();
        var index = 0;
        var count = 0;
        var invalid = 0;
        for (var area in Areas) {
            if (Areas[area].areaType === null) {
                invalid++;
            }
        }
        var _loop_1 = function (area) {
            var div = $('<div></div>', { "class": 'clearfix' });
            var button = $('<button></button>', {
                "class": 'btn btn-primary btn-xs pull-right',
                text: 'Add'
            });
            if (Areas[area].areaType !== null) {
                $(div).text(area);
                $(button).click(function () { addArea(area); });
                $(div).append(button);
                $(divs[index]).append(div);
                index = Math.floor(++count / ((Object.keys(Areas).length - invalid) / divs.length));
            }
        };
        for (var area in Areas) {
            _loop_1(area);
        }
    }
    function fillCurrentlySelectedAreas() {
        var currentlySelected = $('#currently_selected').empty();
        for (var _i = 0, selectedAreas_1 = selectedAreas; _i < selectedAreas_1.length; _i++) {
            var area = selectedAreas_1[_i];
            var div = $('<div></div>', {
                'class': 'clearfix'
            });
            var button = $('<button></button>', {
                "class": 'btn btn-danger btn-xs pull-right',
                text: 'Remove'
            });
            $(div).text(Areas[area].name);
            $(button).click(area, removeArea);
            $(div).append(button);
            $(currentlySelected).append(div);
        }
    }
    function fillCurrentlySelectedEnemies() {
        var currentlySelected = $('#currently_selected').empty();
        var area = Areas[$('#area').val()];
        for (var fight in fightList) {
            var div = $('<div></div>', { "class": 'clearfix' });
            var button = $('<button></button>', {
                "class": 'btn btn-danger btn-xs pull-right',
                text: 'Remove'
            });
            $(div).text(fightList[fight].enemyGroup.name);
            $(button).click(fight, removeEnemy);
            $(div).append(button);
            $(currentlySelected).append(div);
        }
    }
    function removeArea(area) {
        var index = $.inArray(area.data, selectedAreas);
        if (index !== -1) {
            selectedAreas.splice(index, 1);
            fillCurrentlySelectedAreas();
        }
    }
    function removeEnemy(data) {
        var index = data.data;
        fightList.splice(index, 1);
        fillCurrentlySelectedEnemies();
    }
    function download(item, filename) {
        // http://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(item));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    function run() {
        var area = $('#area').find(':selected').text();
        var rng = parseInt($('#startRNG').val());
        var iterations = parseInt($('#iterations').val());
        var partyLvl = parseInt($('#partyLvl').val());
        var enemyGroup = $('#enemyGroup').find(':selected').text();
        switch (mode) {
            case 'encounters':
                var areas = selectedAreas.map(function (i) {
                    return Areas[i];
                });
                var encounters = rngCalc_1.Encounters(areas, new rng_1["default"](rng), iterations, partyLvl);
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
                    { key: 'run', name: 'Run?' }
                ];
                table = new tables_1["default"](headers, data);
                $('#table').append(table.generateHTMLTable());
                break;
            case 'drops':
                // dropTableMaker(enemyGroup, new RNG(rng), iterations);
                break;
            case 'sequence':
                var sequence = rngCalc_1.generateRNGSequence(new rng_1["default"](rng), iterations);
                var h = [
                    { key: 'index', name: 'Index' },
                    { key: 'rng', name: 'RNG' }
                ];
                var d = sequence.map(function (r, index) {
                    return { index: index, rng: r.toString(16) };
                });
                table = new tables_1["default"](h, d);
                $('#table').append(table.generateHTMLTable());
                break;
            case 'findRNG':
                alert('RNG found: ' + areas[area].findRNG(fightList));
                break;
        }
        if (mode !== 'findRNG') {
            $('#form-container').hide();
            $('#table-container').show();
        }
    }
    $(document).ready(function () {
        selectMode();
        modify();
        createAreaSelector();
        createEnemyGroupSelector();
        // Bind events to buttons
        $('#modeEncounters').click(function () { changeMode('encounters'); });
        $('#modeDrops').click(function () { changeMode('drops'); });
        $('#modeSequence').click(function () { changeMode('sequence'); });
        $('#modeFindRNG').click(function () { changeMode('findRNG'); });
        $('#area').change(function () {
            createEnemyGroupSelector();
            fillAddableEnemies();
        });
        $('#run').click(run);
        $('#modify').click(modify);
        $('#reset').click(reset);
        $('#download').click(function () {
            if (table !== null) {
                download(table.generateCSV(), 'table.csv');
            }
            else {
                alert('No table to download!');
            }
        });
    });
});
