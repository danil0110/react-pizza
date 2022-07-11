import './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import { useEffect, useState } from 'react';
import Skeleton from './components/PizzaBlock/Skeleton';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      fetch('https://62cbe0dea080052930a0692f.mockapi.io/items')
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
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
        </div>
      </div>
    </div>
  );
}

export default App;
