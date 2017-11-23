(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Area", "./constants", "./enemies"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Area_1 = require("./Area");
    var constants_1 = require("./constants");
    var enemies_1 = require("./enemies");
    function mult32ulo(n, m) {
        n >>>= 0;
        m >>>= 0;
        var nlo = n & 0xffff;
        var nhi = n - nlo;
        return (((nhi * m >>> 0) + (nlo * m)) & 0xFFFFFFFF) >>> 0;
    }
    exports.mult32ulo = mult32ulo;
    function mult32uhi(n, m) {
        n >>>= 0;
        m >>>= 0;
        return ((n * m) - this.mult32ulo(n, m)) / Math.pow(2, 32);
    }
    exports.mult32uhi = mult32uhi;
    function div32ulo(n, m) {
        return Math.floor(n / m) >>> 0;
    }
    exports.div32ulo = div32ulo;
    function initAreas() {
        var areas = {};
        for (var area in enemies_1.enemies) {
            if (enemies_1.enemies.hasOwnProperty(area)) {
                areas[area] = new Area_1["default"](area, enemies_1.enemies[area]);
            }
        }
        return areas;
    }
    exports.initAreas = initAreas;
    function fillAreaSelect(Areas) {
        var areaSelect = $("#" + constants_1.IDs.AreaSelect);
        for (var area in Areas) {
            if (Areas[area].areaType !== null) {
                areaSelect.append($('<option>', {
                    text: area,
                    value: area
                }));
            }
        }
    }
    exports.fillAreaSelect = fillAreaSelect;
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
    exports.download = download;
});
