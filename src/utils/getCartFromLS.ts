import { IPizzaCart } from '../interfaces/pizza.interface';
import { calcCartTotalCount } from './calcCartTotalCount';
import { calcCartTotalPrice } from './calcCartTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');

  if (data) {
    const items: IPizzaCart[] = JSON.parse(data);
    const totalCount = calcCartTotalCount(items);
    const totalPrice = calcCartTotalPrice(items);

    return { items, totalCount, totalPrice };
  }
};
