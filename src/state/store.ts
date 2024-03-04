import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import first, { insertCellAfter } from './slice';

export const store = configureStore({
  reducer: { first },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

store.dispatch(insertCellAfter({ id: null, type: 'code' }));
store.dispatch(insertCellAfter({ id: null, type: 'text' }));
