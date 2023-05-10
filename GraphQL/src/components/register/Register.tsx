import { useNavigate } from 'react-router-dom';
import { useForm, Resolver } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Button, Alert } from 'antd';

import { useGetLocalization, useSetUser } from '../../hooks/reduxHooks';
import { TFormRegistration } from '../fieldsForm/type';
import { TextInput } from '../fieldsForm/textInput/TextInput';
import { PasswordInput } from '../fieldsForm/passwordInput/PasswordInput';
import resolverRegistration from './ResolverRegistration';
import formData from '../../assets/json/formData.json';
import './Register.scss';

export default function Register() {
  const registerUserDispatch = useSetUser();
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
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userForm.email, userForm.password)
      .then(({ user }) => {
        registerUserDispatch({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        });
        navigate('/graph');
        setErrorServer('');
      })
      .catch(() => {
        setErrorServer(formData[lang].serverErrorRegister);
      });
  });

  return (
    <form onSubmit={handleRegister} className="form-register">
      {errorServer ? (
        <Alert message={errorServer} type="error" className="error-register"></Alert>
      ) : (
        <br />
      )}
      <TextInput control={control} name="email" error={errors.email} />
      <PasswordInput control={control} name="password" error={errors.password} />
      <PasswordInput control={control} name="passwordRepeat" error={errors.passwordRepeat} />
      <Button onClick={handleRegister} onSubmit={handleRegister} type="default">
        {formData[lang].buttonRegister}
      </Button>
      <button className="btn-hide"></button>
    </form>
  );
}
