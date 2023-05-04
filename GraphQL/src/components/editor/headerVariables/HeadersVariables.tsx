import { Input, Tabs } from 'antd';
import { useState } from 'react';
import type { TabsProps } from 'antd';

const items: TabsProps['items'] = [
  {
    label: 'Variables',
    children: (
      <Input.TextArea style={{ height: '20vh', resize: 'none' }} placeholder="# Enter variables" />
    ),
    key: '1',
  },
  {
    label: 'Headers',
    children: (
      <Input.TextArea style={{ height: '20vh', resize: 'none' }} placeholder="# Enter headers" />
    ),
    key: '2',
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
