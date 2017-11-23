import Area from './Area';

export interface IAreas {
  [key: string]: Area;
}

export interface ICalculatedDrop {
  rng: number;
  drop: string;
}
