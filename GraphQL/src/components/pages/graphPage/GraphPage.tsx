import React, { useEffect, useRef, useState } from 'react';
import { Tabs, Layout } from 'antd';

import TabContent from 'components/tabContent/TabContent';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { TargetKey } from './type';

const initialItems = [
  { label: 'Tab 1', children: <TabContent />, key: '1', closable: false },
  { label: 'Tab 2', children: <TabContent />, key: '2' },
  { label: 'Tab 3', children: <TabContent />, key: '3' },
];

const GraphPage: React.FC = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate('/404');
  //   }
  // }, [isAuth, navigate]);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({ label: 'New Tab', children: <TabContent />, key: newActiveKey });
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
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
      />
    </Layout>
  );
};

export default GraphPage;
