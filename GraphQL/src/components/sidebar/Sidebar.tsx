import {
  ClockCircleOutlined,
  ReadOutlined,
  SketchOutlined,
  SettingFilled,
} from '@ant-design/icons';
import { Drawer, Layout, Menu, Modal, Slider } from 'antd';
import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import DocumentationGraph from '../documentationGraph/DocumentationGraph';
import { TSchemaTypesServer } from '../documentationGraph/type';
import { MenuItem } from './type';
import { Options } from 'managers/sidebar/Sidebar';
import {
  useGetDocumentationGraph,
  useGetLocalization,
  useChangeFontSize,
} from '@/hooks/reduxHooks';
import langJSON from 'assets/json/localization.json';
import styles from './Sidebar.module.scss';

const { Sider } = Layout;

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [documentation, setDocumentation] = useState(false);
  const [history, setHistory] = useState(false);
  const [modalKeys, setModalKeys] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);

  const { doc: schemaResponse } = useGetDocumentationGraph();

  const getType = (type: string) => {
    if (schemaResponse !== null) {
      return schemaResponse?.types.find((value: TSchemaTypesServer) => value.name === type);
    }
  };

  const showSchema = () => {
    if (schemaResponse !== null) {
      const schemaData = getType(schemaResponse?.queryType?.name);
      if (schemaData) {
        return <DocumentationGraph schema={schemaResponse} />;
      }
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
          case Options.SHORT:
            setShowModal(setModalKeys, true);
            break;
          case Options.SETTINGS:
            setShowModal(setModalSettings, true);
            break;
        }
      },
      disabled: key === Options.DOCUMENTATION && !schemaResponse.types.length ? true : false,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(langJSON[lang].documentation, Options.DOCUMENTATION, <ReadOutlined />),
    getItem(langJSON[lang].history, Options.HISTORY, <ClockCircleOutlined />),
    getItem(langJSON[lang].shortKeys, Options.SHORT, <SketchOutlined />),
    getItem(langJSON[lang].settings, Options.SETTINGS, <SettingFilled />),
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
        <div>{schemaResponse ? showSchema() : ''}</div>
      </Drawer>
      <Drawer
        title={langJSON[lang].history}
        placement="right"
        closable={true}
        onClose={onClose}
        open={history}
        className={styles.drawer}
      >
        <p>Content History</p>
      </Drawer>
      <Modal
        title={langJSON[lang].shortKeys}
        open={modalKeys}
        onOk={() => setShowModal(setModalKeys, false)}
        onCancel={() => setShowModal(setModalKeys, false)}
        footer={[]}
      >
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{langJSON[lang].shortKeys}</th>
              <th>{langJSON[lang].functions}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>Shift + D</code>
              </td>
              <td>{langJSON[lang].openDoc}</td>
            </tr>
            <tr>
              <td>
                <code>Shift + H</code>
              </td>
              <td>{langJSON[lang].openHist}</td>
            </tr>
            <tr>
              <td>
                <code>Shift + O</code>
              </td>
              <td>{langJSON[lang].openTab}</td>
            </tr>
            <tr>
              <td>
                <code>Shift + C</code>
              </td>
              <td>{langJSON[lang].closeTab}</td>
            </tr>
            <tr>
              <td>
                <code>Shift + R</code>
              </td>
              <td>{langJSON[lang].sendReq}</td>
            </tr>
          </tbody>
        </table>
        <p className={styles.note}>{langJSON[lang].note}</p>
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
