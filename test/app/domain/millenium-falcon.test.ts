import { IntegerTooLowException } from 'src/app/domain/error/integer-too-low.exception';
import { MissingMandatoryValueException } from 'src/app/domain/error/missing-mandatory-value.exception';
import { MilleniumFalcon } from 'src/app/domain/millenium-falcon';

describe('MilleniumFalcon', () => {
  describe('Blank departure', () => {
    it('should throw MissingMandatoryValueException', () => {
      expect(() => {
        new MilleniumFalcon(6, '', 'Endor');
      }).toThrow(MissingMandatoryValueException.forBlankValue('departure'));
    });
  });

  describe('Blank arrival', () => {
    it('should throw MissingMandatoryValueException', () => {
      expect(() => {
        new MilleniumFalcon(6, 'Tatooine', '');
      }).toThrow(MissingMandatoryValueException.forBlankValue('arrival'));
    });
  });

  describe('Non positive autonomy', () => {
    it('should throw IntegerTooLowException', () => {
      expect(() => {
        new MilleniumFalcon(-1, 'Tatooine', 'Endor');
      }).toThrow(
        IntegerTooLowException.builder()
          .setField('autonomy')
          .setCurrentValue(-1)
          .setMinValue(1)
          .build(),
      );
    });
  });

  describe('Valid MilleniumFalcon', () => {
    it('should not throw any exception', () => {
      expect(() => {
        new MilleniumFalcon(6, 'Tatooine', 'Endor');
      }).not.toThrow();
    });
  });
});
