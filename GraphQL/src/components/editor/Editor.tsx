import { CaretRightFilled } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';
import { Button } from 'antd';
import styles from './Editor.module.scss';
import { HeadersVariables } from './headerVariables/HeadersVariables';
import { useGetSchemaQuery } from 'store/api/Api';
import { useState } from 'react';

export const Editor = () => {
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [value, setValue] = useState({ arg: '', variables: {}, headers: '' });
  const { data } = useGetSchemaQuery(value);

  const showResult = () => {
    setValue({ arg: query, variables: JSON.parse(variables), headers: headers });
  };

  return (
    <Row style={{ height: '100%' }}>
      <Col className={styles.editor} xs={24} sm={24} md={12}>
        <Input.TextArea
          className={styles.request}
          defaultValue={'query { \n }'}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="# Write your query or mutation here"
        />
        <HeadersVariables setVariables={setVariables} setHeaders={setHeaders} />
        <Button
          onClick={showResult}
          className={styles.play}
          shape="circle"
          icon={<CaretRightFilled />}
          type="primary"
        />
      </Col>
      <Col className={styles.response} xs={24} sm={24} md={12}>
        {data ? (
          <pre className={styles.result}>{JSON.stringify(data, null, `\t`)}</pre>
        ) : (
          <div className={styles.response}>Hit the Play Button to get a response here</div>
        )}
      </Col>
    </Row>
  );
};
