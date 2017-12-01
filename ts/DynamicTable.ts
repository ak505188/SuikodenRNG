import * as $ from 'jquery';
import Fight from './Fight';

export default class DynamicTable {
  public sel: number = 0;
  public container: JQuery;
  public table: JQuery;
  public body: JQuery;

  constructor(containerID: string) {
    this.container = $(`#${containerID}`);
    this.table     = $('<table/>');
    this.body      = $('<tbody/>');
    this.container.append(this.table);
  }

  public generateTable(data: (string | number)[][], headers?: string[], onRowClick?: (number) => void) {
    this.table.empty();
    this.body.empty();
    if (headers) {
      const row = $('<tr/>');
      for (const h of headers) {
        row.append($(`<th>${h}</th>`));
      }
      this.table.append(row);
    }
    for (const r of data) {
      const row = $('<tr/>');
      for (const c of r) {
        row.append($(`<td>${c}</td>`));
      }
      this.body.append(row);
    }
    this.table.append(this.body);
    this.container.append(this.table);
    // This passes the clicked row's index to onRowClick
    if (onRowClick) {
      this.container.on('click', 'tr', (e) => {
        onRowClick($(e.currentTarget).index());
      });
    }
  }

  public selectRow(row: number) {
    $(this.body).find('tr').eq(this.sel).removeClass('selected');
    $(this.body).find('tr').eq(row).addClass('selected');
    this.sel = row;
    this.scroll();
  }

  // Column methods index starting from one
  public hideColumn(column: number) {
    $(`th:nth-child(${column}`).hide();
    $(`td:nth-child(${column}`).hide();
  }

  public showColumn(column: number) {
    $(`th:nth-child(${column}`).show();
    $(`td:nth-child(${column}`).show();
  }

  public scroll() {
    const row = $(this.table).find('tr').eq(this.sel);
    this.container.scrollTop(row.offset().top - this.container.offset().top + this.container.scrollTop());
  }
}
