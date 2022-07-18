import { IPizzaCart } from '../interfaces/pizza.interface';

export const calcCartTotalPrice = (items: IPizzaCart[]) => {
  return items.reduce((sum, item) => sum + item.price * item.count, 0);
};
