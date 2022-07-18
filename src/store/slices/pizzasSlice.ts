import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPizzaResponse } from '../../interfaces/pizza.interface';
import { SearchParams } from '../../interfaces/search-params.interface';

interface PizzasSliceState {
  items: IPizzaResponse[];
  status: Status;
}

export enum Status {
  LOADING = 'loading',
  COMPLETED = 'success',
  ERROR = 'error'
}

export const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING
};

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params: SearchParams) => {
    const { page, property, order, search, category } = params;
    const { data } = await axios.get<IPizzaResponse[]>(
      `https://62cbe0dea080052930a0692f.mockapi.io/items?${page}&sortBy=${property}&order=${order}${search}${category}`
    );

    return data;
  }
);

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
