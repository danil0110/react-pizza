import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/filtersSlice';
import cart from './slices/cartSlice';

const store = configureStore({
  reducer: { filters, cart },
  devTools: process.env.NODE_ENV === 'development'
});

export default store;
