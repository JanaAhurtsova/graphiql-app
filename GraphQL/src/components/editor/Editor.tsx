import { CaretRightFilled } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';
import { Button } from 'antd';
import styles from './Editor.module.scss';
import { HeadersVariables } from './headerVariables/HeadersVariables';
import { useGetSchemaQuery } from 'store/api/Api';
import { useState } from 'react';
import { Loader } from 'components/loader/Loader';
import { IQuery } from 'store/api/type';

export const Editor = () => {
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [value, setValue] = useState<IQuery>({ arg: '' });
  const { data, error, isLoading } = useGetSchemaQuery(value);

  const showResult = () => {
    if (variables) {
      setValue({ arg: query, variables: JSON.parse(variables), headers: headers });
    } else {
      setValue({ arg: query, headers: headers });
    }
  };

  return (
    <Row className={styles.row}>
      <Col className={styles.editor} xs={24} sm={24} md={12}>
        <Input.TextArea
          className={styles.request}
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
        {isLoading && <Loader />}
        {data && <pre className={styles.result}>{JSON.stringify(data, null, `\t`)}</pre>}
        {error && (
          <div className={styles.response}>
            Write your query or mutation and hit the Play Button to get a response here
          </div>
        )}
      </Col>
    </Row>
  );
};
