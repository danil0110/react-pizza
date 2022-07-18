import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { PizzasSliceState, Status } from './types';

export const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.COMPLETED;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
      });
  }
});

export default pizzasSlice.reducer;
