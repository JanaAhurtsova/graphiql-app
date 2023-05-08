import { CaretRightFilled } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';
import { Button } from 'antd';
import styles from './Editor.module.scss';
import { HeadersVariables } from './headerVariables/HeadersVariables';
import { useGetSchemaQuery } from 'store/api/Api';
import { useState } from 'react';

export const Editor = () => {
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('');
  const { data } = useGetSchemaQuery(value);

  const showResult = () => {
    setValue(query);
  };

  return (
    <Row style={{ height: '100%' }}>
      <Col className={styles.editor} xs={24} sm={24} md={12}>
        <Input.TextArea
          defaultValue={'query { \n }'}
          onChange={(e) => setQuery(e.target.value)}
          style={{ height: 'calc(79.5vh - 224px)', resize: 'none', paddingRight: '2.3rem' }}
          placeholder="# Write your query or mutation here"
        />
        <HeadersVariables />
        <Button
          onClick={showResult}
          className={styles.play}
          shape="circle"
          icon={<CaretRightFilled />}
          type="primary"
        />
      </Col>
      <Col xs={24} sm={24} md={12}>
        {data ? (
          <div className={styles.response}>{JSON.stringify(data, null, '\n')}</div>
        ) : (
          <div className={styles.response}>Hit the Play Button to get a response here</div>
        )}
      </Col>
    </Row>
  );
};
