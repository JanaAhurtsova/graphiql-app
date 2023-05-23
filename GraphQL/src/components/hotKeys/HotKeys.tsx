import { useGetLocalization } from '@/hooks/reduxHooks';
import langJSON from 'assets/json/localization.json';
import styles from './HotKeys.module.scss';

export default function HotKeys() {
  const { lang } = useGetLocalization();

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{langJSON[lang].shortKeys}</th>
            <th>{langJSON[lang].functions}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>Shift + D</code>
            </td>
            <td>{langJSON[lang].openDoc}</td>
          </tr>
          <tr>
            <td>
              <code>Shift + H</code>
            </td>
            <td>{langJSON[lang].openHist}</td>
          </tr>
          <tr>
            <td>
              <code>Shift + O</code>
            </td>
            <td>{langJSON[lang].openTab}</td>
          </tr>
          <tr>
            <td>
              <code>Shift + C</code>
            </td>
            <td>{langJSON[lang].closeTab}</td>
          </tr>
          <tr>
            <td>
              <code>Shift + R</code>
            </td>
            <td>{langJSON[lang].sendReq}</td>
          </tr>
        </tbody>
      </table>
      <p className={styles.note}>{langJSON[lang].note}</p>
    </>
  );
}
