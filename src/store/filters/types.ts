export interface FiltersSliceState {
  searchValue: string;
  activeCategoryId: number;
  sort: {
    property: SortProperties;
    order: SortOrders;
  };
  currentPage: number;
}

export enum SortProperties {
  RATING = 'rating',
  PRICE = 'startPrice',
  TITLE = 'title'
}

export enum SortOrders {
  ASC = 'asc',
  DESC = 'desc'
}
