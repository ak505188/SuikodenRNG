import DynamicTable from './DynamicTable';
import EncounterTool from './EncounterTool';
import EncounterToolView from './EncounterToolView';

export default class EncounterToolController {
  public encounterTool: EncounterTool;
  public view: EncounterToolView;

  constructor(encounterTool: EncounterTool, viewID: string) {
    this.encounterTool = encounterTool;
    this.view = new EncounterToolView(this, viewID);
    this.modifyView();
  }

  public modifyView() {
    const fights = this.encounterTool.fights.map((fight) => {
      return [
        fight.area.name,
        fight.enemyGroup.name,
        fight.index,
        fight.run ? 'Run' : 'Fail',
        fight.wheel
      ];
    });
    const areas = Object.keys(this.encounterTool.areas).map((key) => {
      return this.encounterTool.areas[key].name;
    });
    this.view.init(fights, areas, this.getEnemyGroups());
  }

  public incrementRNG(jump: number) {
    this.encounterTool.incrementRNG(jump);
    this.view.selectRow(this.encounterTool.getEncounterIndex());
  }

  public findFight(name: string) {
    const index = this.encounterTool.findFight(name).getEncounterIndex();
    this.view.selectRow(index);
  }

  public undo() {
    this.encounterTool.undo();
    this.view.selectRow(this.encounterTool.getEncounterIndex());
  }

  public incrementFight(num: number = 1) {
    this.encounterTool.incrementFight(num);
    this.view.selectRow(this.encounterTool.getEncounterIndex());
  }

  public getEnemyGroups(): string[] {
    const currentArea = this.encounterTool.areas[this.encounterTool.currentArea];
    const enemyGroups = currentArea.encounterTable.map((enemyGroup) => {
      return enemyGroup.name;
    });
    return enemyGroups;
  }

  public switchArea(area: string) {
    this.encounterTool.switchArea(area);
    this.modifyView();
  }
}
