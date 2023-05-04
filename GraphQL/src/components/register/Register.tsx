import { useNavigate } from 'react-router-dom';
import { useForm, Resolver } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Button, Alert } from 'antd';

import { useAppSelector, useSetUser } from '../../hooks/reduxHooks';
import { startSession } from '../../cookie/userAuthCookie';
import { TFormRegistration } from '../fieldsForm/type';
import { TextInput } from '../fieldsForm/textInput/TextInput';
import { PasswordInput } from '../fieldsForm/passwordInput/PasswordInput';
import formData from '../../assets/json/formData.json';
import './Register.scss';

export default function Register() {
  const registerUserDispatch = useSetUser();
  const navigate = useNavigate();
  const [errorServer, setErrorServer] = useState('');
  const lang = useAppSelector((state) => state.localization);

  const resolver: Resolver<TFormRegistration> = async (values) => {
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
              message: formData[lang].password.required,
            }
          : !RegExp(formData[lang].password.pattern).test(values.password)
          ? {
              type: 'pattern',
              message: formData[lang].password.required,
            }
          : null,
        passwordRepeat:
          !values.passwordRepeat || values.password !== values.passwordRepeat
            ? {
                type: 'required',
                message: formData[lang].passwordRepeat.required,
              }
            : null,
      },
    };
    if (!checkForm.errors.email && !checkForm.errors.password && !checkForm.errors.passwordRepeat) {
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
        startSession(String(user.email), user.refreshToken, user.uid);
        navigate('/graph');
        setErrorServer('');
      })
      .catch(() => {
        setErrorServer(formData[lang].serverErrorRegister);
      });
  });

  return (
    <form onSubmit={handleRegister} className="form-register">
      {errorServer && <Alert message={errorServer} type="error" className="error-register"></Alert>}
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
