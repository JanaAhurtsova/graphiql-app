import { Resolver } from 'react-hook-form';

import { TFormRegistration } from '../fieldsForm/type';
import { ELocalization } from '@/store/type';
import formData from '../../assets/json/formData.json';

export default function resolverRegistration(): Resolver<TFormRegistration> {
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
                [ELocalization.en]: formData[ELocalization.en].password.required,
                [ELocalization.ru]: formData[ELocalization.ru].password.required,
              },
            }
          : !RegExp(formData.pattern.password).test(values.password)
          ? {
              type: 'pattern',
              message: {
                [ELocalization.en]: formData[ELocalization.en].password.required,
                [ELocalization.ru]: formData[ELocalization.ru].password.required,
              },
            }
          : null,
        passwordRepeat:
          !values.passwordRepeat || values.password !== values.passwordRepeat
            ? {
                type: 'required',
                message: {
                  [ELocalization.en]: formData[ELocalization.en].passwordRepeat.required,
                  [ELocalization.ru]: formData[ELocalization.ru].passwordRepeat.required,
                },
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