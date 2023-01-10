import { ErrorStatus } from 'src/app/domain/error/error-status';

export class AppException extends Error {
  private statusCode: ErrorStatus;

  constructor(builder: AppExceptionBuilder) {
    super(builder.getMessage());
    this.statusCode = builder.getStatus();
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  static baseBuilder(message: string): AppExceptionBuilder {
    return new AppExceptionBuilder(message);
  }
}

export class AppExceptionBuilder {
  private status: number;
  private message: string;

  constructor(message: string) {
    this.message = message;
  }

  setStatus(status: number): AppExceptionBuilder {
    this.status = status;
    return this;
  }

  getStatus(): number {
    return this.status;
  }

  getMessage(): string {
    return this.message;
  }

  build(): AppException {
    return new AppException(this);
  }
}
