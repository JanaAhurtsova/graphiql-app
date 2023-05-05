import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Tabs } from 'antd';

import Login from '../../login/Login';
import { useAuth } from '@/hooks/useAuth';
import { useAppSelector } from '@/hooks/reduxHooks';
import Register from 'components/register/Register';
import localizationJSON from 'assets/json/localization.json';
import './LoginPage.scss';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { lang } = useAppSelector((state) => state.localization);

  useEffect(() => {
    if (isAuth) {
      navigate('/graph');
    }
  });
  return (
    <div className="login-tabs">
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="middle"
        items={[
          {
            label: localizationJSON[lang].titleSignIn,
            key: localizationJSON[lang].titleSignIn,
            children: <Login />,
          },
          {
            label: localizationJSON[lang].titleSignUp,
            key: localizationJSON[lang].titleSignUp,
            children: <Register />,
          },
        ]}
      />
    </div>
  );
}
