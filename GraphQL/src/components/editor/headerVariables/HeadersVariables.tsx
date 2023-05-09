import { Input, Tabs } from 'antd';
import { useState } from 'react';
import { VARIABLES, HEADERS } from 'managers/headerVariables/Names';
import { ISetState } from './type';

export const HeadersVariables = ({ setVariables, setHeaders }: ISetState) => {
  const [activeKey, setActiveKey] = useState(VARIABLES);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      style={{ height: '30%' }}
      activeKey={activeKey}
      items={[
        {
          label: VARIABLES,
          children: (
            <Input.TextArea
              onChange={(e) => setVariables(e.target.value)}
              style={{ height: '20vh', resize: 'none' }}
              placeholder="# Enter variables"
            />
          ),
          key: VARIABLES,
        },
        {
          label: HEADERS,
          children: (
            <Input.TextArea
              onChange={(e) => setHeaders(e.target.value)}
              style={{ height: '20vh', resize: 'none' }}
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
