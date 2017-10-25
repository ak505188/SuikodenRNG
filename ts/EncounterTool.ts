import Area from './Area';
import Fight from './Fight';
import RNG from './rng';

interface IFightAreaMap {
  [key: string]: Fight[];
}

interface IAreaMap {
  [key: string]: Area;
}

export default class EncounterTool {
  public fights: Fight[];
  public fightAreaMap: IFightAreaMap = {};
  public rngIndex: number;
  public encounterIndex: number = 0;
  public currentArea: string;
  public areas: IAreaMap;
  private encIndxStck: number[] = [];
  private fightList: Fight[];

  // TODO: Table will only display one area at a time.
  // Therefore only need to manipulate one area at a time.
  // This matters for advanceFight

  constructor(areas: Area[], rng: RNG, iterations: number, partyLvl: number = 0) {
    this.createEncounters(areas, rng, iterations, partyLvl);
    this.currentArea = areas[0].name;
    this.areas = areas.reduce((result, area) => {
      result[area.name] = area;
      return result;
    }, {});
    this.fights = this.fightAreaMap[this.currentArea];
    this.rngIndex = this.fights[0].index;
  }

  public incrementRNG(jump: number) {
    this.encIndxStck.push(this.encounterIndex);

    this.rngIndex += jump;

    if (this.encounterIndex + 1 >= this.fights.length) {
      return this;
    }

    while (this.rngIndex > this.fights[this.encounterIndex + 1].index) {
      if (++this.encounterIndex + 1 >= this.fights.length) {
        return this;
      }
    }
    return this;
  }

  public decrementRNG(jump: number) {
    this.encIndxStck.push(this.encounterIndex);

    if (this.rngIndex - jump <= 0) {
      this.rngIndex = 0;
      this.encounterIndex = 0;
      return this;
    }
    while (this.getSelectedFight().index > this.rngIndex - jump) {
      this.encounterIndex--;
    }
    this.encounterIndex++;
    this.rngIndex = this.getSelectedFight().index;
    return this;
  }

  public incrementFight(battles: number = 1) {
    this.encIndxStck.push(this.encounterIndex);

    if (this.encounterIndex + battles > this.fights.length) {
      this.encounterIndex = this.fights.length - 1;
      return this;
    }
    this.encounterIndex += battles;
    this.rngIndex = this.getSelectedFight().index;
    return this;
  }

  public decrementFight(battles: number = 1) {
    this.encIndxStck.push(this.encounterIndex);

    if (this.encounterIndex - battles < 0) {
      this.encounterIndex = 0;
      return this;
    }
    this.encounterIndex -= battles;
    this.rngIndex = this.getSelectedFight().index;
    return this;
  }

  public selectFight(num: number) {
    this.encIndxStck.push(this.encounterIndex);
    this.encounterIndex = num;
    this.rngIndex = this.getSelectedFight().index;
    return this;
  }

  public undo() {
    if (this.encIndxStck.length > 0) {
      this.encounterIndex = this.encIndxStck.pop();
      this.rngIndex = this.getSelectedFight().index;
    }
    return this;
  }

  public getEncounterIndex(): number {
    return this.encounterIndex;
  }

  public getEncounterIndexDiff(): number {
    return this.encounterIndex - this.encIndxStck[this.encIndxStck.length - 1];
  }

  // Rudimentary implementation that just advances forward
  // until it finds an matching fight
  public findFight(enemyGroup: string) {
    let index = this.encounterIndex + 1;
    while (index < this.fights.length) {
      if (this.fights[index].enemyGroup.name === enemyGroup) {
        return this.incrementFight(index - this.encounterIndex);
      }
      index++;
    }
    return this;
  }

  public switchArea(area: string) {
    if (area === this.currentArea || !this.fightAreaMap.hasOwnProperty(area)) {
      return this;
    }

    this.currentArea = area;
    this.fights = this.fightAreaMap[area];
    this.encIndxStck.push(this.encounterIndex);

    if (this.encounterIndex >= this.fights.length) {
      this.encounterIndex = this.fights.length - 1;
    }

    // Decrement fights until rng is lower than current
    while (this.getSelectedFight().index > this.rngIndex) {
      this.encounterIndex--;
    }

    // Then increment fights until rng is 1 higher than current
    while (this.getSelectedFight().index < this.rngIndex) {
      this.encounterIndex++;
    }
    return this;
  }

  public getSelectedFight(): Fight {
    return this.fights[this.encounterIndex];
  }

  private createEncounters(areas: Area[], rng: RNG, iterations: number, partyLvl: number = 0) {
    for (const area of areas) {
      const encounters = [];
      for (let i = 0; i < iterations; i++) {
        if (area.isBattle(rng)) {
          const fight = area.getEncounter(rng);
          if (!(partyLvl > 0 && partyLvl > fight.enemyGroup.champVal)) {
            encounters.push(fight);
          }
        }
        rng.next();
      }
      this.fightAreaMap[area.name] = encounters;
      rng.reset();
    }
  }
}
