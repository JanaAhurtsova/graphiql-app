import { Resolver } from 'react-hook-form';

import { TFormRegistration } from '../fieldsForm/type';
import formData from '../../assets/json/formData.json';

export default function resolverRegistration(): Resolver<TFormRegistration> {
  return async (values) => {
    const checkForm = {
      values: values,
      errors: {
        email: !values.email
          ? {
              type: 'required',
              message: 'required',
            }
          : !RegExp(formData.pattern.email).test(values.email)
          ? {
              type: 'pattern',
              message: 'required',
            }
          : null,
        password: !values.password
          ? {
              type: 'required',
              message: 'required',
            }
          : !RegExp(formData.pattern.password).test(values.password)
          ? {
              type: 'pattern',
              message: 'required',
            }
          : null,
        passwordRepeat:
          !values.passwordRepeat || values.password !== values.passwordRepeat
            ? {
                type: 'required',
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
