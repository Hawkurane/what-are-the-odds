import { Travel } from 'src/app/domain/travel';

export const stubAllRoutes: Travel[] = [
  new Travel('Tatooine', 'Dagobah', 6),
  new Travel('Dagobah', 'Endor', 4),
  new Travel('Dagobah', 'Hoth', 1),
  new Travel('Hoth', 'Endor', 1),
  new Travel('Tatooine', 'Hoth', 6),
];
