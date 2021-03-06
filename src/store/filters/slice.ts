import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersSliceState, SortOrders, SortProperties } from './types';

export const initialState: FiltersSliceState = {
  searchValue: '',
  activeCategoryId: 0,
  sort: {
    property: SortProperties.RATING,
    order: SortOrders.DESC
  },
  currentPage: 1
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategory(state, action: PayloadAction<number>) {
      state.activeCategoryId = action.payload;
    },
    setSortProperty(state, action: PayloadAction<SortProperties>) {
      state.sort.property = action.payload;
    },
    setSortOrder(state, action: PayloadAction<SortOrders>) {
      state.sort.order = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<Omit<FiltersSliceState, 'searchValue'>>) {
      state.activeCategoryId = action.payload.activeCategoryId;
      state.currentPage = action.payload.currentPage;
      state.sort.property = action.payload.sort.property;
      state.sort.order = action.payload.sort.order;
    }
  }
});

export const {
  setCategory,
  setSortProperty,
  setSortOrder,
  setCurrentPage,
  setFilters,
  setSearchValue
} = filtersSlice.actions;

export default filtersSlice.reducer;
