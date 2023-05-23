import { useNavigate } from 'react-router-dom';
import { useForm, Resolver } from 'react-hook-form';
import { useState } from 'react';
import { Button, Alert } from 'antd';

import { useGetLocalization } from '../../hooks/reduxHooks';
import { registerWithEmailAndPassword } from '@/firebase/firebase';
import { TFormRegistration } from '../fieldsForm/type';
import { TextInput } from '../fieldsForm/textInput/TextInput';
import { PasswordInput } from '../fieldsForm/passwordInput/PasswordInput';
import resolverRegistration from './ResolverRegistration';
import formData from '../../assets/json/formData.json';
import styles from './Register.module.scss';

export default function Register() {
  const navigate = useNavigate();
  const [errorServer, setErrorServer] = useState('');
  const { lang } = useGetLocalization();

  const resolver: Resolver<TFormRegistration> = resolverRegistration();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormRegistration>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver,
  });

  const handleRegister = handleSubmit((userForm) => {
    registerWithEmailAndPassword(userForm.email, userForm.password)
      .then(() => {
        navigate('/graph');
        setErrorServer('');
      })
      .catch(() => {
        setErrorServer(formData[lang].serverErrorRegister);
      });
  });

  return (
    <form onSubmit={handleRegister} className={styles.form_register}>
      {errorServer ? (
        <Alert message={errorServer} type="error" className={styles.error_register}></Alert>
      ) : (
        <br />
      )}
      <TextInput control={control} name="email" error={errors.email} />
      <PasswordInput control={control} name="password" error={errors.password} />
      <PasswordInput control={control} name="passwordRepeat" error={errors.passwordRepeat} />
      <Button onClick={handleRegister} onSubmit={handleRegister} type="default">
        {formData[lang].buttonRegister}
      </Button>
      <button className={styles.btn_hide}></button>
    </form>
  );
}
