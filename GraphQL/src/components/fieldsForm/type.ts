import { Control, FieldError } from 'react-hook-form';

import { ELocalization } from '@/store/type';

export type TNameFieldsForm = 'email' | 'passwordRepeat' | 'password';

export type TFormRegistration = {
  email: string;
  password: string;
  passwordRepeat?: string;
};

export type TFormLogin = {
  email: string;
  password: string;
};

export type TPropsForm = {
  control: Control<TFormRegistration | TFormLogin>;
  name: TNameFieldsForm;
  error: FieldError | undefined;
};

export type TErrorResolver = {
  [ELocalization.en]: string;
  [ELocalization.ru]: string;
};
