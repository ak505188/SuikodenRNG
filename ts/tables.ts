interface IHeader {
  key: string;
  name: string;
}

export default class Table {
  public data: object[];
  public headers: IHeader[];

  constructor(headers: IHeader[], data: object[]) {
    this.headers = headers;
    this.data = data;
  }

  public generateHTMLTable(): HTMLTableElement {
    const table = document.createElement('table');

    const header = table.createTHead();
    const headerRow = header.insertRow();
    const headerColumns = [];
    for (let i = 0; i < this.headers.length; i++) {
      headerColumns.push(headerRow.insertCell(i));
      headerColumns[i].innerHTML = this.headers[i].name;
    }

    const body = document.createElement('tbody');
    table.appendChild(body);
    for (let j = 0; j < this.data.length; j++) {
      const row = body.insertRow();
      const columns = [];
      for (let k = 0; k < this.headers.length; k++) {
        columns.push(row.insertCell(k));
        columns[j].innerHTML = this.data[j][this.headers[k].key];
      }
    }
    return table;
  }

  public generateCSV(): string {
    let CSV = '';
    const headers = this.headers.map((header) => {
      return header.name;
    });
    CSV += this.generateCSVRow(headers);

    for (let i = 0; i < this.data.length; i++) {
      const columns = [];
      for (let j = 0; j < this.headers.length; j++) {
        columns.push(this.data[i][this.headers[j].key]);
      }
      CSV += this.generateCSVRow(columns);
    }
    return CSV;
  }

  // Used for node only.
  public printToConsole(): void {
    for (const row of this.data) {
      let line = '| ';
      for (const k of this.headers) {
        line += row[k.key] + ' | ';
      }
      console.log(line);
    }
  }

  private generateCSVRow(arr) {
    let row = '';
    for (let i  = 0; i < arr.length; i++) {
      row += '"' + arr[i] + '"';
      if (i < arr.length - 1) {
        row += ',';
      }
    }
    row += String.fromCharCode(13);
    return row;
  }
}
