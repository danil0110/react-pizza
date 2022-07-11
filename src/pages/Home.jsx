import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortByOptions, setSortByOptions] = useState({ property: 'rating', order: 'asc' });

  useEffect(() => {
    setLoading(true);
    const { property, order } = sortByOptions;

    fetch(
      `https://62cbe0dea080052930a0692f.mockapi.io/items?sortBy=${property}&order=${order}&category=${
        categoryId > 0 ? categoryId : ''
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortByOptions]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort options={sortByOptions} onChangeSortOptions={(obj) => setSortByOptions(obj)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {loading
          ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
