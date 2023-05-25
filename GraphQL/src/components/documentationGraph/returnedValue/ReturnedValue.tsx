import { TReturnedValueProps } from '../type';
import styles from '../DocumentationGraph.module.scss';
import { EXCLAMATION_POINT, LIST, NON_NULL } from 'managers/documentation/documentation';

export function ReturnedValue({ type, setQueryType }: TReturnedValueProps): JSX.Element {
  let typeReturned: string = type?.name;
  type?.kind
    .split(',')
    .reverse()
    .map((value) => {
      if (value === NON_NULL) {
        typeReturned += EXCLAMATION_POINT;
      } else if (value === LIST) {
        typeReturned = `[${typeReturned}]`;
      }
    });
  return (
    <span
      className={`${styles.brown_text} ${styles.link_documentation}`}
      onClick={() => setQueryType(type.name)}
    >
      {typeReturned}
    </span>
  );
}
