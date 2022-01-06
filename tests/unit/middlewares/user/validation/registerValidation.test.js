const registerValidation = require('../../../../../middlewares/user/validation/registerValidation');
const userMessages = require('../../../../../utils/user/userMessages');
const commonMessages = require('../../../../../utils/common/commonMessages');
const { responseStatus } = require('../../../../../utils/common/restUtils');

describe('registerValidation middleware', () => {
  let req, res;
  let next = jest.fn();

  beforeEach(() => {
    req = { body: {} };
    res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    next.mockReset();
  });

  test('Validate_User_CallNext', () => {
    req.body.user = {
      email: 'test@test.pl',
      password: 'Pa$$w0rd'
    };

    registerValidation(req, res, next);
    
    expect(next).toBeCalled();
  });

  test('Validate_User_DoesntCallNext', () => {
    registerValidation(req, res, next);
    
    expect(next).not.toBeCalled();
  });

  test('Validate_User_ReturnMissingBody', () => {
    const expectedReturn = {
      status: responseStatus.BAD_REQUEST().status,
      send: commonMessages.validation.body.missing
    };

    registerValidation(req, res, next);

    expect(res.status.mock.calls[0][0]).toBe(expectedReturn.status);
    expect(res.send.mock.calls[0][0]).toBe(expectedReturn.send);
  });

  test('Validate_User_ReturnMissingUserObject', () => {
    const expectedReturn = {
      status: responseStatus.BAD_REQUEST().status,
      send: commonMessages.validation.object.missing('user')
    };

    req.body = { test: {} };

    registerValidation(req, res, next);

    expect(res.status.mock.calls[0][0]).toBe(expectedReturn.status);
    expect(res.send.mock.calls[0][0]).toBe(expectedReturn.send);
  });

  test('Validate_User_ReturnInvalidUserObject', () => {
    const expectedReturn = {
      status: responseStatus.BAD_REQUEST().status,
      send: commonMessages.validation.object.invalid('user')
    };

    req.body = { user: {} };

    registerValidation(req, res, next);

    expect(res.status.mock.calls[0][0]).toBe(expectedReturn.status);
    expect(res.send.mock.calls[0][0]).toBe(expectedReturn.send);
  });

  test('Validate_User_ReturnInvalidEmailMessage', () => {
    const expectedReturn = {
      status: responseStatus.BAD_REQUEST().status,
      send: {
        fields: ['email'],
        msgs: [userMessages.validation.email.missing]
      }
    };

    req.body = { user: { email: '', password: 'Pa$$w0rd' } };

    registerValidation(req, res, next);

    expect(res.status.mock.calls[0][0]).toBe(expectedReturn.status);
    expect(res.send.mock.calls[0][0]).toStrictEqual(expectedReturn.send);
  });

  test('Validate_User_ReturnInvalidPasswordMessage', () => {
    const expectedReturn = {
      status: responseStatus.BAD_REQUEST().status,
      send: {
        fields: ['password'],
        msgs: [userMessages.validation.password.missing]
      }
    };

    req.body = { user: { email: 'test@test.pl', password: '' } };

    registerValidation(req, res, next);

    expect(res.status.mock.calls[0][0]).toBe(expectedReturn.status);
    expect(res.send.mock.calls[0][0]).toStrictEqual(expectedReturn.send);
  });
});
