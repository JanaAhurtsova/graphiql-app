import { IItemHistory } from '@/store/type';

export type IItemHistoryProps = {
  itemHistory: IItemHistory;
  isActive: boolean;
  onClick: (history: IItemHistory) => void;
};
