import { responseMessage } from '../rest-utils';
import { GeneralValidation } from '.';
import validator from 'validator';

const constraints = {
  password: {
    minLength: 8,
    maxLength: 256,
  },
};

export const UserValidation = {
  email: (email: string) => {
    if (GeneralValidation.isStringMissing(email)) return responseMessage.missingParam('email');
    if (!validator.isEmail(email)) return responseMessage.invalidValue('email');
  },

  password: (password: string) => {
    interface passwordValidationObject { [key: string]: string };
    const passwordValidationMsgs: passwordValidationObject = {};

    if (GeneralValidation.isStringMissing(password)) return responseMessage.missingParam('password');
    if (password.length < constraints.password.minLength) {
      passwordValidationMsgs.minLength = responseMessage.wrongCharactersAmount('password', 'minimum', constraints.password.minLength);
    }
    if (password.length > constraints.password.maxLength) {
      passwordValidationMsgs.maxLength = responseMessage.wrongCharactersAmount('password', 'maximum', constraints.password.maxLength);
    }
    if (!/\d/.test(password)) {
      passwordValidationMsgs.digit = responseMessage.missingCharacter('password', 'digit');
    }
    if (!/[A-Z]/.test(password)) {
      passwordValidationMsgs.capital =responseMessage.missingCharacter('password', 'capital letter');
    }
    if (!/[a-z]/.test(password)) {
      passwordValidationMsgs.small = responseMessage.missingCharacter('password', 'small letter');
    }
    if (!/(?=\S)\W/.test(password)) {
      passwordValidationMsgs.special = responseMessage.missingCharacter('password', 'specjal character');
    }
    if (/\s/.test(password)) {
      passwordValidationMsgs.whiteSpace = responseMessage.wrongCharacter('password', 'white space');
    }

    if (Object.keys(passwordValidationMsgs).length > 0) return passwordValidationMsgs;
  },
};
