import { IntegerTooLowException } from 'src/app/domain/error/integer-too-low.exception';
import { MissingMandatoryValueException } from 'src/app/domain/error/missing-mandatory-value.exception';
import { Assert } from 'src/app/domain/validator/assert';

describe('Assert', () => {
  describe('notBlank', () => {
    describe('blank string', () => {
      it('should throw MissingMandatoryValueException', () => {
        expect(() => {
          Assert.notBlank('field', '');
        }).toThrow(MissingMandatoryValueException.forBlankValue('field'));
      });
    });

    describe('valid string', () => {
      it('should not throw any exception', () => {
        expect(() => {
          Assert.notBlank('field', 'Hello World!');
        }).not.toThrowError();
      });
    });
  });

  describe('min', () => {
    describe('too low number', () => {
      it('should throw IntegerTooLowException', () => {
        expect(() => {
          Assert.thatInteger('field', -1).min(1);
        }).toThrow(
          IntegerTooLowException.builder()
            .setField('field')
            .setCurrentValue(-1)
            .setMinValue(1)
            .build(),
        );
      });
    });
  });
});
