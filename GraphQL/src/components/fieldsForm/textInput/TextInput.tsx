import { Input, Form } from 'antd';
import { Controller } from 'react-hook-form';

import { TPropsForm, TErrorResolver } from '../type';
import { useGetLocalization } from '@/hooks/reduxHooks';
import formData from 'assets/json/formData.json';
import styles from './TextInput.module.scss';
import { isError } from 'managers/form/Error';

export function TextInput({ control, name, error }: TPropsForm) {
  const { lang } = useGetLocalization();
  const errorMessage = error?.message as TErrorResolver;

  return (
    <Form.Item validateStatus={isError(error)} help={formData[lang][name][errorMessage]}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
            className={styles.text_input}
            placeholder={formData[lang][name].placeholder}
          />
        )}
        rules={{ required: true }}
      />
    </Form.Item>
  );
}
