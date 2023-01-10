import { Travel } from '../travel';

export interface Pathfinder {
  getAllPaths(
    source: string,
    destination: string,
    planets: string[],
    edges: Travel[],
  ): string[][];
}

export const Pathfinder = Symbol('Pathfinder');
