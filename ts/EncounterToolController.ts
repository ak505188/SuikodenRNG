import DynamicTable from './DynamicTable';
import EncounterTool from './EncounterTool';
import EncounterToolView from './EncounterToolView';

export default class EncounterToolController {
  public encounterTool: EncounterTool;

  constructor(encounterTool: EncounterTool) {
    this.encounterTool = encounterTool;
  }

  public getFights(): (string | number)[][] {
    return this.encounterTool.fights.map((fight) => {
      return [
        fight.area.name,
        fight.enemyGroup.name,
        fight.index,
        fight.run ? 'Run' : 'Fail',
        `0x${fight.startRNG.toString(16)}`,
        `0x${fight.battleRNG.toString(16)}`,
        fight.wheel
      ];
    });
  }

  public getAreas(): string[] {
    return Object.keys(this.encounterTool.areas).map((key) => {
      return this.encounterTool.areas[key].name;
    });
  }

  public incrementRNG(jump: number) {
    this.encounterTool.incrementRNG(jump);
  }

  public findFight(name: string) {
    this.encounterTool.findFight(name);
  }

  public undo() {
    this.encounterTool.undo();
  }

  public incrementFight(num: number = 1) {
    this.encounterTool.incrementFight(num);
  }

  public selectFight(num: number) {
    this.encounterTool.selectFight(num);
  }

  public getEnemyGroups(): string[] {
    const currentArea = this.encounterTool.areas[this.encounterTool.currentArea];
    const enemyGroups = currentArea.encounterTable.map((enemyGroup) => {
      return enemyGroup.name;
    });
    return enemyGroups;
  }

  public getEncounterIndex(): number {
    return this.encounterTool.getEncounterIndex();
  }

  public switchArea(area: string) {
    this.encounterTool.switchArea(area);
  }
}
