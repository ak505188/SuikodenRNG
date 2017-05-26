import * as $ from 'jquery';
import DynamicTable from './DynamicTable';
import EncounterTool from './EncounterTool';

export default class EncounterToolNavigator {
  public encounterTool: EncounterTool;
  public table: DynamicTable;
  public container: JQuery;
  public tableContainer: JQuery;
  public controlContainer: JQuery;

  constructor(encounterTool: EncounterTool, containerID: string) {
    this.encounterTool = encounterTool;
    this.tableContainer = $('<div/>', { id: 'table' });
    this.controlContainer = $('<div/>');
    this.container = $(`#${containerID}`);
    this.container.append(this.tableContainer);
    this.container.append(this.controlContainer);
    this.table = new DynamicTable(this.tableContainer.attr('id'));
    this.initDisplay();
  }

  public initDisplay() {
    const fights = this.encounterTool.fights.map((fight) => {
      return [
        fight.area.name,
        fight.enemyGroup.name,
        fight.index,
        fight.run ? 'Run' : 'Fail',
        fight.wheel
      ];
    });
    this.table.generateTable(fights);
    this.table.selectRow(this.encounterTool.getEncounterIndex());
    this.controlContainer.empty();
    this.generateAreaSelect();
    this.generateNavigationButtons();
    this.generateFightSelect();
  }

  public generateFightSelect() {
    const div = $('<div/>');
    const currentArea = this.encounterTool.areas[this.encounterTool.currentArea];
    const enemyGroupNames = currentArea.encounterTable.map((fight) => {
      return fight.name;
    });
    $.each(enemyGroupNames, (i, name) => {
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
          this.encounterTool.incrementRNG(jump);
          this.table.selectRow(this.encounterTool.getEncounterIndex());
        });
      div.append(button);
    });

    const undo = $('<button>Undo</button>').click(() => {
      this.encounterTool.undo();
      this.table.selectRow(this.encounterTool.getEncounterIndex());
    });
    undo.addClass('btn').addClass('btn-success').addClass('btn-sm');
    div.append(undo);

    const next = $('<button>Next</button>').click(() => {
      this.encounterTool.incrementFight();
      this.table.selectRow(this.encounterTool.getEncounterIndex());
    });
    next.addClass('btn').addClass('btn-success').addClass('btn-md');
    div.append(next);

    this.controlContainer.append(div);
  }

  public generateAreaSelect() {
    const div = $('<div/>');
    $.each(this.encounterTool.areas, (name, v) => {
      const button = $(`<button>${name}</button>`);
      button.addClass('btn').addClass('btn-success').addClass('btn-sm')
        .click(() => {
          this.switchArea(name);
        });
      div.append(button);
    });
    this.controlContainer.append(div);
  }

  public jumpToFight(name: string) {
    const index = this.encounterTool.findFight(name).getEncounterIndex();
    this.table.selectRow(index);
  }

  public switchArea(area: string) {
    this.encounterTool.switchArea(area);
    this.initDisplay();
  }
}
