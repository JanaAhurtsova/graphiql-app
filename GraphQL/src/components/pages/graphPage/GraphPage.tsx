import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Layout } from 'antd';

import TabContent from 'components/tabContent/TabContent';
import { useAuth } from 'hooks/useAuth';
import { TargetKey } from './type';
import { KEY1, KEY2 } from 'managers/graphPage/enum';
import { Sidebar } from 'components/sidebar/Sidebar';
import { useGetLocalization } from '@/hooks/reduxHooks';
import langJSON from 'assets/json/localization.json';
import { ELocalization } from '@/store/type';

const initialItems = [
  { label: `${langJSON.en.tab} 1`, children: <TabContent />, key: KEY1, closable: false },
  { label: `${langJSON.en.tab} 2`, children: <TabContent />, key: KEY2 },
];

const GraphPage: React.FC = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(3);

  useEffect(() => {
    if (!isAuth) {
      navigate('/404');
    }
  }, [isAuth, navigate]);

  const { lang } = useGetLocalization();
  const oldLang = ELocalization.en === lang ? ELocalization.ru : ELocalization.en;
  items.forEach((item) => {
    item.label = item.label.replace(langJSON[oldLang].tab, langJSON[lang].tab);
  });

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newIndex = newTabIndex.current++;
    const newActiveKey = `newTab${newIndex}`;
    const newPanes = [...items];
    newPanes.push({
      label: `${langJSON[lang].tab} ${newIndex}`,
      children: <TabContent />,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove'
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Layout className="container">
      <Sidebar />
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
        style={{ flex: 'auto' }}
      />
    </Layout>
  );
};

export default GraphPage;
