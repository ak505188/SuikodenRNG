(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jquery", "./constants", "./rng", "./rngCalc", "./DynamicTable"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var $ = require("jquery");
    var constants_1 = require("./constants");
    var rng_1 = require("./rng");
    var rngCalc_1 = require("./rngCalc");
    var DynamicTable_1 = require("./DynamicTable");
    var table = null;
    function run() {
        var rng = parseInt($("#" + constants_1.IDs.RNG).val());
        var iterations = $("#" + constants_1.IDs.Iterations).val();
        var sequence = rngCalc_1.generateRNGSequence(new rng_1["default"](rng), iterations);
        var data = sequence.map(function (r, index) {
            return [
                index,
                r.toString(16),
            ];
        });
        var headers = [
            'Index',
            'RNG',
        ];
        table = new DynamicTable_1["default"](constants_1.IDs.TableContainer);
        table.generateTable(data, headers);
        $("#" + constants_1.IDs.Form).hide();
        $('#output-container').show();
        $("#" + constants_1.IDs.TableContainer).show();
    }
    $(document).ready(function () {
        // Bind events to buttons
        $("#" + constants_1.IDs.Run).click(run);
    });
});
