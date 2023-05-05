import { FC } from 'react';
import RssLogo from 'assets/svg/rs_school_js.svg';
import GitHubLogo from 'assets/svg/github.svg';
import styles from './Footer.module.scss';
import { Col, Row } from 'antd';

export const AppFooter: FC = () => {
  return (
    <footer className={styles.footer}>
      <Row align="middle">
        <Col flex={1} span={8}>
          <a href="https://rs.school/react/">
            <img className={(styles.icon, styles.rs)} src={RssLogo} alt="RSS Logo" />
          </a>
        </Col>
        <Col flex={3} span={8}>
          <h3>©2023</h3>
        </Col>
        <Col flex={1} span={8}>
          <div className={styles.github}>
            <a href="https://github.com/JanaAhurtsova">
              <img title="Jana" className={styles.icon} src={GitHubLogo} alt="GitHub Logo" />
            </a>
            <a href="https://github.com/VladimirG91">
              <img title="Vladimir" className={styles.icon} src={GitHubLogo} alt="GitHub Logo" />
            </a>
            <a href="https://github.com/tuto4ki">
              <img title="Svetlana" className={styles.icon} src={GitHubLogo} alt="GitHub Logo" />
            </a>
          </div>
        </Col>
      </Row>
    </footer>
  );
};
