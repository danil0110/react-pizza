import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategoryId: 0,
  sort: {
    property: 'rating',
    order: 'desc'
  },
  currentPage: 1
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.activeCategoryId = action.payload;
    },
    setSortProperty(state, action) {
      state.sort.property = action.payload;
    },
    setSortOrder(state, action) {
      state.sort.order = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  }
});

export const { setCategory, setSortProperty, setSortOrder, setCurrentPage } = filtersSlice.actions;

export default filtersSlice.reducer;
