import Input from 'antd/es/input/Input';
import { Controller } from 'react-hook-form';

import { TPropsForm } from '../type';
import { useAppSelector } from '@/hooks/reduxHooks';
import formData from '../../../assets/json/formData.json';
import './TextInput.scss';
import { Form } from 'antd';

export function TextInput({ control, name, error }: TPropsForm) {
  const { lang } = useAppSelector((state) => state.localization);
  return (
    <Form.Item validateStatus={error ? 'error' : 'success'} help={error?.message}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
            className="text-input"
            placeholder={formData[lang][name].placeholder}
          />
        )}
        rules={{ required: true }}
      />
    </Form.Item>
  );
}
