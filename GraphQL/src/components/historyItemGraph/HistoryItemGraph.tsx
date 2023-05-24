import styles from './HistoryItemGraph.module.scss';
import { IItemHistoryProps } from './type';

export function HistoryItemGraph({ itemHistory, isActive, onClick }: IItemHistoryProps) {
  return (
    <p
      className={`${styles.no_active} ${isActive ? styles.active : ''}`}
      onClick={() => !isActive && onClick(itemHistory)}
    >
      <span className={styles.history_item}>{itemHistory.query}</span>
    </p>
  );
}
