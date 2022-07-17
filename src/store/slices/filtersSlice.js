import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  searchValue: '',
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
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
      state.sort.property = action.payload.sort.property;
      state.sort.order = action.payload.sort.order;
    }
  }
});

export const selectSort = (state) => state.filters.sort;

export const {
  setCategory,
  setSortProperty,
  setSortOrder,
  setCurrentPage,
  setFilters,
  setSearchValue
} = filtersSlice.actions;

export default filtersSlice.reducer;
