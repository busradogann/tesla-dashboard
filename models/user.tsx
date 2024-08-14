export interface User {

  id: number;
  name: string;
  points: number;

  correctRatio?: number;
  image?: string;
  pointsIncreased?: boolean;
}