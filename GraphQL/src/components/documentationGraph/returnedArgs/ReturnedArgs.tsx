import { TReturnedArgsProps } from '../type';
import { ReturnedValue } from '../returnedValue/ReturnedValue';
import styles from '../DocumentationGraph.module.scss';

export function ReturnedArgs({ args, setQueryType }: TReturnedArgsProps): JSX.Element {
  let argsStr = <></>;
  if (!args?.length) {
    return argsStr;
  }
  for (let i = 0; i < args.length; i++) {
    argsStr = (
      <>
        {argsStr}
        {i ? ', ' : ''}
        <span className={styles.red_text}>{args[i]?.name}</span>:{' '}
        <ReturnedValue type={args[i].type} setQueryType={setQueryType} />
      </>
    );
  }
  return <>({argsStr})</>;
}
