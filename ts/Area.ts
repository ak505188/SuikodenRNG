import { IEnemy } from './Enemy';
import EnemyGroup from './EnemyGroup';
import Fight from './Fight';
import { div32ulo } from './lib';
import RNG from './rng';

interface IEncounter {
  name: string;
  parseString: string;
}

interface IArea {
  name: string;
  encounterRate: number;
  encounters: IEncounter[];
  enemies: IEnemies;
  areaType: string;
}

interface IEnemies {
  [key: string]: IEnemy;
}

export default class Area {
  public name: string;
  public encounterTable: EnemyGroup[];
  public encounterRate: number;
  public areaType: string;
  public enemies: IEnemies;

  constructor(name: string, area: IArea) {
    this.name           = name;
    this.areaType       = area.areaType;
    this.encounterRate  = area.encounterRate;
    this.enemies        = area.enemies;
    // Encounter table has to be initialized after enemies
    this.encounterTable = this.parseEncounterTable(area.encounters);
  }

  public getEncounter(rng: RNG): Fight {
    const enemyGroup = this.encounterTable[this.getEncounterIndex(rng)];
    return new Fight(enemyGroup, rng, this);
  }

  public isBattle(rng: RNG): boolean {
    return this.areaType === 'Dungeon'
      ? this.isBattleDungeon(rng) : this.isBattleWorldMap(rng);
  }

  public getEnemyGroup(name: string): EnemyGroup {
    for (const enemyGroup of this.encounterTable) {
      if (enemyGroup.name === name) {
        return enemyGroup;
      }
    }
    return null;
  }

  private isBattleWorldMap(rng): boolean {
    let r2 = rng.getRNG2();
    const r3 = r2;
    r2 = r2 >> 8 << 8;
    r2 = r3 - r2;
    return r2 < this.encounterRate;
  }

  private isBattleDungeon(rng: RNG): boolean {
    let r2 = rng.getRNG2();
    const r3 = 0x7F;
    const mflo = div32ulo(r2, r3);
    r2 = mflo;
    r2 = r2 & 0xFF;
    return r2 < this.encounterRate;
  }

  private getEncounterIndex(rng: RNG): number {
    const r2 = rng.getNext().rng2;
    const r3 = div32ulo(0x7FFF, this.encounterTable.length);
    let encounterIndex = div32ulo(r2, r3);
    while (encounterIndex >= this.encounterTable.length) {
      encounterIndex--;
    }
    return encounterIndex;
  }

  private parseEncounterTable(encounters: IEncounter[]): EnemyGroup[] {
    const encounterTable = [];
    for (let i = 0; i < encounters.length; i++) {
      const name = encounters[i].name;
      const enemies = this.parseEncounter(encounters[i].parseString, this.enemies);
      const enemyGroup = new EnemyGroup(name, enemies);
      encounterTable.push(enemyGroup);
    }
    return encounterTable;
  }

  private parseEncounter(parseString: string, enemies: object) {
    const encounter = parseString.split(' ');
    const enemyGroup = [];
    for (let j = 0; j < encounter.length; j = j + 2) {
      const name = encounter[j + 1];
      for (let k = 0; k < parseInt(encounter[j], 10); k++) {
        const enemy = enemies[encounter[j + 1]];
        enemy.name = name;
        enemyGroup.push(enemies[encounter[j + 1]]);
      }
    }
    return enemyGroup;
  }
}
