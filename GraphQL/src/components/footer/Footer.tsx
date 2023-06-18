import { FC } from 'react';
import RssLogo from 'assets/svg/rs_school_js.svg';
import GitHubLogo from 'assets/svg/github.svg';
import styles from './Footer.module.scss';

const currentYear = new Date().getFullYear();

export const AppFooter: FC = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://rs.school/react/">
        <img className={(styles.icon, styles.rs)} src={RssLogo} alt="RSS Logo" />
      </a>
      <h3 className={styles.h}>©{currentYear}</h3>
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
    </footer>
  );
};
