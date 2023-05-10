import { Resolver } from 'react-hook-form';

import { TFormLogin } from '../fieldsForm/type';
import { ELocalization } from '@/store/type';
import formData from '../../assets/json/formData.json';

export default function ResolverLogin(): Resolver<TFormLogin> {
  return async (values) => {
    const checkForm = {
      values: values,
      errors: {
        email: !values.email
          ? {
              type: 'required',
              message: {
                [ELocalization.en]: formData[ELocalization.en].email.required,
                [ELocalization.ru]: formData[ELocalization.ru].email.required,
              },
            }
          : !RegExp(formData.pattern.email).test(values.email)
          ? {
              type: 'pattern',
              message: {
                [ELocalization.en]: formData[ELocalization.en].email.required,
                [ELocalization.ru]: formData[ELocalization.ru].email.required,
              },
            }
          : null,
        password: !values.password
          ? {
              type: 'required',
              message: {
                [ELocalization.en]: formData[ELocalization.en].password.placeholder,
                [ELocalization.ru]: formData[ELocalization.ru].password.placeholder,
              },
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
