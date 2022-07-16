import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategoryId: 0,
  sort: {
    property: 'rating',
    order: 'desc'
  }
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
    }
  }
});

export const { setCategory, setSortProperty, setSortOrder } = filtersSlice.actions;

export default filtersSlice.reducer;
