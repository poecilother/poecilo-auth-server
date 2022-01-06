const userValidation = require('../../../../utils/user/userValidation');
const userMessages = require('../../../../utils/user/userMessages');

describe('userValidation util - email', () => {
  test('Validate_Email_ReturnEmptyArrays', () => {
    const expectedReturn = { fields: [], msgs: [] };
    const email = 'test@test.com';
    let response = { fields: [], msgs: [] };

    response = userValidation.email(email, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Email_ReturnMissingEmail_WhenGivenUndefined', () => {
    const expectedReturn = { fields: ['email'], msgs: [userMessages.validation.email.missing] };
    const email = undefined;
    let response = { fields: [], msgs: [] };

    response = userValidation.email(email, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Email_ReturnMissingEmail_WhenGivenNull', () => {
    const expectedReturn = { fields: ['email'], msgs: [userMessages.validation.email.missing] };
    const email = null;
    let response = { fields: [], msgs: [] };

    response = userValidation.email(email, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Email_ReturnMissingEmail_WhenGivenEmptyString', () => {
    const expectedReturn = { fields: ['email'], msgs: [userMessages.validation.email.missing] };
    const email = '';
    let response = { fields: [], msgs: [] };

    response = userValidation.email(email, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Email_ReturnInvalidType', () => {
    const expectedReturn = { fields: ['email'], msgs: [userMessages.validation.email.type] };
    const email = 0;
    let response = { fields: [], msgs: [] };

    response = userValidation.email(email, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Email_ReturnInvalidEmail_WhenGivenWithoutAt', () => {
    const expectedReturn = { fields: ['email'], msgs: [userMessages.validation.email.invalid] };
    const email = 'testtest.com';
    let response = { fields: [], msgs: [] };

    response = userValidation.email(email, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Email_ReturnInvalidEmail_WhenGivenWithoutPrefix', () => {
    const expectedReturn = { fields: ['email'], msgs: [userMessages.validation.email.invalid] };
    const email = '@test.com';
    let response = { fields: [], msgs: [] };

    response = userValidation.email(email, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Email_ReturnInvalidEmail_WhenGivenWithoutSuffix', () => {
    const expectedReturn = { fields: ['email'], msgs: [userMessages.validation.email.invalid] };
    const email = 'test@.com';
    let response = { fields: [], msgs: [] };

    response = userValidation.email(email, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Email_ReturnInvalidEmail_WhenGivenWithoutDot', () => {
    const expectedReturn = { fields: ['email'], msgs: [userMessages.validation.email.invalid] };
    const email = 'test@testcom';
    let response = { fields: [], msgs: [] };

    response = userValidation.email(email, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Email_ReturnInvalidEmail_WhenGivenDoubleAt', () => {
    const expectedReturn = { fields: ['email'], msgs: [userMessages.validation.email.invalid] };
    const email = 'test@@test.com';
    let response = { fields: [], msgs: [] };

    response = userValidation.email(email, response);

    expect(response).toStrictEqual(expectedReturn);
  });
});
