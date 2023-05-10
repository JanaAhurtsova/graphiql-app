import { Input, Form } from 'antd';
import { Controller } from 'react-hook-form';

import { TPropsForm, TErrorResolver } from '../type';
import { useGetLocalization } from '@/hooks/reduxHooks';
import formData from '../../../assets/json/formData.json';
import './TextInput.scss';

export function TextInput({ control, name, error }: TPropsForm) {
  const { lang } = useGetLocalization();

  return (
    <Form.Item
      validateStatus={error ? 'error' : 'success'}
      help={(error?.message as unknown as TErrorResolver)[lang]}
    >
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
