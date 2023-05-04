import { FieldError, Control } from 'react-hook-form';

export type TNameFieldsForm = 'email' | 'passwordRepeat' | 'password';

export type TFormRegistration = {
  email: string;
  password: string;
  passwordRepeat: string;
};

export type TPropsForm = {
  control: Control<TFormRegistration>;
  name: TNameFieldsForm;
  error: FieldError | undefined;
};
