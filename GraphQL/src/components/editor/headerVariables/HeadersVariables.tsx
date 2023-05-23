import { Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { ISetState } from './type';
import styles from './HeadersVariables.module.scss';
import langJSON from 'assets/json/localization.json';
import { UpOutlined } from '@ant-design/icons';
import { useSetFontSize, useGetLocalization } from 'hooks/reduxHooks';

export const HeadersVariables = ({
  setVariables,
  setHeaders,
  variablesValue,
  headersValue,
}: ISetState) => {
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

  const fontSize = useSetFontSize();
  const [fontStyle, setFontStyle] = useState(fontSize);

  useEffect(() => {
    setFontStyle(fontSize);
  }, [fontSize]);

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
          style={{ display: setDisplay(active), fontSize: `${fontStyle}px` }}
          className={styles.option}
          onChange={(e) => setVariables(e.target.value)}
          placeholder={langJSON[lang].placeholderVariables}
          value={variablesValue}
        />
        <Input.TextArea
          style={{ display: setDisplay(!active), fontSize: `${fontStyle}px` }}
          className={styles.option}
          onChange={(e) => setHeaders(e.target.value)}
          placeholder={langJSON[lang].placeholderHeaders}
          value={headersValue}
        />
      </div>
    </div>
  );
};
