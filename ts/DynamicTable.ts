import * as $ from 'jquery';
import Fight from './Fight';

export default class DynamicTable {
  public sel: number = 0;
  public container: JQuery;
  public table: JQuery;

  constructor(containerID: string) {
    this.container = $(`#${containerID}`);
    this.table     = $('<table/>');
    this.container.append(this.table);
  }

  public generateTable(data: (string | number)[][], headers?: string[]) {
    this.table.empty();
    for (const r of data) {
      const row = $('<tr/>');
      for (const c of r) {
        row.append($(`<td>${c}</td>`));
      }
      this.table.append(row);
      this.container.append(this.table);
    }
  }

  public selectRow(row: number) {
    $(this.table).find('tr').eq(this.sel).removeClass('selected');
    $(this.table).find('tr').eq(row).addClass('selected');
    this.sel = row;
    this.scroll();
  }

  public scroll() {
    const row = $(this.table).find('tr').eq(this.sel);
    this.container.scrollTop(row.offset().top - this.container.offset().top + this.container.scrollTop());
  }
}
