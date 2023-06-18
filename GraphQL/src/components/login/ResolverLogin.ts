import { Resolver } from 'react-hook-form';

import { TFormLogin } from '../fieldsForm/type';
import { Pattern } from 'managers/pattern/Pattern';

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
          : !RegExp(Pattern.email).test(values.email)
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
