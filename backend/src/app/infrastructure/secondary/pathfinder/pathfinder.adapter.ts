import { Injectable } from '@nestjs/common';
import { Pathfinder } from 'src/app/domain/port/pathfinder.interface';
import { Travel } from 'src/app/domain/travel';

export interface EdgeMatrix {
  [index: string]: string[];
}

@Injectable()
export class PathfinderAdapter implements Pathfinder {
  end_node: string;
  edgeMatrix: EdgeMatrix;
  nameholder: string[];

  getAllPaths(source: string, destination: string, planets: string[], edges: Travel[]): string[][] {
    return this.allPathsToSourceTarget(source, destination, this.edgeMatrixFromDomain(planets, edges));
  }

  private edgeMatrixFromDomain(planets: string[], travels: Travel[]): EdgeMatrix {
    const edgeMatrix: EdgeMatrix = {} as EdgeMatrix;
    for (const planet of planets) edgeMatrix[planet] = [];
    for (const travel of travels) edgeMatrix[travel.departure].push(travel.destination);
    return edgeMatrix;
  }

  private allPathsToSourceTarget(source: string, destination: string, edgeMatrix: EdgeMatrix): string[][] {
    this.edgeMatrix = edgeMatrix;
    this.end_node = destination;
    const result: string[][] = [];
    this.dfs(source, [source], result);
    return result;
  }

  private dfs(node: string, path: string[], result: string[][]): void {
    if (node === this.end_node) result.push(path);

    for (const neighbour of this.edgeMatrix[node]) {
      this.dfs(neighbour, [...path, neighbour], result);
    }
  }
}
