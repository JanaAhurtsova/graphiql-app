import { Resolver } from 'react-hook-form';

import { TFormLogin } from '../fieldsForm/type';
import formData from '../../assets/json/formData.json';

export default function resolverLogin(): Resolver<TFormLogin> {
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
              message: 'placeholder',
            }
          : null,
      },
    };
    if (!checkForm.errors.email && !checkForm.errors.password) {
      return {
        values: values,
        errors: {},
      };
    }
    return checkForm;
  };
}
