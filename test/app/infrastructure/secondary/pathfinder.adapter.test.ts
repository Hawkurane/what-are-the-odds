import { Travel } from 'src/app/domain/travel';
import { PathfinderAdapter } from 'src/app/infrastructure/secondary/pathfinder/pathfinder.adapter';

describe('Pathfinder', () => {
  it('should find all paths to endor', () => {
    const travels: Travel[] = [
      new Travel('Tatooine', 'Dagobah', 6),
      new Travel('Dagobah', 'Endor', 4),
      new Travel('Dagobah', 'Hoth', 1),
      new Travel('Hoth', 'Endor', 1),
      new Travel('Tatooine', 'Hoth', 6),
    ];

    const planets: string[] = ['Tatooine', 'Dagobah', 'Endor', 'Hoth'];

    const pf: PathfinderAdapter = new PathfinderAdapter();

    const result: string[][] = pf.getAllPaths(
      'Tatooine',
      'Endor',
      planets,
      travels,
    );

    expect(result).toStrictEqual([
      ['Tatooine', 'Dagobah', 'Endor'],
      ['Tatooine', 'Dagobah', 'Hoth', 'Endor'],
      ['Tatooine', 'Hoth', 'Endor'],
    ]);
  });
});
