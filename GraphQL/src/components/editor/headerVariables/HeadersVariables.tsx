import { Input, Tabs } from 'antd';
import { useState } from 'react';
import type { TabsProps } from 'antd';
import { Names } from 'managers/headerVariables/enum';

const items: TabsProps['items'] = [
  {
    label: Names.VARIABLES,
    children: (
      <Input.TextArea style={{ height: '20vh', resize: 'none' }} placeholder="# Enter variables" />
    ),
    key: Names.VARIABLES,
  },
  {
    label: Names.HEADERS,
    children: (
      <Input.TextArea style={{ height: '20vh', resize: 'none' }} placeholder="# Enter headers" />
    ),
    key: Names.HEADERS,
  },
];

export const HeadersVariables = () => {
  const [activeKey, setActiveKey] = useState(items[0].key);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      style={{ height: '30%' }}
      activeKey={activeKey}
      items={items}
      onChange={onChange}
    />
  );
};
