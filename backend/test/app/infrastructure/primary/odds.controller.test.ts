import { Test, TestingModule } from '@nestjs/testing';
import { OddsApplicationService } from 'src/app/application/app.service';
import { DomainModule } from 'src/app/domain/domain.module';
import { OddsController } from 'src/app/infrastructure/primary/odds.controller';

describe('AppController', () => {
  let oddsController: OddsController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DomainModule],
      controllers: [OddsController],
      providers: [OddsApplicationService],
    }).compile();
    oddsController = app.get<OddsController>(OddsController);
  });

  describe('Example 1', () => {
    it('should return 0', async () => {
      await expect(
        oddsController.getOdds({
          countdown: 7,
          bounty_hunters: [
            { planet: 'Hoth', day: 6 },
            { planet: 'Hoth', day: 7 },
            { planet: 'Hoth', day: 8 },
          ],
        }),
      ).resolves.toBe(0);
    });
  });

  describe('Example 2', () => {
    it('should return 81', async () => {
      await expect(
        oddsController.getOdds({
          countdown: 8,
          bounty_hunters: [
            { planet: 'Hoth', day: 6 },
            { planet: 'Hoth', day: 7 },
            { planet: 'Hoth', day: 8 },
          ],
        }),
      ).resolves.toBe(81);
    });
  });

  describe('Example 3', () => {
    it('should return 90', async () => {
      await expect(
        oddsController.getOdds({
          countdown: 9,
          bounty_hunters: [
            { planet: 'Hoth', day: 6 },
            { planet: 'Hoth', day: 7 },
            { planet: 'Hoth', day: 8 },
          ],
        }),
      ).resolves.toBe(90);
    });
  });

  describe('Example 4', () => {
    it('should return 100', async () => {
      await expect(
        oddsController.getOdds({
          countdown: 10,
          bounty_hunters: [
            { planet: 'Hoth', day: 6 },
            { planet: 'Hoth', day: 7 },
            { planet: 'Hoth', day: 8 },
          ],
        }),
      ).resolves.toBe(100);
    });
  });
});
