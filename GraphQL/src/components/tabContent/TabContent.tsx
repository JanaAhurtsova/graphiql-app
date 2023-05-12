import { Layout } from 'antd';
import React from 'react';
import styles from './TabContent.module.scss';
import { Editor } from 'components/editor/Editor';
const { Content } = Layout;

const TabContent: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <Editor />
      </Content>
    </Layout>
  );
};

export default TabContent;
