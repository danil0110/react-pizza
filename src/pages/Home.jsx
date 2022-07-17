import { useEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { initialState, selectSort, setFilters } from '../store/slices/filtersSlice';
import { fetchPizzas } from '../store/slices/pizzasSlice';

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMountedRef = useRef(false);
  const isSearchRef = useRef(false);

  const sortOptions = useSelector(selectSort);
  const searchValue = useSelector((state) => state.filters.searchValue);
  const { items, status } = useSelector((state) => state.pizzas);
  const activeCategoryId = useSelector((state) => state.filters.activeCategoryId);
  const currentPage = useSelector((state) => state.filters.currentPage);

  const getPizzas = () => {
    const { property, order } = sortOptions;
    const page = `page=${currentPage}&limit=4`;
    const search = searchValue.trim().length > 0 ? `&search=${searchValue.trim()}` : '';
    const category = activeCategoryId > 0 ? `&category=${activeCategoryId}` : '';

    dispatch(fetchPizzas({ page, property, order, search, category }));

    window.scrollTo(0, 0);
  };

  // If component was already rendered
  useEffect(() => {
    if (isMountedRef.current) {
      setSearchParams({
        categoryId: activeCategoryId,
        sortBy: sortOptions.property,
        order: sortOptions.order,
        page: currentPage
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
      const property = searchParams.get('sortBy') || initialState.sort.property;
      const order = searchParams.get('order') || initialState.sort.order;

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

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories activeCategoryId={activeCategoryId} />
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
            : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      )}
      <Pagination currentPage={currentPage} />
    </div>
  );
};

export default Home;
