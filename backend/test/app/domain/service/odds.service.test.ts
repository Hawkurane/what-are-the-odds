import { mock, MockProxy } from 'jest-mock-extended';
import { Empire } from 'src/app/domain/empire-patrol';
import { MilleniumFalcon } from 'src/app/domain/millenium-falcon';
import { Pathfinder } from 'src/app/domain/port/pathfinder.interface';
import { Routes } from 'src/app/domain/port/routes.interface';
import { OddsDomainService } from 'src/app/domain/service/odds.service';
import { milleniumFalconStub } from 'test/stubs/millenium-falcon.stub';
import { stubAllRoutes } from 'test/stubs/routes.stub';

describe('RouteDomainService', () => {
  let routes: MockProxy<Routes>;
  let service: OddsDomainService;
  let pathfinder: MockProxy<Pathfinder>;

  beforeEach(() => {
    routes = mock<Routes>();
    pathfinder = mock<Pathfinder>();
    service = new OddsDomainService(routes, pathfinder);
  });

  describe('travel', () => {
    it('should compute the travel', async () => {
      // Given
      routes.getAllTravels.mockResolvedValue(stubAllRoutes);
      routes.getTravelTime.calledWith('Tatooine', 'Hoth').mockResolvedValue(6);
      routes.getTravelTime.calledWith('Hoth', 'Endor').mockResolvedValue(1);
      const milleniumFalcon: MilleniumFalcon = new MilleniumFalcon(6, 'Tatooine', 'Endor');

      const result: string[] = await service.getDailyTravelLog(milleniumFalcon, ['Tatooine', 'Hoth', 'Endor']);

      expect(result).toStrictEqual(['Tatooine', 'Hyperspace', 'Hyperspace', 'Hyperspace', 'Hyperspace', 'Hoth', 'Hoth', 'Endor']);
    });
  });

  describe('getAllPlanets', () => {
    it('should get all planets', async () => {
      // Given
      routes.getAllTravels.mockResolvedValue(stubAllRoutes);

      // When Then
      await expect(service.getAllPlanets()).resolves.toStrictEqual(['Tatooine', 'Dagobah', 'Endor', 'Hoth']);
    });
  });

  describe('getOddsForSpecificPath', () => {
    describe('No path given', () => {
      it('should return 0', () => {
        // Given
        const empire: Empire = new Empire(6, [
          { planet: 'Tatooine', day: 4 },
          { planet: 'Dagobah', day: 5 },
        ]);
        const result = service.getOddsForSpecificPath([], empire);

        // When Then
        expect(result).toStrictEqual(0);
      });
    });

    describe('Example 1', () => {
      it('should return 0', () => {
        // Given
        const empire: Empire = new Empire(7, [
          { planet: 'Hoth', day: 6 },
          { planet: 'Hoth', day: 7 },
          { planet: 'Hoth', day: 8 },
        ]);
        const result = service.getOddsForSpecificPath(
          ['Tatooine', 'Hyperspace', 'Hyperspace', 'Hyperspace', 'Hyperspace', 'Hoth', 'Hoth', 'Endor'],
          empire,
        );

        // When Then
        expect(result).toStrictEqual(0);
      });
    });

    describe('Example 2', () => {
      it('should return 81', () => {
        // Given
        const empire: Empire = new Empire(8, [
          { planet: 'Hoth', day: 6 },
          { planet: 'Hoth', day: 7 },
          { planet: 'Hoth', day: 8 },
        ]);
        const result = service.getOddsForSpecificPath(
          ['Tatooine', 'Hyperspace', 'Hyperspace', 'Hyperspace', 'Hyperspace', 'Hoth', 'Hoth', 'Endor'],
          empire,
        );

        // When Then
        expect(result).toStrictEqual(81);
      });
    });

    describe('Example 3', () => {
      it('should return 90', () => {
        // Given
        const empire: Empire = new Empire(9, [
          { planet: 'Hoth', day: 6 },
          { planet: 'Hoth', day: 7 },
          { planet: 'Hoth', day: 8 },
        ]);
        const result = service.getOddsForSpecificPath(
          ['Tatooine', 'Hyperspace', 'Hyperspace', 'Hyperspace', 'Hyperspace', 'Dagobah', 'Dagobah', 'Hoth', 'Endor'],
          empire,
        );

        // When Then
        expect(result).toStrictEqual(90);
      });
    });

    describe('Example 4', () => {
      describe('First scenario', () => {
        it('should return 100', () => {
          // Given
          const empire: Empire = new Empire(10, [
            { planet: 'Hoth', day: 6 },
            { planet: 'Hoth', day: 7 },
            { planet: 'Hoth', day: 8 },
          ]);
          const result = service.getOddsForSpecificPath(
            ['Tatooine', 'Hyperspace', 'Hyperspace', 'Hyperspace', 'Hyperspace', 'Dagobah', 'Dagobah', 'Dagobah', 'Hoth', 'Endor'],
            empire,
          );

          // When Then
          expect(result).toStrictEqual(100);
        });
      });

      describe('Second scenario', () => {
        it('should return 100', () => {
          // Given
          const empire: Empire = new Empire(10, [
            { planet: 'Hoth', day: 6 },
            { planet: 'Hoth', day: 7 },
            { planet: 'Hoth', day: 8 },
          ]);
          const result = service.getOddsForSpecificPath(
            ['Tatooine', 'Tatooine', 'Hyperspace', 'Hyperspace', 'Hyperspace', 'Hyperspace', 'Dagobah', 'Dagobah', 'Hoth', 'Endor'],
            empire,
          );

          // When Then
          expect(result).toStrictEqual(100);
        });
      });
    });
  });

  describe('getOddsForEmpirePatrol', () => {
    beforeEach(() => {
      routes.getAllTravels.mockResolvedValue(stubAllRoutes);
      routes.getTravelTime.calledWith('Tatooine', 'Dagobah').mockResolvedValue(6);
      routes.getTravelTime.calledWith('Dagobah', 'Endor').mockResolvedValue(4);
      routes.getTravelTime.calledWith('Dagobah', 'Hoth').mockResolvedValue(1);
      routes.getTravelTime.calledWith('Hoth', 'Endor').mockResolvedValue(1);
      routes.getTravelTime.calledWith('Tatooine', 'Hoth').mockResolvedValue(6);

      pathfinder.getAllPaths.mockReturnValue([
        ['Tatooine', 'Dagobah', 'Endor'],
        ['Tatooine', 'Dagobah', 'Hoth', 'Endor'],
        ['Tatooine', 'Hoth', 'Endor'],
      ]);
    });

    describe('Example 1', () => {
      it('should return 0', async () => {
        // Given
        const empire: Empire = new Empire(7, [
          { planet: 'Hoth', day: 6 },
          { planet: 'Hoth', day: 7 },
          { planet: 'Hoth', day: 8 },
        ]);

        // When
        const result = await service.getOddsForEmpirePatrol(milleniumFalconStub, empire);

        // Then
        expect(result).toStrictEqual(0);
      });
    });

    describe('Example 2', () => {
      it('should return 81', async () => {
        // Given
        const empire: Empire = new Empire(8, [
          { planet: 'Hoth', day: 6 },
          { planet: 'Hoth', day: 7 },
          { planet: 'Hoth', day: 8 },
        ]);

        // When
        const result = await service.getOddsForEmpirePatrol(milleniumFalconStub, empire);

        // Then
        expect(result).toStrictEqual(81);
      });
    });

    describe('Example 3', () => {
      it('should return 90', async () => {
        // Given
        const empire: Empire = new Empire(9, [
          { planet: 'Hoth', day: 6 },
          { planet: 'Hoth', day: 7 },
          { planet: 'Hoth', day: 8 },
        ]);

        // When
        const result = await service.getOddsForEmpirePatrol(milleniumFalconStub, empire);

        // Then
        expect(result).toStrictEqual(90);
      });
    });

    describe('Example 4', () => {
      it('should return 100', async () => {
        // Given
        const empire: Empire = new Empire(10, [
          { planet: 'Hoth', day: 6 },
          { planet: 'Hoth', day: 7 },
          { planet: 'Hoth', day: 8 },
        ]);

        // When
        const result = await service.getOddsForEmpirePatrol(milleniumFalconStub, empire);

        // Then
        expect(result).toStrictEqual(100);
      });
    });
  });
});
