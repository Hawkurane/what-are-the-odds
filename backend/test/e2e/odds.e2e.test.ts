import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OddsApplicationService } from 'src/app/application/app.service';
import { DomainModule } from 'src/app/domain/domain.module';
import { EmpireDTO } from 'src/app/infrastructure/primary/empire.dto';
import { OddsController } from 'src/app/infrastructure/primary/odds.controller';
import * as request from 'supertest';

describe('OddsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DomainModule],
      controllers: [OddsController],
      providers: [OddsApplicationService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Example 1', () => {
    it('should return 0', async () => {
      const res: request.Response = await request(app.getHttpServer())
        .post('/odds')
        .send({
          countdown: 7,
          bounty_hunters: [
            { planet: 'Hoth', day: 6 },
            { planet: 'Hoth', day: 7 },
            { planet: 'Hoth', day: 8 },
          ],
        } as EmpireDTO);

      expect(res.status).toStrictEqual(226);
      expect(res.text).toStrictEqual('0');
    });
  });

  describe('Example 2', () => {
    it('should return 81', async () => {
      const res: request.Response = await request(app.getHttpServer())
        .post('/odds')
        .send({
          countdown: 8,
          bounty_hunters: [
            { planet: 'Hoth', day: 6 },
            { planet: 'Hoth', day: 7 },
            { planet: 'Hoth', day: 8 },
          ],
        } as EmpireDTO);

      expect(res.status).toStrictEqual(226);
      expect(res.text).toStrictEqual('81');
    });
  });

  describe('Example 3', () => {
    it('should return 90', async () => {
      const res: request.Response = await request(app.getHttpServer())
        .post('/odds')
        .send({
          countdown: 9,
          bounty_hunters: [
            { planet: 'Hoth', day: 6 },
            { planet: 'Hoth', day: 7 },
            { planet: 'Hoth', day: 8 },
          ],
        } as EmpireDTO);

      expect(res.status).toStrictEqual(226);
      expect(res.text).toStrictEqual('90');
    });
  });

  describe('Example 4', () => {
    it('should return 100', async () => {
      const res: request.Response = await request(app.getHttpServer())
        .post('/odds')
        .send({
          countdown: 10,
          bounty_hunters: [
            { planet: 'Hoth', day: 6 },
            { planet: 'Hoth', day: 7 },
            { planet: 'Hoth', day: 8 },
          ],
        } as EmpireDTO);

      expect(res.status).toStrictEqual(226);
      expect(res.text).toStrictEqual('100');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
