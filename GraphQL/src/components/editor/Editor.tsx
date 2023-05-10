import { CaretRightFilled } from '@ant-design/icons';
import { Col, Input, Row, Button } from 'antd';

import { HeadersVariables } from './headerVariables/HeadersVariables';
import { useGetLocalization } from '@/hooks/reduxHooks';
import langJSON from 'assets/json/localization.json';
import styles from './Editor.module.scss';

export const Editor = () => {
  const { lang } = useGetLocalization();

  return (
    <Row style={{ height: '100%' }}>
      <Col className={styles.editor} xs={24} sm={24} md={12}>
        <Input.TextArea
          style={{ height: 'calc(79.5vh - 224px)', resize: 'none', paddingRight: '2.3rem' }}
          placeholder={langJSON[lang].placeholderQuery}
        />
        <HeadersVariables />
        <Button className={styles.play} shape="circle" icon={<CaretRightFilled />} type="primary" />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <div className={styles.response}>{langJSON[lang].placeholderResponse}</div>
      </Col>
    </Row>
  );
};
