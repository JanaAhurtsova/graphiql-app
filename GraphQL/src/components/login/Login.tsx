import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { Button, Alert } from 'antd';

import { logInWithEmailAndPassword } from '@/firebase/firebase';
import { useGetLocalization } from 'hooks/reduxHooks';
import { TextInput } from '../fieldsForm/textInput/TextInput';
import { PasswordInput } from '../fieldsForm/passwordInput/PasswordInput';
import { TFormLogin } from '../fieldsForm/type';
import resolverLogin from './ResolverLogin';
import formData from 'assets/json/formData.json';
import styles from './Login.module.scss';

export default function Login() {
  const navigate = useNavigate();
  const { lang } = useGetLocalization();
  const [errorServer, setErrorServer] = useState('');

  const resolver: Resolver<TFormLogin> = resolverLogin();

  useEffect(() => {
    errorServer && setErrorServer(formData[lang].serverErrorRegister);
  }, [lang, errorServer]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormLogin>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver,
  });

  const handleLogin = handleSubmit((userForm) => {
    logInWithEmailAndPassword(userForm.email, userForm.password)
      .then(() => {
        navigate('/graph');
        setErrorServer('');
      })
      .catch(() => {
        setErrorServer(formData[lang].serverErrorLogin);
      });
  });

  return (
    <form onSubmit={handleLogin} className={styles.form_login}>
      {errorServer ? (
        <Alert message={errorServer} type="error" className={styles.error_login}></Alert>
      ) : (
        <br />
      )}
      <TextInput control={control} name="email" error={errors.email} />
      <PasswordInput control={control} name="password" error={errors.password} />
      <Button onClick={handleLogin} onSubmit={handleLogin} type="default">
        {formData[lang].buttonLogin}
      </Button>
      <button className={styles.btn_hide}></button>
    </form>
  );
}
