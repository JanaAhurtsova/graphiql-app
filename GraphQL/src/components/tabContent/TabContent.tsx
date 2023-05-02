import {
  ClockCircleOutlined,
  SyncOutlined,
  ReadOutlined,
  SketchOutlined,
  SettingFilled,
} from '@ant-design/icons';
import { Col, ConfigProvider, Drawer, Input, MenuProps, Modal, Row } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import styles from './TabContent.module.scss';
const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const TabContent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [documentation, setDocumentation] = useState(false);
  const [history, setHistory] = useState(false);
  const [modalKeys, setModalKeys] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);

  const showKeys = () => {
    setModalKeys(true);
  };

  const handleOkKeys = () => {
    setModalKeys(false);
  };

  const handleCancelKeys = () => {
    setModalKeys(false);
  };
  const showSettings = () => {
    setModalSettings(true);
  };

  const handleOkSettings = () => {
    setModalSettings(false);
  };

  const handleCancelSettings = () => {
    setModalSettings(false);
  };

  const showDocumentation = () => {
    setDocumentation(true);
  };
  const showHistory = () => {
    setHistory(true);
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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <Layout className="layout" style={{ minHeight: '80vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="layout">
          <Content className={styles.content}>
            <Row style={{ height: '70%' }}>
              <Col span={12}>
                <Input.TextArea
                  className="layout-background"
                  style={{ height: '100%', resize: 'none' }}
                  placeholder="# Write your query or mutation here"
                />
              </Col>
              <Col span={12}>
                <div className="layout-background" style={{ height: '100%' }}>
                  Hit the Play Button to get a response here
                </div>
              </Col>
            </Row>
            <Input.TextArea
              className="layout-background"
              style={{ height: '30%' }}
              placeholder="Second part"
            />
          </Content>
        </Layout>
      </Layout>

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
    </ConfigProvider>
  );
};

export default TabContent;
