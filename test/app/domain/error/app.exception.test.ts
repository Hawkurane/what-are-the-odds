import { AppException } from 'src/app/domain/error/app.exception';

describe('AppException', () => {
  it('should retrieve information from exception', () => {
    const appException: AppException = AppException.baseBuilder(
      'information message',
    )
      .setStatus(500)
      .build();

    expect(appException.getStatusCode()).toBe(500);
    expect(appException.message).toBe('information message');
  });
});
