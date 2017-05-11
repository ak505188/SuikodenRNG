export interface IEnemy {
  bits: string;
  drops: IDrop[];
  stats: IStats;
}

export interface IDrop {
  item: string;
  rate: number;
}

export interface IStats {
    DEF: number;
    HP: number;
    LUK: number;
    MGC: number;
    PWR: number;
    SKL: number;
    SPD: number;
    lvl: number;
}
