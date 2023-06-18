import { useChangeLocalization, useGetLocalization } from '@/hooks/reduxHooks';
import { ELocalization } from '@/store/type';
import { Switch } from 'antd';

import styles from './SwitcherLanguage.module.scss';

export default function SwitchLanguage() {
  const changeLanguageDispatch = useChangeLocalization();
  const { lang } = useGetLocalization();

  const onChange = (checked: boolean) => {
    changeLanguageDispatch(checked ? ELocalization.ru : ELocalization.en);
  };

  return (
    <Switch
      checkedChildren={ELocalization.ru}
      unCheckedChildren={ELocalization.en}
      onChange={onChange}
      defaultChecked={lang === ELocalization.ru ? true : false}
      className={styles.switcher}
    />
  );
}
