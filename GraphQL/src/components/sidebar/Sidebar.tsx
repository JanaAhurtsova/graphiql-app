import {
  ClockCircleOutlined,
  ReadOutlined,
  SketchOutlined,
  SettingFilled,
} from '@ant-design/icons';
import { Drawer, Layout, Menu, Modal, Slider } from 'antd';
import { Suspense, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import DocumentationGraph from '../documentationGraph/DocumentationGraph';
import { MenuItem, TSidebarProps } from './type';
import { Options } from 'managers/sidebar/Sidebar';
import {
  useGetDocumentationGraph,
  useGetLocalization,
  useChangeFontSize,
} from '@/hooks/reduxHooks';
import { Loader } from '../loader/Loader';
import HistoryGraph from '../historyGraph/HistoryGraph';
import HotKeys from '../hotKeys/HotKeys';
import langJSON from 'assets/json/localization.json';
import styles from './Sidebar.module.scss';
const { Sider } = Layout;

export const Sidebar = ({ callback }: TSidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const [documentation, setDocumentation] = useState(false);
  const [history, setHistory] = useState(false);
  const [modalKeys, setModalKeys] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);

  const { doc: schemaResponse } = useGetDocumentationGraph();
  const { lang } = useGetLocalization();

  const handleSliderChange = useChangeFontSize();

  const onClose = () => {
    setDocumentation(false);
    setHistory(false);
  };

  const openDocumentationDrawer = () => {
    if (schemaResponse.types.length) {
      setDocumentation(!documentation);
    }
  };

  const openHistoryDrawer = () => {
    setHistory(!history);
  };

  // Определяем горячие клавиши
  useHotkeys('shift+d', openDocumentationDrawer);
  useHotkeys('shift+h', openHistoryDrawer);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    disabled: boolean,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      onClick: () => {
        switch (key) {
          case Options.DOCUMENTATION:
            setDocumentation(true);
            break;
          case Options.HISTORY:
            setHistory(true);
            break;
          case Options.SHORT:
            setModalKeys(true);
            break;
          case Options.SETTINGS:
            setModalSettings(true);
            break;
        }
      },
      disabled: disabled,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      langJSON[lang].documentation,
      Options.DOCUMENTATION,
      !schemaResponse.types.length ? true : false,
      <ReadOutlined />
    ),
    getItem(langJSON[lang].history, Options.HISTORY, false, <ClockCircleOutlined />),
    getItem(langJSON[lang].shortKeys, Options.SHORT, false, <SketchOutlined />),
    getItem(langJSON[lang].settings, Options.SETTINGS, false, <SettingFilled />),
  ];

  return (
    <>
      <Sider
        className={styles.sidebar}
        collapsible
        collapsedWidth={50}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Drawer
        title={langJSON[lang].documentation}
        placement="right"
        closable={true}
        onClose={onClose}
        open={documentation}
        className={styles.drawer}
      >
        <Suspense fallback={<Loader />}>
          <DocumentationGraph schema={schemaResponse} />
        </Suspense>
      </Drawer>
      <Drawer
        title={langJSON[lang].history}
        placement="right"
        closable={true}
        onClose={onClose}
        open={history}
        className={styles.drawer}
      >
        <HistoryGraph callback={callback} isOpen={history} />
      </Drawer>
      <Modal
        title={langJSON[lang].shortKeys}
        open={modalKeys}
        onCancel={() => setModalKeys(false)}
        footer={[]}
      >
        <HotKeys />
      </Modal>
      <Modal
        title={langJSON[lang].settings}
        open={modalSettings}
        onCancel={() => setModalSettings(false)}
        footer={[]}
      >
        <p>{langJSON[lang].fontSize}</p>
        <Slider min={14} max={24} defaultValue={14} onChange={handleSliderChange} />
      </Modal>
    </>
  );
};
