import { Test, TestingModule } from '@nestjs/testing';
import { OddsApplicationService } from 'src/app/application/app.service';
import { DomainModule } from 'src/app/domain/domain.module';
import { OddsCommand } from 'src/app/infrastructure/primary/odds.command';
import { OddsController } from 'src/app/infrastructure/primary/odds.controller';

describe('OddsCommand', () => {
  let oddsCommand: OddsCommand;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DomainModule],
      controllers: [OddsController],
      providers: [OddsApplicationService, OddsCommand],
    }).compile();
    oddsCommand = app.get<OddsCommand>(OddsCommand);
  });

  describe('Missing args', () => {
    describe('0 arg given', () => {
      it('should log error', async () => {
        // Given
        console.error = jest.fn();

        // When
        await oddsCommand.run([]);

        // Then
        expect(console.error).toHaveBeenCalledWith('Expected two parameters but got 0');
      });
    });

    describe('1 arg given', () => {
      it('should log error', async () => {
        // Given
        console.error = jest.fn();

        // When
        await oddsCommand.run(['resources/millenium-falcon.json']);

        // Then
        expect(console.error).toHaveBeenCalledWith('Expected two parameters but got 1');
      });
    });
  });

  describe('Example 1', () => {
    it('should log 0', async () => {
      // Given
      console.log = jest.fn();

      // When
      await oddsCommand.run(['resources/millenium-falcon.json', '../examples/example1/empire.json']);

      // Then
      expect(console.log).toHaveBeenCalledWith(0);
    });
  });

  describe('Example 2', () => {
    it('should log 81', async () => {
      // Given
      console.log = jest.fn();

      // When
      await oddsCommand.run(['resources/millenium-falcon.json', '../examples/example2/empire.json']);

      // Then
      expect(console.log).toHaveBeenCalledWith(81);
    });
  });

  describe('Example 3', () => {
    it('should log 90', async () => {
      // Given
      console.log = jest.fn();

      // When
      await oddsCommand.run(['resources/millenium-falcon.json', '../examples/example3/empire.json']);

      // Then
      expect(console.log).toHaveBeenCalledWith(90);
    });
  });

  describe('Example 4', () => {
    it('should log 100', async () => {
      // Given
      console.log = jest.fn();

      // When
      await oddsCommand.run(['resources/millenium-falcon.json', '../examples/example4/empire.json']);

      // Then
      expect(console.log).toHaveBeenCalledWith(100);
    });
  });
});
