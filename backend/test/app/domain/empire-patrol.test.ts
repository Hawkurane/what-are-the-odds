import { BountyHunter, Empire } from 'src/app/domain/empire-patrol';
import { IntegerTooLowException } from 'src/app/domain/error/integer-too-low.exception';
import { MissingMandatoryValueException } from 'src/app/domain/error/missing-mandatory-value.exception';

describe('Empire Patrol', () => {
  describe('Less than 0 countdown', () => {
    it('should throw IntegerTooLowException', () => {
      expect(() => {
        new Empire(0, []);
      }).toThrow(IntegerTooLowException.builder().setCurrentValue(0).setMinValue(1).setField('countdown').build());
    });
  });

  describe('Valid Empire Patrol', () => {
    it('should not throw anything', () => {
      expect(() => {
        new Empire(9, [new BountyHunter('Hoth', 6), new BountyHunter('Hoth', 7), new BountyHunter('Hoth', 8)]);
      });
    });
  });

  describe('PlanetPatrol', () => {
    describe('Blank string name', () => {
      it('should throw MissingMandatoryValueException', () => {
        expect(() => {
          new BountyHunter('', 1);
        }).toThrow(MissingMandatoryValueException.forBlankValue('planet'));
      });
    });

    describe('Negative patrol day', () => {
      it('should throw IntegerTooLowException', () => {
        expect(() => {
          new BountyHunter('Hoth', -1);
        }).toThrow(IntegerTooLowException.builder().setField('day').setCurrentValue(-1).setMinValue(0).build());
      });
    });

    describe('Valid patrol', () => {
      it('should not throw anything', () => {
        expect(() => {
          new BountyHunter('Hoth', 6);
        }).not.toThrow();
      });
    });
  });
});
