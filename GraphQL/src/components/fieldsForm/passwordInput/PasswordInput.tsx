import { Input, Form } from 'antd';
import { Controller } from 'react-hook-form';

import { TErrorResolver, TPropsForm } from '../type';
import { useGetLocalization } from '@/hooks/reduxHooks';
import formData from '../../../assets/json/formData.json';
import styles from './PasswordInput.module.scss';

export function PasswordInput({ control, name, error }: TPropsForm) {
  const { lang } = useGetLocalization();
  const errorMessage = error?.message as TErrorResolver;

  return (
    <Form.Item
      validateStatus={error ? 'error' : 'success'}
      help={formData[lang][name][errorMessage]}
    >
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
