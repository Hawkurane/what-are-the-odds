import { MissingMandatoryValueException } from 'src/app/domain/error/missing-mandatory-value.exception';

describe('MissingMandatoryValueException', () => {
  it('should get exception for blank value', () => {
    const exception: MissingMandatoryValueException = MissingMandatoryValueException.forBlankValue('field');
    expect(exception.getStatusCode()).toBe(500);
    expect(exception.message).toBe('The field "field" is mandatory and was not set (blank).');
  });
});
