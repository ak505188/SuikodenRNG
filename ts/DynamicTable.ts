import * as $ from 'jquery';
import Fight from './Fight';

export default class DynamicTable {
  public sel: number = 0;
  public container: JQuery;
  public table: JQuery = $('<table/>');
  public body: JQuery = $('<tbody/>');
  public headers: string[];

  constructor(containerID: string) {
    this.container = $(`#${containerID}`);
  }

  public generateTable(data: (string | number)[][], headers?: string[], onRowClick?: (number) => void) {
    this.container.empty();
    this.table.empty();
    this.body.empty();
    if (headers) {
      this.headers = headers;
      const thead = $('<thead/>');
      for (const h of headers) {
        thead.append($(`<th>${h}</th>`));
      }
      this.table.append(thead);
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

  // Simple checkbox controls to hide columns
  // If a more complex method is desired it should be created manually
  // and binded to DynamicTable functions
  // Appends to element of ID passed
  public generateTableControls(id: string) {
    $(`#${id}`).empty();
    for (let i = 0; i < this.headers.length; i++) {
      const label = $(`<label>${this.headers[i]}</label>`);
      const checkbox = $('<input/>', { type: 'checkbox' });
      checkbox.prop('checked', true);
      checkbox.change(() => {
        if (checkbox.is(':checked')) {
          this.showColumn(i + 1);
        } else {
          this.hideColumn(i + 1);
        }
      });
      label.append(checkbox);
      $(`#${id}`).append(label);
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
