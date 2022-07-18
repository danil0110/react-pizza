import { IPizzaResponse } from '../../interfaces/pizza.interface';

export interface PizzasSliceState {
  items: IPizzaResponse[];
  status: Status;
}

export enum Status {
  LOADING = 'loading',
  COMPLETED = 'success',
  ERROR = 'error'
}
