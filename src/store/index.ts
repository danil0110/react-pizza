import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/filtersSlice';
import cart from './slices/cartSlice';
import pizzas from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: { pizzas, filters, cart },
  devTools: process.env.NODE_ENV === 'development'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
