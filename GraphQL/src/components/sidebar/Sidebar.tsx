import {
  ClockCircleOutlined,
  SyncOutlined,
  ReadOutlined,
  SketchOutlined,
  SettingFilled,
} from '@ant-design/icons';
import { Drawer, Layout, Menu, Modal } from 'antd';
import { useState } from 'react';

import { useGetSchemaQuery } from 'store/api/Api';
import { MenuItem } from './type';
import { Options } from 'managers/sidebar/Sidebar';
import DocumentationGraph from '../documentationGraph/DocumentationGraph';
import { TSchemaTypesServer } from '../documentationGraph/type';

const { Sider } = Layout;

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [documentation, setDocumentation] = useState(false);
  const [history, setHistory] = useState(false);
  const [modalKeys, setModalKeys] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);

  const { data: schemaResponse } = useGetSchemaQuery({});

  const getType = (type: string) => {
    return schemaResponse.data.__schema.types.find(
      (value: TSchemaTypesServer) => value.name === type
    );
  };

  const showSchema = () => {
    const schemaData = getType(schemaResponse.data.__schema.queryType.name);
    if (schemaData) {
      return <DocumentationGraph schema={schemaResponse.data.__schema} />;
    }
    return <></>;
  };

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
          case Options.DOCUMENTATION:
            showDocumentation();
            break;
          case Options.HISTORY:
            showHistory();
            break;
          case Options.REFRESH:
            break;
          case Options.SHORT:
            showKeys();
            break;
          case Options.SETTINGS:
            showSettings();
            break;
        }
      },
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(Options.DOCUMENTATION, Options.DOCUMENTATION, <ReadOutlined />),
    getItem(Options.HISTORY, Options.HISTORY, <ClockCircleOutlined />),
    getItem(Options.REFRESH, Options.REFRESH, <SyncOutlined />),
    getItem(Options.SHORT, Options.SHORT, <SketchOutlined />),
    getItem(Options.SETTINGS, Options.SETTINGS, <SettingFilled />),
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
        title={Options.DOCUMENTATION}
        placement="right"
        closable={false}
        onClose={onClose}
        open={documentation}
      >
        <div>{schemaResponse ? showSchema() : ''}</div>
      </Drawer>
      <Drawer
        title={Options.HISTORY}
        placement="right"
        closable={false}
        onClose={onClose}
        open={history}
      >
        <p>Content History</p>
      </Drawer>
      <Modal title={Options.SHORT} open={modalKeys} onOk={handleOkKeys} onCancel={handleCancelKeys}>
        <p>Short key 1...</p>
        <p>Short key 2...</p>
      </Modal>
      <Modal
        title={Options.SETTINGS}
        open={modalSettings}
        onOk={handleOkSettings}
        onCancel={handleCancelSettings}
      >
        <p>Settings...</p>
      </Modal>
    </>
  );
};
