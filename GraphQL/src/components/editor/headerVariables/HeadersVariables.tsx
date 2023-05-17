import { Input, Button } from 'antd';
import { useState } from 'react';
import { ISetState } from './type';
import styles from './HeadersVariables.module.scss';
import langJSON from 'assets/json/localization.json';
import { useGetLocalization } from 'hooks/reduxHooks';
import { UpOutlined } from '@ant-design/icons';

export const HeadersVariables = ({ setVariables, setHeaders }: ISetState) => {
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);
  const { lang } = useGetLocalization();

  const openTextArea = (value: boolean) => {
    if (!open) {
      setOpen(true);
    }
    setActive(value);
  };

  const setDisplay = (flag: boolean) => (flag ? 'block' : 'none');

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.buttons}>
          <Button onClick={() => openTextArea(true)} type={active ? 'default' : 'text'}>
            {langJSON[lang].variables}
          </Button>
          <Button onClick={() => openTextArea(false)} type={!active ? 'default' : 'text'}>
            {langJSON[lang].headers}
          </Button>
        </div>
        <UpOutlined
          className={styles.icon}
          onClick={() => setOpen(!open)}
          rotate={open ? 180 : 0}
        />
      </div>
      <div style={{ display: setDisplay(open) }}>
        <Input.TextArea
          style={{ display: setDisplay(active) }}
          className={styles.option}
          onChange={(e) => setVariables(e.target.value)}
          placeholder={langJSON[lang].placeholderVariables}
        />
        <Input.TextArea
          style={{ display: setDisplay(!active) }}
          className={styles.option}
          onChange={(e) => setHeaders(e.target.value)}
          placeholder={langJSON[lang].placeholderHeaders}
        />
      </div>
    </div>
  );
};
