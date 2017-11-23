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
    this.tableContainer = $('#table-container');
    this.controlContainer = $('#control-container');
    this.container = $(`#${containerID}`);
    this.table = new DynamicTable(this.tableContainer.attr('id'));
    this.init();
  }

  public init() {
    this.generateTable(this.controller.getFights());
    this.selectRow(this.controller.getEncounterIndex());
    // this.controlContainer.empty();
    this.generateAreaSelect(this.controller.getAreas());
    this.generateNavigationButtons();
    this.generateFightSelect(this.controller.getEnemyGroups());
    this.controlContainer.show();
  }

  public generateTable(fights: (string | number)[][]) {
    const headers: string[] = [
      'Area',
      'Enemy Group',
      'RNG Index',
      'Run',
      'Encounter RNG',
      'Battle RNG',
      'Wheel attempts'
    ];
    this.table.generateTable(fights, headers, (index: number) => {
      this.selectRow(index);
      this.controller.selectFight(index);
    });
  }

  public selectRow(row: number) {
    this.table.selectRow(row);
  }

  // Column methods index from 1
  public hideColumn(column: number) {
    this.table.hideColumn(column);
  }

  public showColumn(column: number) {
    this.table.showColumn(column);
  }

  public generateFightSelect(enemyGroups) {
    const div = $('#controls-enemies');
    div.empty();
    $.each(enemyGroups, (i, name) => {
      const button = $(`<button>${name}</button>`);
      button.addClass('control-btn')
        .click(() => {
          this.jumpToFight(name);
          this.selectRow(this.controller.getEncounterIndex());
        });
      div.append(button);
    });
    // this.controlContainer.append(div);
  }

  public generateNavigationButtons() {
    const div = $('#controls-navigation');
    div.empty();
    const jumps = [ 100, 500, 1000 ];
    $.each(jumps, (i, jump) => {
      const button = $(`<button>+${jump}</button>`);
      button.addClass('control-btn wide-btn')
        .addClass('wide-btn')
        .click(() => {
          this.controller.incrementRNG(jump);
          this.selectRow(this.controller.getEncounterIndex());
        });
      div.append(button);
    });

    const undo = $('<button>Undo</button>')
      .addClass('control-btn wide-btn')
      .click(() => {
        this.controller.undo();
        this.selectRow(this.controller.getEncounterIndex());
      });
    div.append(undo);

    const next = $('<button>Next</button>')
      .addClass('control-btn wide-btn')
      .click(() => {
        this.controller.incrementFight();
        this.selectRow(this.controller.getEncounterIndex());
      });
    div.append(next);

    // this.controlContainer.append(div);
  }

  public generateAreaSelect(areas: string[]) {
    const div = $('#controls-areas');
    div.empty();
    $.each(areas, (k, name) => {
      const button = $(`<button>${name}</button>`)
        .addClass('control-btn wide-btn')
        .click(() => {
          this.controller.switchArea(name);
          this.init();
        });
      div.append(button);
    });
    // this.controlContainer.append(div);
  }

  public jumpToFight(name: string) {
    this.controller.findFight(name);
    this.selectRow(this.controller.getEncounterIndex());
  }
}
