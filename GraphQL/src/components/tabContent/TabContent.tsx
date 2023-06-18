import { Layout } from 'antd';
import React from 'react';

import { Editor } from 'components/editor/Editor';
import { IItemHistory } from '@/store/type';
const { Content } = Layout;
import styles from './TabContent.module.scss';

type TTypeContextProps = {
  history?: IItemHistory;
};

function TabContent({ history }: TTypeContextProps): JSX.Element {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <Editor history={history} />
      </Content>
    </Layout>
  );
}

export default TabContent;
