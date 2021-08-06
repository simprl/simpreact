import { useContext } from 'react';
import { StoreContext, AppStoreType } from './Context';

export const useAppStore = (): AppStoreType => useContext(StoreContext);
