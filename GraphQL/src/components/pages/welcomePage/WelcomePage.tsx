import styles from './WelcomePage.module.scss';
import { CommonSection } from './commonSection/Common';
import { Team } from './team/Team';
import { Welcome } from './welcome/Welcome';

export default function WelcomePage() {
  return (
    <section className={styles.welcome}>
      <Welcome />
      <main className={styles.gallery}>
        <CommonSection />
        <Team />
      </main>
    </section>
  );
}
