import * as $ from 'jquery';
import Fight from './Fight';

export default class DynamicTable {
  public id: string;
  public sel: number = 0;

  constructor(id: string) {
    this.id = `#${id}`;
  }

  public generateTable(data: (string | number)[][], headers?: string[]) {
    const table = $(this.id).empty();
    for (const r of data) {
      const row = $('<tr/>');
      for (const c of r) {
        row.append($(`<td>${c}</td>`));
      }
      table.append(row);
    }
  }

  public selectRow(row: number) {
    $(`${this.id} tr`).eq(this.sel).removeClass('selected');
    $(`${this.id} tr`).eq(row).addClass('selected');
    this.sel = row;
    this.scroll();
  }

  public scroll() {
    const row = $(`${this.id} tr`).eq(this.sel);
    const container = $('#table-container');
    container.scrollTop(row.offset().top - container.offset().top + container.scrollTop());
  }
}
