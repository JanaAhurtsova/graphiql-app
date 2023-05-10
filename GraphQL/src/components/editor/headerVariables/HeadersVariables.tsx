import { Input, Tabs } from 'antd';
import { useState } from 'react';
import type { TabsProps } from 'antd';
import { Names } from 'managers/headerVariables/enum';

import langJSON from 'assets/json/localization.json';
import { useGetLocalization } from '@/hooks/reduxHooks';

export const HeadersVariables = () => {
  const { lang } = useGetLocalization();

  const items: TabsProps['items'] = [
    {
      label: langJSON[lang].variables,
      children: (
        <Input.TextArea
          style={{ height: '20vh', resize: 'none' }}
          placeholder={langJSON[lang].placeholderVariables}
        />
      ),
      key: Names.VARIABLES,
    },
    {
      label: langJSON[lang].headers,
      children: (
        <Input.TextArea
          style={{ height: '20vh', resize: 'none' }}
          placeholder={langJSON[lang].placeholderHeaders}
        />
      ),
      key: Names.HEADERS,
    },
  ];

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
