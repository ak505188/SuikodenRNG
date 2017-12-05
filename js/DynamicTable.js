(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var $ = require("jquery");
    var DynamicTable = /** @class */ (function () {
        function DynamicTable(containerID) {
            this.sel = 0;
            this.table = $('<table/>');
            this.body = $('<tbody/>');
            this.container = $("#" + containerID);
        }
        DynamicTable.prototype.generateTable = function (data, headers, onRowClick) {
            this.container.empty();
            this.table.empty();
            this.body.empty();
            if (headers) {
                this.headers = headers;
                var thead = $('<thead/>');
                for (var _i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
                    var h = headers_1[_i];
                    thead.append($("<th>" + h + "</th>"));
                }
                this.table.append(thead);
            }
            for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
                var r = data_1[_a];
                var row = $('<tr/>');
                for (var _b = 0, r_1 = r; _b < r_1.length; _b++) {
                    var c = r_1[_b];
                    row.append($("<td>" + c + "</td>"));
                }
                this.body.append(row);
            }
            this.table.append(this.body);
            this.container.append(this.table);
            // This passes the clicked row's index to onRowClick
            if (onRowClick) {
                this.container.on('click', 'tr', function (e) {
                    onRowClick($(e.currentTarget).index());
                });
            }
        };
        // Simple checkbox controls to hide columns
        // If a more complex method is desired it should be created manually
        // and binded to DynamicTable functions
        // Appends to element of ID passed
        DynamicTable.prototype.generateTableControls = function (id) {
            var _this = this;
            $("#" + id).empty();
            var _loop_1 = function (i) {
                var label = $("<label>" + this_1.headers[i] + "</label>");
                var checkbox = $('<input/>', { type: 'checkbox' });
                checkbox.prop('checked', true);
                checkbox.change(function () {
                    if (checkbox.is(':checked')) {
                        _this.showColumn(i + 1);
                    }
                    else {
                        _this.hideColumn(i + 1);
                    }
                });
                label.append(checkbox);
                $("#" + id).append(label);
            };
            var this_1 = this;
            for (var i = 0; i < this.headers.length; i++) {
                _loop_1(i);
            }
        };
        DynamicTable.prototype.selectRow = function (row) {
            $(this.body).find('tr').eq(this.sel).removeClass('selected');
            $(this.body).find('tr').eq(row).addClass('selected');
            this.sel = row;
            this.scroll();
        };
        // Column methods index starting from one
        DynamicTable.prototype.hideColumn = function (column) {
            $("th:nth-child(" + column).hide();
            $("td:nth-child(" + column).hide();
        };
        DynamicTable.prototype.showColumn = function (column) {
            $("th:nth-child(" + column).show();
            $("td:nth-child(" + column).show();
        };
        DynamicTable.prototype.scroll = function () {
            var row = $(this.table).find('tr').eq(this.sel);
            this.container.scrollTop(row.offset().top - this.container.offset().top + this.container.scrollTop());
        };
        return DynamicTable;
    }());
    exports["default"] = DynamicTable;
});
