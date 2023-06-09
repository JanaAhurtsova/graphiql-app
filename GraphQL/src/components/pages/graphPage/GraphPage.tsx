import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Layout } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHotkeys } from 'react-hotkeys-hook';

import TabContent from 'components/tabContent/TabContent';
import { TargetKey } from './type';
import { ELocalization, IItemHistory } from '@/store/type';
import { auth } from '@/firebase/firebase';
import { ADD, KEY1, KEY2 } from 'managers/graphPage/enum';
import { Sidebar } from 'components/sidebar/Sidebar';
import { useGetLocalization } from '@/hooks/reduxHooks';
import { Loader } from '@/components/loader/Loader';
import langJSON from 'assets/json/localization.json';
import styles from './GraphPage.module.scss';

const initialItems = [
  { label: `${langJSON.en.tab} 1`, children: <TabContent />, key: KEY1, closable: false },
  { label: `${langJSON.en.tab} 2`, children: <TabContent />, key: KEY2 },
];

const GraphPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(3);
  const [user, loading] = useAuthState(auth);

  const addTab = () => {
    addNewTab();
  };

  const removeTab = () => {
    if (activeKey !== initialItems[0].key) {
      closeTab(activeKey);
    }
  };

  useHotkeys('shift+O', addTab);
  useHotkeys('shift+C', removeTab);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return navigate('/');
    }
  }, [user, loading, navigate]);

  const { lang } = useGetLocalization();
  const oldLang = ELocalization.en === lang ? ELocalization.ru : ELocalization.en;
  items.forEach((item) => {
    item.label = item.label.replace(langJSON[oldLang].tab, langJSON[lang].tab);
  });

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const addNewTab = (history?: IItemHistory) => {
    const newIndex = newTabIndex.current++;
    const newActiveKey = `newTab${newIndex}`;
    const newPanes = [...items];
    newPanes.push({
      label: `${langJSON[lang].tab} ${newIndex}`,
      children: <TabContent history={history} />,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const closeTab = (targetKey: TargetKey) => {
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
    if (action === ADD) {
      addNewTab();
    } else {
      closeTab(targetKey);
    }
  };

  return (
    <>
      {user ? (
        <Layout className="container">
          <Sidebar callback={addNewTab} />
          <Tabs
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            items={items}
            className={styles.tabs}
          />
        </Layout>
      ) : (
        <section className={styles.section_loader}>
          <Loader />
        </section>
      )}
    </>
  );
};

export default GraphPage;
