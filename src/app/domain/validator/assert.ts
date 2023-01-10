import { IntegerTooLowException } from '../error/integer-too-low.exception';
import { MissingMandatoryValueException } from '../error/missing-mandatory-value.exception';

export class Assert {
  static notBlank(fieldName: string, value: string): void {
    if (value.length === 0)
      throw MissingMandatoryValueException.forBlankValue(fieldName);
  }

  static thatInteger(fieldName: string, currentValue: number): IntegerAsserter {
    return new IntegerAsserter(fieldName, currentValue);
  }
}

class IntegerAsserter {
  private fieldName: string;
  private value: number;

  constructor(fieldName: string, value: number) {
    this.fieldName = fieldName;
    this.value = value;
  }

  min(minValue: number): IntegerAsserter {
    if (this.value >= minValue) return this;
    throw IntegerTooLowException.builder()
      .setField(this.fieldName)
      .setCurrentValue(this.value)
      .setMinValue(minValue)
      .build();
  }
}
