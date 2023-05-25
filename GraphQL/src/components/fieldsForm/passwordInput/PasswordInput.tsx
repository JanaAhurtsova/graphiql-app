import { Input, Form } from 'antd';
import { Controller } from 'react-hook-form';

import { TPropsForm, TErrorResolver } from '../type';
import { useGetLocalization } from 'hooks/reduxHooks';
import formData from 'assets/json/formData.json';
import { isError } from 'managers/form/Error';
import styles from './PasswordInput.module.scss';

export function PasswordInput({ control, name, error }: TPropsForm) {
  const { lang } = useGetLocalization();
  const errorMessage = error?.message as TErrorResolver;

  return (
    <Form.Item validateStatus={isError(error)} help={formData[lang][name][errorMessage]}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input.Password
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
            className={styles.password_input}
            placeholder={formData[lang][name].placeholder}
          />
        )}
        rules={{ required: true }}
      />
    </Form.Item>
  );
}
