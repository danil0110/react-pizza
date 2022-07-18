import { useEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import {
  initialState,
  selectSort,
  setCategory,
  setCurrentPage,
  setFilters,
  SortOrders,
  SortProperties
} from '../store/slices/filtersSlice';
import { fetchPizzas } from '../store/slices/pizzasSlice';
import { RootState, useAppDispatch } from '../store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMountedRef = useRef(false);
  const isSearchRef = useRef(false);

  const sortOptions = useSelector(selectSort);
  const searchValue = useSelector((state: RootState) => state.filters.searchValue);
  const { items, status } = useSelector((state: RootState) => state.pizzas);
  const activeCategoryId = useSelector((state: RootState) => state.filters.activeCategoryId);
  const currentPage = useSelector((state: RootState) => state.filters.currentPage);

  const getPizzas = () => {
    const { property, order } = sortOptions;
    const page = `page=${currentPage}&limit=4`;
    const search = searchValue.trim().length > 0 ? `&search=${searchValue.trim()}` : '';
    const category = activeCategoryId > 0 ? `&category=${activeCategoryId}` : '';

    // @ts-ignore
    dispatch(fetchPizzas({ page, property, order, search, category }));

    window.scrollTo(0, 0);
  };

  // If component was already rendered
  useEffect(() => {
    if (isMountedRef.current) {
      setSearchParams({
        categoryId: String(activeCategoryId),
        sortBy: sortOptions.property,
        order: sortOptions.order,
        page: String(currentPage)
      });
    }

    isMountedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategoryId, sortOptions, currentPage]);

  // If address bar contains query params
  useEffect(() => {
    if (location.search) {
      const activeCategoryId = searchParams.get('categoryId') || initialState.activeCategoryId;
      const currentPage = searchParams.get('page') || initialState.currentPage;
      const property = (searchParams.get('sortBy') as SortProperties) || initialState.sort.property;
      const order: SortOrders =
        (searchParams.get('order') as SortOrders) || initialState.sort.order;

      const filters = {
        activeCategoryId: Number(activeCategoryId),
        currentPage: Number(currentPage),
        sort: { property, order }
      };

      dispatch(setFilters(filters));
      isSearchRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If address bar hasn't query string - make a default request
  useEffect(() => {
    if (!isSearchRef.current) {
      getPizzas();
    }

    isSearchRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategoryId, sortOptions, searchValue, currentPage]);

  const onChangeCategory = (categoryId: number) => {
    dispatch(setCategory(categoryId));
  };

  const onPageChange = (e: { selected: number }) => {
    dispatch(setCurrentPage(e.selected + 1));
  };

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories activeCategoryId={activeCategoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>К сожалению, не удалось загрузить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading'
            ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
            : items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      )}
      <Pagination currentPage={currentPage} pageCount={3} onPageChange={onPageChange} />
    </div>
  );
};

export default Home;
