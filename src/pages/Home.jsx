import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { initialState, setFilters } from '../store/filtersSlice';

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMountedRef = useRef(false);
  const isSearchRef = useRef(false);
  const isRedirectRef = useRef(false);

  const { searchValue } = useContext(SearchContext);
  const activeCategoryId = useSelector((state) => state.filters.activeCategoryId);
  const sortOptions = useSelector((state) => state.filters.sort);
  const currentPage = useSelector((state) => state.filters.currentPage);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPizzas = () => {
    const { property, order } = sortOptions;
    const page = `page=${currentPage}&limit=4`;
    const search = searchValue.trim().length > 0 ? `&search=${searchValue.trim()}` : '';
    const category = activeCategoryId > 0 ? `&category=${activeCategoryId}` : '';

    setLoading(true);
    axios
      .get(
        `https://62cbe0dea080052930a0692f.mockapi.io/items?${page}&sortBy=${property}&order=${order}${search}${category}`
      )
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      });

    window.scrollTo(0, 0);
  };

  // ! Setting default query params from initial state, reloading page
  // ! and clicking on header link - rerenders even though state hasn't been changed
  // If clicked on logo link in Header (set address to '/' without query params)
  useEffect(() => {
    if (isMountedRef.current && !location.search) {
      isRedirectRef.current = true;
      dispatch(setFilters(initialState));
      setSearchParams({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // If component was already rendered
  useEffect(() => {
    if (isMountedRef.current && !isRedirectRef.current) {
      setSearchParams({
        categoryId: activeCategoryId,
        sortBy: sortOptions.property,
        order: sortOptions.order,
        page: currentPage
      });
    }

    isMountedRef.current = true;
    isRedirectRef.current = false;
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
      fetchPizzas();
    }

    isSearchRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategoryId, sortOptions, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {loading
          ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
