import {
  ClockCircleOutlined,
  SyncOutlined,
  ReadOutlined,
  SketchOutlined,
  SettingFilled,
} from '@ant-design/icons';
import { Button, Drawer, Layout, Menu, Modal, Slider } from 'antd';
import { useState } from 'react';

import { useLazyGetSchemaQuery } from 'store/api/Api';
import DocumentationGraph from '../documentationGraph/DocumentationGraph';
import { TSchemaTypesServer } from '../documentationGraph/type';
import { MenuItem } from './type';
import { Options } from 'managers/sidebar/Sidebar';
import { useChangeFontSize, useGetLocalization } from '@/hooks/reduxHooks';
import langJSON from 'assets/json/localization.json';

const { Sider } = Layout;

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [documentation, setDocumentation] = useState(false);
  const [history, setHistory] = useState(false);
  const [modalKeys, setModalKeys] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);

  const [sendRequest, { data: schemaResponse }] = useLazyGetSchemaQuery({});

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

  const { lang } = useGetLocalization();

  const handleSliderChange = useChangeFontSize();

  const setShowModal = (
    setFunc: React.Dispatch<React.SetStateAction<boolean>>,
    isShow: boolean
  ) => {
    setFunc(isShow);
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
            setShowModal(setDocumentation, true);
            break;
          case Options.HISTORY:
            setShowModal(setHistory, true);
            break;
          case Options.REFRESH:
            break;
          case Options.SHORT:
            setShowModal(setModalKeys, true);
            break;
          case Options.SETTINGS:
            setShowModal(setModalSettings, true);
            break;
        }
      },
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(langJSON[lang].documentation, Options.DOCUMENTATION, <ReadOutlined />),
    getItem(langJSON[lang].history, Options.HISTORY, <ClockCircleOutlined />),
    getItem(langJSON[lang].reFresh, Options.REFRESH, <SyncOutlined />),
    getItem(langJSON[lang].shortKeys, Options.SHORT, <SketchOutlined />),
    getItem(langJSON[lang].settings, Options.SETTINGS, <SettingFilled />),
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
        title={langJSON[lang].documentation}
        placement="right"
        closable={false}
        onClose={onClose}
        open={documentation}
      >
        <div>{schemaResponse ? showSchema() : ''}</div>
      </Drawer>
      <Drawer
        title={langJSON[lang].history}
        placement="right"
        closable={false}
        onClose={onClose}
        open={history}
      >
        <p>Content History</p>
      </Drawer>
      <Modal
        title={langJSON[lang].shortKeys}
        open={modalKeys}
        onOk={() => setShowModal(setModalKeys, false)}
        onCancel={() => setShowModal(setModalKeys, false)}
        footer={[
          <Button key="back" onClick={() => setShowModal(setModalKeys, false)}>
            {langJSON[lang].buttonCancel}
          </Button>,
          <Button key="ok" type="primary" onClick={() => setShowModal(setModalKeys, false)}>
            {langJSON[lang].buttonOk}
          </Button>,
        ]}
      >
        <p>Short key 1...</p>
        <p>Short key 2...</p>
      </Modal>
      <Modal
        title={langJSON[lang].settings}
        open={modalSettings}
        onOk={handleOkSettings}
        onCancel={handleCancelSettings}
        footer={[]}
      >
        <p>{langJSON[lang].fontSize}</p>
        <Slider min={14} max={24} defaultValue={14} onChange={handleSliderChange} />
      </Modal>
    </>
  );
};
