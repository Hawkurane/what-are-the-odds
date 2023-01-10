import { AppException } from './app.exception';
import { ErrorStatus } from './error-status';

export class IntegerTooLowException extends AppException {
  constructor(builder: IntegerTooLowExceptionBuilder) {
    super(
      AppException.baseBuilder(builder.message()).setStatus(
        ErrorStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  }

  static builder(): IntegerTooLowExceptionBuilder {
    return new IntegerTooLowExceptionBuilder();
  }
}

class IntegerTooLowExceptionBuilder {
  fieldName: string;
  currentValue: number;
  minValue: number;

  setField(fieldName: string): IntegerTooLowExceptionBuilder {
    this.fieldName = fieldName;
    return this;
  }

  setCurrentValue(currentValue: number): IntegerTooLowExceptionBuilder {
    this.currentValue = currentValue;
    return this;
  }

  setMinValue(minValue: number): IntegerTooLowExceptionBuilder {
    this.minValue = minValue;
    return this;
  }

  message(): string {
    return `Value of "${this.fieldName}" must be at least ${this.minValue} but was ${this.currentValue}.`;
  }

  build(): IntegerTooLowException {
    return new IntegerTooLowException(this);
  }
}
