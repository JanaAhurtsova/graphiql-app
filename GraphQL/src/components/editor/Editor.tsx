import { CaretRightFilled } from '@ant-design/icons';
import { Col, Input, Row, Modal, Button } from 'antd';
import styles from './Editor.module.scss';
import { HeadersVariables } from './headerVariables/HeadersVariables';
import { useLazyGetResponseQuery } from 'store/api/Api';
import { useEffect, useState } from 'react';
import { Loader } from 'components/loader/Loader';
import { useGetLocalization } from 'hooks/reduxHooks';
import langJSON from 'assets/json/localization.json';
import { useAppSelector } from '@/hooks/reduxHooks';

export const Editor = () => {
  const { lang } = useGetLocalization();
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [sendRequest, { data: response, error, isFetching }] = useLazyGetResponseQuery();
  const fontSize = useAppSelector((state) => state.font.fontSize);

  const [fontStyle, setFontStyle] = useState(fontSize);

  useEffect(() => {
    setFontStyle(fontSize);
  }, [fontSize]);

  const showResult = () => {
    try {
      if (variables && headers) {
        sendRequest({
          query: query,
          variables: JSON.parse(variables),
          headers: JSON.parse(headers),
        });
      } else if (variables && !headers) {
        sendRequest({ query: query, variables: JSON.parse(variables) });
      } else if (!variables && headers) {
        sendRequest({
          query: query,
          variables: {},
          headers: JSON.parse(headers),
        });
      } else {
        sendRequest({ query: query, variables: {} });
      }
    } catch (e) {
      setIsOpen(true);
    }
  };

  return (
    <Row className={styles.row}>
      <Col className={styles.editor} xs={24} sm={24} md={12}>
        <Input.TextArea
          style={{ fontSize: `${fontStyle}px` }}
          className={styles.request}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={langJSON[lang].placeholderQuery}
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
      <Col
        className={styles.response}
        xs={24}
        sm={24}
        md={12}
        style={{ fontSize: `${fontStyle}px` }}
      >
        {isFetching && <Loader />}
        {error && <pre className={styles.result}>{JSON.stringify(error, null, '\t')}</pre>}
        {response && !error && (
          <pre className={styles.result}>{JSON.stringify(response, null, `\t`)}</pre>
        )}
        {!isFetching && !response && !error && (
          <div className={styles.response}>{langJSON[lang].placeholderResponse}</div>
        )}
      </Col>
      <Modal
        open={isOpen}
        footer={
          <Button key="ok" type="primary" onClick={() => setIsOpen(false)}>
            OK
          </Button>
        }
        onCancel={() => setIsOpen(false)}
        title={langJSON[lang].error}
      >
        {langJSON[lang].errorMessage}
      </Modal>
    </Row>
  );
};
