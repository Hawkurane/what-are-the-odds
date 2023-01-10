import { MissingMandatoryValueException } from 'src/app/domain/error/missing-mandatory-value.exception';
import { Path } from 'src/app/domain/path';

describe('Path', () => {
  describe('Blank departure', () => {
    it('should throw MissingMandatoryValueException', () => {
      expect(() => {
        new Path('', 'Endor');
      }).toThrow(MissingMandatoryValueException.forBlankValue('departure'));
    });
  });

  describe('Blank arrival', () => {
    it('should throw MissingMandatoryValueException', () => {
      expect(() => {
        new Path('Tatooine', '');
      }).toThrow(MissingMandatoryValueException.forBlankValue('arrival'));
    });
  });

  describe('Valid Path', () => {
    it('should not throw any exception', () => {
      expect(() => {
        new Path('Tatooine', 'Endor');
      }).not.toThrow();
    });
  });
});
