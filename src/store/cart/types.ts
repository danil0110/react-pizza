import { IPizzaCart } from '../../interfaces/pizza.interface';

export interface CartSliceState {
  totalCount: number;
  totalPrice: number;
  items: IPizzaCart[];
}
