import { MenuProps } from 'antd';

import { IItemHistory } from '@/store/type';

export type MenuItem = Required<MenuProps>['items'][number];

export type TSidebarProps = {
  callback: (history: IItemHistory) => void;
};
