import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Routes } from 'src/app/domain/port/routes.interface';
import { Travel } from 'src/app/domain/travel';
import { RouteEntity } from 'src/app/infrastructure/secondary/routes/entity/route.entity';
import { RoutesAdapter } from 'src/app/infrastructure/secondary/routes/routes.adapter';
import { MockType } from 'test/mock-type';
import { Repository } from 'typeorm';

describe('RoutesAdapter', () => {
  let routesAdapter: Routes;
  let repository: Repository<RouteEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: Routes,
          useClass: RoutesAdapter,
        },
        {
          provide: getRepositoryToken(RouteEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    routesAdapter = module.get<Routes>(Routes);
    repository = module.get<Repository<RouteEntity>>(
      getRepositoryToken(RouteEntity),
    );
  });

  it('should be defined', () => {
    expect(routesAdapter).toBeDefined();
  });

  describe('getAllRoutes', () => {
    it('should call repository', async () => {
      // Given
      const route: RouteEntity = {
        id: 1,
        origin: 'Tatooine',
        destination: 'Dagobah',
        travel_time: 4,
      };
      jest.spyOn(repository, 'find').mockResolvedValue([route]);

      // When Then
      await expect(routesAdapter.getAllTravels()).resolves.toStrictEqual([
        new Travel('Tatooine', 'Dagobah', 4),
      ]);
    });
  });

  describe('getTravelTime', () => {
    it('should return travel time', async () => {
      // Given
      const route: RouteEntity = {
        id: 1,
        origin: 'Tatooine',
        destination: 'Dagobah',
        travel_time: 4,
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(route);

      // When Then
      const result: number = await routesAdapter.getTravelTime(
        'Tatooine',
        'Dagobah',
      );

      expect(result).toStrictEqual(4);
    });
  });
});

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    find: jest.fn(),
    findOneBy: jest.fn(),
  }),
);
