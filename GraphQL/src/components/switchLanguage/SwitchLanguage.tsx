import { useAppSelector, useChangeLocalization } from '@/hooks/reduxHooks';
import { ELocalization } from '@/store/type';
import { Switch } from 'antd';

export default function SwitchLanguage() {
  const changeLanguageDispatch = useChangeLocalization();
  const { lang } = useAppSelector((store) => store.localization);
  console.log(lang);
  const onChange = (checked: boolean) => {
    changeLanguageDispatch(checked ? ELocalization.ru : ELocalization.en);
  };

  return (
    <>
      <Switch
        checkedChildren={ELocalization.ru}
        unCheckedChildren={ELocalization.en}
        onChange={onChange}
        defaultChecked={lang === ELocalization.ru ? true : false}
      />
    </>
  );
}
