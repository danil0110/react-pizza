import { configureStore } from '@reduxjs/toolkit';
import filters from './filtersSlice';

const store = configureStore({
  reducer: { filters },
  devTools: process.env.NODE_ENV === 'development'
});

export default store;
