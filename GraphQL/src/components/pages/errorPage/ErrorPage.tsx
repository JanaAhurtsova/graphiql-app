import { ErrorIcon } from './404/404';
import styles from './ErrorPage.module.scss';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { Button } from 'antd';
import { useGetLocalization } from 'hooks/reduxHooks';
import localizationJSON from 'assets/json/localization.json';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const { lang } = useGetLocalization();
  const navigate = useNavigate();

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <ErrorIcon className={styles.image} />
        <div className={styles.content}>
          <Title level={2} className={styles.title}>
            {localizationJSON[lang].errorTitle}
          </Title>
          <Paragraph className={styles.description}>
            {localizationJSON[lang].errorDescription}
          </Paragraph>
          <Button onClick={() => navigate('/')} type="primary">
            {localizationJSON[lang].errorButton}
          </Button>
        </div>
      </div>
    </section>
  );
}
