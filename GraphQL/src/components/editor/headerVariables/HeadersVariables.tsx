import { Input, Tabs } from 'antd';
import { useState } from 'react';
import { VARIABLES, HEADERS } from 'managers/headerVariables/Names';
import { ISetState } from './type';
import styles from './HeadersVariables.module.scss';

export const HeadersVariables = ({ setVariables, setHeaders }: ISetState) => {
  const [activeKey, setActiveKey] = useState(VARIABLES);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  return (
    <Tabs
      defaultActiveKey={VARIABLES}
      className={styles.tab}
      activeKey={activeKey}
      items={[
        {
          label: VARIABLES,
          children: (
            <Input.TextArea
              className={styles.option}
              onChange={(e) => setVariables(e.target.value)}
              placeholder="# Enter variables"
            />
          ),
          key: VARIABLES,
        },
        {
          label: HEADERS,
          children: (
            <Input.TextArea
              className={styles.option}
              onChange={(e) => setHeaders(e.target.value)}
              placeholder="# Enter headers"
            />
          ),
          key: HEADERS,
        },
      ]}
      onChange={onChange}
    />
  );
};
