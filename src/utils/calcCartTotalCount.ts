import { IPizzaCart } from '../interfaces/pizza.interface';

export const calcCartTotalCount = (items: IPizzaCart[]) => {
  return items.reduce((sum, item) => sum + item.count, 0);
};
