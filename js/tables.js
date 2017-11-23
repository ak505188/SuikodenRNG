(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Table = /** @class */ (function () {
        function Table(headers, data) {
            this.headers = headers;
            this.data = data;
        }
        Table.prototype.generateHTMLTable = function () {
            var table = document.createElement('table');
            var header = table.createTHead();
            var headerRow = header.insertRow();
            var headerColumns = [];
            for (var i = 0; i < this.headers.length; i++) {
                headerColumns.push(headerRow.insertCell(i));
                headerColumns[i].innerHTML = this.headers[i].name;
            }
            var body = document.createElement('tbody');
            table.appendChild(body);
            for (var j = 0; j < this.data.length; j++) {
                var row = body.insertRow();
                var columns = [];
                for (var k = 0; k < this.headers.length; k++) {
                    columns.push(row.insertCell(k));
                    columns[k].innerHTML = this.data[j][this.headers[k].key];
                }
            }
            return table;
        };
        Table.prototype.generateCSV = function () {
            var CSV = '';
            var headers = this.headers.map(function (header) {
                return header.name;
            });
            CSV += this.generateCSVRow(headers);
            for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                var row = _a[_i];
                var columns = [];
                for (var _b = 0, _c = this.headers; _b < _c.length; _b++) {
                    var h = _c[_b];
                    columns.push(row[h.key]);
                }
                CSV += this.generateCSVRow(columns);
            }
            return CSV;
        };
        // Used for node only.
        Table.prototype.printToConsole = function () {
            for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                var row = _a[_i];
                var line = '| ';
                for (var _b = 0, _c = this.headers; _b < _c.length; _b++) {
                    var k = _c[_b];
                    line += row[k.key] + ' | ';
                }
                // tslint:disable-next-line
                console.log(line);
            }
        };
        Table.prototype.generateCSVRow = function (arr) {
            var row = '';
            for (var i = 0; i < arr.length; i++) {
                row += '"' + arr[i] + '"';
                if (i < arr.length - 1) {
                    row += ',';
                }
            }
            row += String.fromCharCode(13);
            return row;
        };
        return Table;
    }());
    exports["default"] = Table;
});
