import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IPizzaCart } from '../../interfaces/pizza.interface';

interface CartSliceState {
  totalCount: number;
  totalPrice: number;
  items: IPizzaCart[];
}

export const initialState: CartSliceState = {
  totalCount: 0,
  totalPrice: 0,
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IPizzaCart>) {
      const item = state.items.find((obj) => obj.id === action.payload.id);

      if (item) {
        item.count++;
      } else {
        state.items.push({ ...action.payload });
      }

      state.totalCount++;
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0);
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, minusItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
