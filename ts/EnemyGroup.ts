import { IDrop, IEnemy, IStats } from './Enemy';
import { div32ulo } from './lib';
import RNG from './rng';

export default class EnemyGroup {

  public name: string;
  public enemies: IEnemy[];
  public champVal: number;

  constructor(name: string, enemies: IEnemy[]) {
    this.name = name;
    this.enemies = enemies;
    this.champVal = this.calcChampionVal(this.enemies);
  }

  public calculateDrops(rng: RNG, iterations: number): object[] {
    const drops = [];
    for (let i = 0; i < iterations; i++) {
      const drop = this.calculateDrop(rng);
      drops.push({ rng: rng.getRNG().toString(16), drop });
      rng.next();
    }
    return drops;
  }

  private calculateDrop(rng: RNG): any {
    for (const enemy in this.enemies) {
      let r2 = rng.getNext().rng2;
      const dropIndex = r2 % 3;
      if (dropIndex < this.enemies[enemy].drops.length) {
        const dropRate = this.enemies[enemy].drops[dropIndex].rate;
        r2 = rng.getNext(2).rng2;
        if (r2 % 100 < dropRate) {
          return this.enemies[enemy].drops[dropIndex].item;
        }
      }
    }
    return null;
  }

  private calcChampionVal(enemies: IEnemy[]): number {
    let level = 0;
    for (const i in enemies) {
      level += enemies[i].stats.lvl;
    }
    level = (level << 4) - level;
    return div32ulo(level, 0xa);
  }
}
