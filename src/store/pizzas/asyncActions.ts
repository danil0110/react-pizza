import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizzaResponse } from '../../interfaces/pizza.interface';
import { SearchParams } from '../../interfaces/search-params.interface';

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
