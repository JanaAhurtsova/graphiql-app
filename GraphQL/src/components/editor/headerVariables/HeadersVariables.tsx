import { Input, Tabs } from 'antd';
import { useState } from 'react';
import { VARIABLES, HEADERS } from 'managers/headerVariables/Names';
import { ISetState } from './type';
import styles from './HeadersVariables.module.scss';
import langJSON from 'assets/json/localization.json';
import { useGetLocalization } from 'hooks/reduxHooks';

export const HeadersVariables = ({ setVariables, setHeaders }: ISetState) => {
  const [activeKey, setActiveKey] = useState(VARIABLES);
  const { lang } = useGetLocalization();

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  return (
    <Tabs
      defaultActiveKey={VARIABLES}
      activeKey={activeKey}
      items={[
        {
          label: langJSON[lang].variables,
          children: (
            <Input.TextArea
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
