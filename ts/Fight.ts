import EnemyGroup from './EnemyGroup';
import { div32ulo } from './lib';
import RNG from './rng';

interface IArea {
  name: string;
  areaType: string;
}

export default class Fight {
  public enemyGroup: EnemyGroup;
  public area: IArea;
  public startRNG: number;
  public battleRNG: number;
  public index: number;
  public run: boolean;
  public wheel: number;

  constructor(enemyGroup: EnemyGroup, rng: RNG, area: IArea) {
    this.enemyGroup = enemyGroup;
    this.area       = { areaType: area.areaType, name: area.name };
    this.startRNG   = rng.getRNG();
    this.battleRNG  = rng.getNext().rng;
    this.index      = rng.getCount();
    this.run        = this.isRun(rng.getNext().rng2);
    this.wheel      = this.wheelSuccess(rng.clone().next());
  }

  private isRun(r2) {
    let r3 = 100;
    r3 = r2 % r3;
    return r3 > 50 ? true : false;
  }

  private wheelSuccess(rng) {
    let counter = 0;
    const success = (pos) => {
      return pos >= 0x7f && pos <= 0xa0;
    };
    do {
      counter++;
      rng.next();
    } while (!success(div32ulo(rng.getRNG2(), 0x5a)));
    return --counter;
  }
}
