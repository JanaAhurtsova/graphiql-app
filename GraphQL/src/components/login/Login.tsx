import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Alert } from 'antd';

import { useAppSelector, useSetUser } from '../../hooks/reduxHooks';
import { TextInput } from '../fieldsForm/textInput/TextInput';
import { PasswordInput } from '../fieldsForm/passwordInput/PasswordInput';
import { TFormLogin } from '../fieldsForm/type';
import formData from '../../assets/json/formData.json';
import './Login.scss';

export default function Login() {
  const setUserDispatch = useSetUser();
  const navigate = useNavigate();
  const { lang } = useAppSelector((state) => state.localization);
  const [errorServer, setErrorServer] = useState('');

  const resolver: Resolver<TFormLogin> = async (values) => {
    const checkForm = {
      values: values,
      errors: {
        email: !values.email
          ? {
              type: 'required',
              message: formData[lang].email.required,
            }
          : !RegExp(formData[lang].email.pattern).test(values.email)
          ? {
              type: 'pattern',
              message: formData[lang].email.required,
            }
          : null,
        password: !values.password
          ? {
              type: 'required',
              message: formData[lang].password.placeholder,
            }
          : null,
      },
    };
    if (!checkForm.errors.email && !checkForm.errors.password) {
      return {
        values: values,
        errors: {},
      };
    }
    return checkForm;
  };

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
        setErrorServer(formData[lang].serverErrorRegister);
      });
  });

  return (
    <form onSubmit={handleLogin} className="form-login">
      {errorServer && <Alert message={errorServer} type="error" className="error-login"></Alert>}
      <TextInput control={control} name="email" error={errors.email} />
      <PasswordInput control={control} name="password" error={errors.password} />
      <Button onClick={handleLogin} onSubmit={handleLogin} type="default">
        {formData[lang].buttonLogin}
      </Button>
      <button className="btn-hide"></button>
    </form>
  );
}
