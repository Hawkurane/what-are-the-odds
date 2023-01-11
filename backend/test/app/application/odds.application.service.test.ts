import { isA, mock, MockProxy } from 'jest-mock-extended';
import { OddsApplicationService } from 'src/app/application/app.service';
import { BountyHunter, Empire } from 'src/app/domain/empire-patrol';
import { MilleniumFalcon } from 'src/app/domain/millenium-falcon';
import { OddsDomainService } from 'src/app/domain/service/odds.service';

describe('OddsApplicationService', () => {
  let oddsDomainService: MockProxy<OddsDomainService>;
  let applicationService: OddsApplicationService;

  beforeEach(() => {
    oddsDomainService = mock<OddsDomainService>();
    applicationService = new OddsApplicationService(oddsDomainService);
  });

  describe('getOdds', () => {
    it('should call for domain service', async () => {
      // Given
      const empire: Empire = new Empire(9, [new BountyHunter('Hoth', 6), new BountyHunter('Hoth', 7), new BountyHunter('Hoth', 8)]);

      oddsDomainService.getOddsForEmpirePatrol.calledWith(isA(MilleniumFalcon), isA(Empire)).mockResolvedValue(42);

      // When
      const result = await applicationService.getOdds(empire);

      // Then
      expect(result).toStrictEqual(42);
    });
  });
});
