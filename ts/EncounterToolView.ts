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
    this.init();
  }

  public init() {
    this.generateTable(this.controller.getFights());
    this.selectRow(this.controller.getEncounterIndex());
    this.controlContainer.empty();
    this.generateAreaSelect(this.controller.getAreas());
    this.generateNavigationButtons();
    this.generateFightSelect(this.controller.getEnemyGroups());
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
          this.selectRow(this.controller.getEncounterIndex());
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
          this.selectRow(this.controller.getEncounterIndex());
        });
      div.append(button);
    });

    const undo = $('<button>Undo</button>').click(() => {
      this.controller.undo();
      this.selectRow(this.controller.getEncounterIndex());
    });
    undo.addClass('btn').addClass('btn-success').addClass('btn-sm');
    div.append(undo);

    const next = $('<button>Next</button>').click(() => {
      this.controller.incrementFight();
      this.selectRow(this.controller.getEncounterIndex());
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
          this.init();
        });
      div.append(button);
    });
    this.controlContainer.append(div);
  }

  public jumpToFight(name: string) {
    this.controller.findFight(name);
    this.selectRow(this.controller.getEncounterIndex());
  }
}
