import { CaretRightFilled } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';
import { Button } from 'antd';
import styles from './Editor.module.scss';
import { HeadersVariables } from './headerVariables/HeadersVariables';
import { useGetResponseQuery } from 'store/api/Api';
import { useState } from 'react';
import { Loader } from 'components/loader/Loader';
import { IQuery } from 'store/api/type';

export const Editor = () => {
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [value, setValue] = useState<IQuery>({ arg: query, variables: {} });
  const { data: response, error, isFetching } = useGetResponseQuery(value);

  const showResult = () => {
    if (variables && headers) {
      setValue({ arg: query, variables: JSON.parse(variables), headers: JSON.parse(headers) });
    } else if (variables && !headers) {
      setValue({ arg: query, variables: variables });
    } else if (!variables && headers) {
      setValue({ arg: query, variables: {}, headers: JSON.parse(headers) });
    } else {
      setValue({ arg: query, variables: {} });
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
        {isFetching && <Loader />}
        {/* {response && <pre className={styles.result}>{JSON.stringify(response, null, `\t`)}</pre>} */}
        {error ? (
          <pre className={styles.result}>{JSON.stringify(error, null, '\t')}</pre>
        ) : (
          <pre className={styles.result}>{JSON.stringify(response, null, `\t`)}</pre>
        )}
      </Col>
    </Row>
  );
};
