import { Input, Form } from 'antd';
import { Controller } from 'react-hook-form';

import { TPropsForm } from '../type';
import formData from '../../../assets/json/formData.json';
import './PasswordInput.scss';

export function PasswordInput({ control, name, error }: TPropsForm) {
  const lang = 'en';
  return (
    <Form.Item validateStatus={error ? 'error' : 'success'} help={error?.message}>
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
      />
    </Form.Item>
  );
}
