import { Input, Form } from 'antd';
import { Controller } from 'react-hook-form';

import { TPropsForm, TErrorResolver } from '../type';
import { useGetLocalization } from '@/hooks/reduxHooks';
import formData from '../../../assets/json/formData.json';
import './PasswordInput.scss';

export function PasswordInput({ control, name, error }: TPropsForm) {
  const { lang } = useGetLocalization();
  const errorMessage = error?.message && (error?.message as unknown as TErrorResolver)[lang];
  return (
    <Form.Item validateStatus={error ? 'error' : 'success'} help={errorMessage}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input.Password
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
            className="password-input"
            placeholder={formData[lang][name].placeholder}
          />
        )}
        rules={{ required: true }}
      />
    </Form.Item>
  );
}
