import { IntegerTooLowException } from 'src/app/domain/error/integer-too-low.exception';
import { MissingMandatoryValueException } from 'src/app/domain/error/missing-mandatory-value.exception';
import { Travel } from 'src/app/domain/travel';

describe('Travel', () => {
  describe('Blank departure', () => {
    it('should throw MissingMandatoryValueException', () => {
      expect(() => {
        new Travel('', 'Hoth', 1);
      }).toThrow(MissingMandatoryValueException.forBlankValue('departure'));
    });
  });

  describe('Blank destination', () => {
    it('should throw MissingMandatoryValueException', () => {
      expect(() => {
        new Travel('Tatooine', '', 6);
      }).toThrow(MissingMandatoryValueException.forBlankValue('destination'));
    });
  });

  describe('Negative travel time', () => {
    it('should throw IntegerTooLowException', () => {
      expect(() => {
        new Travel('Tatooine', 'Hoth', -1);
      }).toThrow(IntegerTooLowException.builder().setField('travelTime').setCurrentValue(-1).setMinValue(1).build());
    });
  });

  describe('Valid Route', () => {
    it('should not throw any exception', () => {
      expect(() => {
        new Travel('Tatooine', 'Hoth', 6);
      }).not.toThrow();
    });
  });
});
