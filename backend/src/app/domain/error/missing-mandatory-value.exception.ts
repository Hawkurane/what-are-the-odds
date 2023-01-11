import { AppException, AppExceptionBuilder } from './app.exception';
import { ErrorStatus } from './error-status';

export class MissingMandatoryValueException extends AppException {
  constructor(builder: AppExceptionBuilder) {
    super(builder);
  }

  static forBlankValue(fieldName: string): MissingMandatoryValueException {
    return new MissingMandatoryValueException(this.builder(this.defaultMessage(fieldName) + ' (blank).'));
  }

  private static defaultMessage(fieldName: string): string {
    return `The field "${fieldName}" is mandatory and was not set`;
  }

  static builder(message: string): AppExceptionBuilder {
    return AppException.baseBuilder(message).setStatus(ErrorStatus.INTERNAL_SERVER_ERROR);
  }
}
