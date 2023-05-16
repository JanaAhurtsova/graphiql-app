import { Input, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { VARIABLES, HEADERS } from 'managers/headerVariables/Names';
import { ISetState } from './type';
import styles from './HeadersVariables.module.scss';
import langJSON from 'assets/json/localization.json';
import { useAppSelector, useGetLocalization } from 'hooks/reduxHooks';

export const HeadersVariables = ({ setVariables, setHeaders }: ISetState) => {
  const [activeKey, setActiveKey] = useState(VARIABLES);
  const { lang } = useGetLocalization();

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const fontSize = useAppSelector((state) => state.font.fontSize);
  const [fontStyle, setFontStyle] = useState(fontSize);

  useEffect(() => {
    setFontStyle(fontSize);
  }, [fontSize]);

  return (
    <Tabs
      defaultActiveKey={VARIABLES}
      activeKey={activeKey}
      items={[
        {
          label: langJSON[lang].variables,
          children: (
            <Input.TextArea
              style={{ fontSize: `${fontStyle}px` }}
              className={styles.option}
              onChange={(e) => setVariables(e.target.value)}
              placeholder={langJSON[lang].placeholderVariables}
            />
          ),
          key: VARIABLES,
        },
        {
          label: langJSON[lang].headers,
          children: (
            <Input.TextArea
              style={{ fontSize: `${fontStyle}px` }}
              className={styles.option}
              onChange={(e) => setHeaders(e.target.value)}
              placeholder={langJSON[lang].placeholderHeaders}
            />
          ),
          key: HEADERS,
        },
      ]}
      onChange={onChange}
    />
  );
};
