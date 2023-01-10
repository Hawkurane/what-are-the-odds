import { Travel } from '../travel';

export interface Routes {
  getAllTravels(): Promise<Travel[]>;
  getTravelTime(source: string, destination: string): Promise<number>;
}

export const Routes = Symbol('Routes');
