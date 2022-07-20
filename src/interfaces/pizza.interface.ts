export interface IPizzaResponse {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  startPrice: number;
  prices: Record<number, Record<number, number>>;
  category: number;
  rating: number;
}

export interface IPizza {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  category?: number;
  rating?: number;
}

export interface IPizzaCart extends IPizza {
  count: number;
}
