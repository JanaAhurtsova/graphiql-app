import { Input, Form } from 'antd';
import { Controller } from 'react-hook-form';

import { TPropsForm } from '../type';
import { useGetLocalization } from '@/hooks/reduxHooks';
import formData from '../../../assets/json/formData.json';
import './PasswordInput.scss';

export function PasswordInput({ control, name, error }: TPropsForm) {
  const { lang } = useGetLocalization();
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
        rules={{ required: true }}
      />
    </Form.Item>
  );
}
