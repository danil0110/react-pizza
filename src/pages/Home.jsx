import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { setCurrentPage } from '../store/filtersSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { searchValue } = useContext(SearchContext);

  const activeCategoryId = useSelector((state) => state.filters.activeCategoryId);
  const sortOptions = useSelector((state) => state.filters.sort);
  const currentPage = useSelector((state) => state.filters.currentPage);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <Pagination onPageChange={(page) => dispatch(setCurrentPage(page))} />
    </div>
  );
};

export default Home;
