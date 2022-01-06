const userValidation = require('../../../../utils/user/userValidation');
const userMessages = require('../../../../utils/user/userMessages');

describe('userValidation util - password', () => {
  test('Validate_Password_ReturnEmptyArrays', () => {
    const expectedReturn = { fields: [], msgs: [] };
    const password = 'Pa$$w0rd';
    let response = { fields: [], msgs: [] };

    response = userValidation.password(password, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Password_ReturnMissingPassword_WhenGivenUndefined', () => {
    const expectedReturn = { fields: ['password'], msgs: [userMessages.validation.password.missing] };
    const password = undefined;
    let response = { fields: [], msgs: [] };

    response = userValidation.password(password, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Password_ReturnMissingPassword_WhenGivenNull', () => {
    const expectedReturn = { fields: ['password'], msgs: [userMessages.validation.password.missing] };
    const password = null;
    let response = { fields: [], msgs: [] };

    response = userValidation.password(password, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Password_ReturnMissingPassword_WhenGivenEmptyString', () => {
    const expectedReturn = { fields: ['password'], msgs: [userMessages.validation.password.missing] };
    const password = '';
    let response = { fields: [], msgs: [] };

    response = userValidation.password(password, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Password_ReturnInvalidType', () => {
    const expectedReturn = { fields: ['password'], msgs: [userMessages.validation.password.type] };
    const password = 0;
    let response = { fields: [], msgs: [] };

    response = userValidation.password(password, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Password_ReturnInvalidPassword_WhenGivenTooLongPassword', () => {
    const expectedReturn = { fields: ['password'], msgs: [{ maxLength: userMessages.validation.password.maxLength(256) }] };
    const password = 'Pa$$w0rd'.repeat(33);
    let response = { fields: [], msgs: [] };

    response = userValidation.password(password, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Password_ReturnInvalidPassword_WhenGivenTooShortPassword', () => {
    const expectedReturn = { fields: ['password'], msgs: [{ minLength: userMessages.validation.password.minLength(8) }] };
    const password = 'Pa$$w0r';
    let response = { fields: [], msgs: [] };

    response = userValidation.password(password, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Password_ReturnInvalidPassword_WhenGivenWithoutDigit', () => {
    const expectedReturn = { fields: ['password'], msgs: [{ digit: userMessages.validation.password.digit }] };
    const password = 'Pa$$word';
    let response = { fields: [], msgs: [] };

    response = userValidation.password(password, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Password_ReturnInvalidPassword_WhenGivenWithoutCapitalLetter', () => {
    const expectedReturn = { fields: ['password'], msgs: [{ capital: userMessages.validation.password.capital }] };
    const password = 'pa$$w0rd';
    let response = { fields: [], msgs: [] };

    response = userValidation.password(password, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Password_ReturnInvalidPassword_WhenGivenWithoutSmallLetter', () => {
    const expectedReturn = { fields: ['password'], msgs: [{ small: userMessages.validation.password.small }] };
    const password = 'PA$$W0RD';
    let response = { fields: [], msgs: [] };

    response = userValidation.password(password, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Password_ReturnInvalidPassword_WhenGivenWithoutSpecialCharacter', () => {
    const expectedReturn = { fields: ['password'], msgs: [{ special: userMessages.validation.password.special }] };
    const password = 'Passw0rd';
    let response = { fields: [], msgs: [] };

    response = userValidation.password(password, response);

    expect(response).toStrictEqual(expectedReturn);
  });

  test('Validate_Password_ReturnInvalidPassword_WhenGivenWithSpace', () => {
    const expectedReturn = { fields: ['password'], msgs: [{ whiteSpace: userMessages.validation.password.whiteSpace }] };
    const password = 'Pa$$w0rd ';
    let response = { fields: [], msgs: [] };

    response = userValidation.password(password, response);

    expect(response).toStrictEqual(expectedReturn);
  });
});
