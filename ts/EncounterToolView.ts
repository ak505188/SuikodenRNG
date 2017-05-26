import * as $ from 'jquery';
import DynamicTable from './DynamicTable';
import EncounterToolController from './EncounterToolController';

export default class EncounterToolView {
  public controller: EncounterToolController;
  public table: DynamicTable;
  public container: JQuery;
  public tableContainer: JQuery;
  public controlContainer: JQuery;

  constructor(controller: EncounterToolController, containerID: string) {
    this.controller = controller;
    this.tableContainer = $('<div/>', { id: 'table' });
    this.controlContainer = $('<div/>');
    this.container = $(`#${containerID}`);
    this.container.append(this.tableContainer);
    this.container.append(this.controlContainer);
    this.table = new DynamicTable(this.tableContainer.attr('id'));
  }

  public init(fights: (string | number)[][], areas: string[], enemyGroups: string[], selRow: number = 0) {
    this.generateTable(fights);
    this.selectRow(selRow);
    this.controlContainer.empty();
    this.generateAreaSelect(areas);
    this.generateNavigationButtons();
    this.generateFightSelect(enemyGroups);
  }

  public generateTable(fights: (string | number)[][]) {
    this.table.generateTable(fights);
  }

  public selectRow(row: number) {
    this.table.selectRow(row);
  }

  public generateFightSelect(enemyGroups) {
    const div = $('<div/>');
    $.each(enemyGroups, (i, name) => {
      const button = $(`<button>${name}</button>`);
      button.addClass('btn').addClass('btn-success').addClass('btn-sm')
        .click(() => {
          this.jumpToFight(name);
        });
      div.append(button);
    });
    this.controlContainer.append(div);
  }

  public generateNavigationButtons() {
    const div = $('<div/>');
    const jumps = [ 100, 500, 1000 ];
    $.each(jumps, (i, jump) => {
      const button = $(`<button>RNG + ${jump}</button>`);
      button.addClass('btn').addClass('btn-success').addClass('btn-sm')
        .click(() => {
          this.controller.incrementRNG(jump);
        });
      div.append(button);
    });

    const undo = $('<button>Undo</button>').click(() => {
      this.controller.undo();
    });
    undo.addClass('btn').addClass('btn-success').addClass('btn-sm');
    div.append(undo);

    const next = $('<button>Next</button>').click(() => {
      this.controller.incrementFight();
    });
    next.addClass('btn').addClass('btn-success').addClass('btn-md');
    div.append(next);

    this.controlContainer.append(div);
  }

  public generateAreaSelect(areas: string[]) {
    const div = $('<div/>');
    $.each(areas, (k, name) => {
      const button = $(`<button>${name}</button>`);
      button.addClass('btn').addClass('btn-success').addClass('btn-sm')
        .click(() => {
          this.controller.switchArea(name);
        });
      div.append(button);
    });
    this.controlContainer.append(div);
  }

  public jumpToFight(name: string) {
    this.controller.findFight(name);
  }

  public switchArea(area: string) {
    this.controller.switchArea(area);
  }
}
