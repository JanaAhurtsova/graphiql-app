import { Layout } from 'antd';
import React from 'react';

import { Editor } from 'components/editor/Editor';
const { Content } = Layout;
import styles from './TabContent.module.scss';

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
