import { Resolver } from 'react-hook-form';

import { TFormRegistration } from '../fieldsForm/type';
import formData from 'assets/json/formData.json';
import { Type } from 'managers/resolver/enum';

export default function resolverRegistration(): Resolver<TFormRegistration> {
  return async (values) => {
    const checkForm = {
      values: values,
      errors: {
        email: !values.email
          ? {
              type: Type.REQUIRED,
              message: 'required',
            }
          : !RegExp(formData.pattern.email).test(values.email)
          ? {
              type: Type.PATTERN,
              message: 'required',
            }
          : null,
        password: !values.password
          ? {
              type: Type.REQUIRED,
              message: 'required',
            }
          : !RegExp(formData.pattern.password, 'i').test(values.password)
          ? {
              type: Type.PATTERN,
              message: 'required',
            }
          : null,
        passwordRepeat:
          !values.passwordRepeat || values.password !== values.passwordRepeat
            ? {
                type: Type.REQUIRED,
                message: 'required',
              }
            : null,
      },
    };
    if (!checkForm.errors.email && !checkForm.errors.password && !checkForm.errors.passwordRepeat) {
      return {
        values: values,
        errors: {},
      };
    }
    return checkForm;
  };
}
