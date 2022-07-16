import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
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
    },
    setFilters(state, action) {
      state.activeCategoryId = action.payload.activeCategoryId;
      state.currentPage = action.payload.currentPage;
      state.sort = action.payload.sort;
    }
  }
});

export const { setCategory, setSortProperty, setSortOrder, setCurrentPage, setFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
