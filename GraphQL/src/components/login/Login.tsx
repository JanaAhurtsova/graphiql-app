import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Alert } from 'antd';

import { useGetLocalization, useSetUser } from '../../hooks/reduxHooks';
import { TextInput } from '../fieldsForm/textInput/TextInput';
import { PasswordInput } from '../fieldsForm/passwordInput/PasswordInput';
import { TFormLogin } from '../fieldsForm/type';
import resolverLogin from './ResolverLogin';
import formData from '../../assets/json/formData.json';
import './Login.scss';

export default function Login() {
  const setUserDispatch = useSetUser();
  const navigate = useNavigate();
  const { lang } = useGetLocalization();
  const [errorServer, setErrorServer] = useState('');

  const resolver: Resolver<TFormLogin> = resolverLogin();

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
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userForm.email, userForm.password)
      .then(({ user }) => {
        setUserDispatch({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        });
        navigate('/graph');
        setErrorServer('');
      })
      .catch(() => {
        setErrorServer(formData[lang].serverErrorLogin);
      });
  });

  return (
    <form onSubmit={handleLogin} className="form-login">
      {errorServer ? (
        <Alert message={errorServer} type="error" className="error-login"></Alert>
      ) : (
        <br />
      )}
      <TextInput control={control} name="email" error={errors.email} />
      <PasswordInput control={control} name="password" error={errors.password} />
      <Button onClick={handleLogin} onSubmit={handleLogin} type="default">
        {formData[lang].buttonLogin}
      </Button>
      <button className="btn-hide"></button>
    </form>
  );
}
