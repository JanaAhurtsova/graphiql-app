import { useState } from 'react';

import { useGetHistory } from 'hooks/reduxHooks';
import { IItemHistory } from '@/store/type';
import { HistoryItemGraph } from '../historyItemGraph/HistoryItemGraph';
import { THistoryGraphProps } from './type';

export default function HistoryGraph({ callback }: THistoryGraphProps): JSX.Element {
  const { list: historyList } = useGetHistory();
  const [activeHistory, setActiveHistory] = useState<IItemHistory | null>(null);

  const handleClick = (itemHistory: IItemHistory) => {
    setActiveHistory(itemHistory);
    callback(itemHistory);
  };

  return (
    <>
      {historyList.map((item, key) => (
        <HistoryItemGraph
          key={key}
          itemHistory={item}
          onClick={handleClick}
          isActive={item === activeHistory}
        />
      ))}
    </>
  );
}
