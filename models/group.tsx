export interface Group {

  id: number;
  name: string;
  points: number;

  correctRatio?: number;
  pointsIncreased?: boolean;
}