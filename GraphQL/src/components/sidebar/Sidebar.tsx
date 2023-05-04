import {
  ClockCircleOutlined,
  SyncOutlined,
  ReadOutlined,
  SketchOutlined,
  SettingFilled,
} from '@ant-design/icons';
import { Drawer, Layout, Menu, Modal } from 'antd';
import { useState } from 'react';
import { MenuItem } from './type';

const { Sider } = Layout;

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [documentation, setDocumentation] = useState(false);
  const [history, setHistory] = useState(false);
  const [modalKeys, setModalKeys] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);

  const showDocumentation = () => {
    setDocumentation(true);
  };

  const showHistory = () => {
    setHistory(true);
  };

  const showSettings = () => {
    setModalSettings(true);
  };

  const showKeys = () => {
    setModalKeys(true);
  };

  const handleOkKeys = () => {
    setModalKeys(false);
  };

  const handleCancelKeys = () => {
    setModalKeys(false);
  };

  const handleOkSettings = () => {
    setModalSettings(false);
  };

  const handleCancelSettings = () => {
    setModalSettings(false);
  };

  const onClose = () => {
    setDocumentation(false);
    setHistory(false);
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key,
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
          case '1':
            showDocumentation();
            break;
          case '2':
            showHistory();
            break;
          case '3':
            break;
          case '4':
            showKeys();
            break;
          case '5':
            showSettings();
            break;
        }
      },
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Documentation', '1', <ReadOutlined />),
    getItem('History', '2', <ClockCircleOutlined />),
    getItem('Re-fetch', '3', <SyncOutlined />),
    getItem('Short keys', '4', <SketchOutlined />),
    getItem('Settings', '5', <SettingFilled />),
  ];

  return (
    <>
      <Sider
        collapsible
        collapsedWidth={50}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Drawer
        title="Documentation"
        placement="right"
        closable={false}
        onClose={onClose}
        open={documentation}
      >
        <p>Content Documentation</p>
      </Drawer>
      <Drawer title="History" placement="right" closable={false} onClose={onClose} open={history}>
        <p>Content History</p>
      </Drawer>
      <Modal
        title="short-key modal"
        open={modalKeys}
        onOk={handleOkKeys}
        onCancel={handleCancelKeys}
      >
        <p>Short key 1...</p>
        <p>Short key 2...</p>
      </Modal>
      <Modal
        title="settings modal"
        open={modalSettings}
        onOk={handleOkSettings}
        onCancel={handleCancelSettings}
      >
        <p>Settings...</p>
      </Modal>
    </>
  );
};
