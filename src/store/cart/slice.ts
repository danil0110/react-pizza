import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPizzaCart } from '../../interfaces/pizza.interface';
import { calcCartTotalCount } from '../../utils/calcCartTotalCount';
import { calcCartTotalPrice } from '../../utils/calcCartTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartSliceState } from './types';

const cartData = getCartFromLS();

export const initialState: CartSliceState = cartData || {
  totalCount: 0,
  totalPrice: 0,
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<IPizzaCart[]>) {
      state.items = action.payload;
      state.totalPrice = calcCartTotalPrice(state.items);
      state.totalCount = calcCartTotalCount(state.items);
    },
    addItem(state, action: PayloadAction<IPizzaCart>) {
      const item = state.items.find((obj) => obj.id === action.payload.id);

      if (item) {
        item.count++;
      } else {
        state.items.push({ ...action.payload });
      }

      state.totalCount++;
      state.totalPrice = calcCartTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcCartTotalPrice(state.items);
      state.totalCount = calcCartTotalCount(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const item = state.items.find((obj) => obj.id === action.payload);
      if (!item) return;

      if (item.count === 1) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      } else {
        item.count--;
      }

      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount--;
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    }
  }
});

export const { setCart, addItem, removeItem, minusItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
