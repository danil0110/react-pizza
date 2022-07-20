import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { IPizzaCart, IPizzaResponse } from '../interfaces/pizza.interface';
import { useAppDispatch } from '../store';
import { selectCartItemById } from '../store/cart/selectors';
import { addItem } from '../store/cart/slice';

const PizzaDetails: React.FC = () => {
  const typeLabels = ['тонкое', 'традиционное'];
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [pizza, setPizza] = useState<IPizzaResponse>();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  const itemId = `${id}-${typeLabels[activeType]}-${activeSize}`;
  const item = useSelector(selectCartItemById(itemId));
  const count = item ? item.count : 0;

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get<IPizzaResponse>(
          'https://62cbe0dea080052930a0692f.mockapi.io/items/' + id
        );
        setPizza(data);
        setCurrentPrice(data.startPrice);
        setActiveType(data.types[0]);
        setActiveSize(data.sizes[0]);
      } catch (error) {
        alert('К сожалению, пицца не была найдена.');
        navigate('/');
      }
    };

    fetchPizza();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeType = (typeId: number) => {
    setActiveType(typeId);
    pizza && setCurrentPrice(pizza.prices[typeId][activeSize]);
  };

  const onChangeSize = (size: number) => {
    setActiveSize(size);
    pizza && setCurrentPrice(pizza.prices[activeType][size]);
  };

  const onClickAdd = () => {
    if (pizza) {
      const item: IPizzaCart = {
        id: itemId,
        title: pizza.title,
        price: currentPrice,
        type: typeLabels[activeType],
        size: activeSize,
        imageUrl: pizza.imageUrl,
        count: 1
      };

      dispatch(addItem(item));
    }
  };

  if (!pizza) {
    return <Spinner />;
  }

  // TODO: write pleasant styles for PizzaDetails component
  return (
    <div className='container'>
      <div className='pizza-details'>
        <img className='pizza-details__image' src={pizza.imageUrl} alt={pizza.title} />
        <div className='pizza-details__info'>
          <h2 className='pizza-details__title'>{pizza.title}</h2>
          <div className='pizza-details__selector'>
            <ul>
              {pizza.types.map((typeId) => {
                const active = activeType === typeId;
                return (
                  <li
                    key={typeId}
                    className={active ? 'active' : ''}
                    onClick={() => onChangeType(typeId)}
                  >
                    {typeLabels[typeId]}
                    {active && typeId !== pizza.types[0] && (
                      <div className='price-increase'>
                        +{pizza.prices[typeId][pizza.sizes[0]] - pizza.startPrice} ₴
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <ul>
              {pizza.sizes.map((size, idx) => {
                const active = activeSize === size;
                return (
                  <li
                    key={idx}
                    className={active ? 'active' : ''}
                    onClick={() => onChangeSize(size)}
                  >
                    {size} см.
                    {active && size !== pizza.sizes[0] && (
                      <div className='price-increase'>
                        +{pizza.prices[pizza.types[0]][size] - pizza.startPrice} ₴
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='pizza-details__bottom'>
            <div className='pizza-details__price'>от {currentPrice} ₴</div>
            <button onClick={onClickAdd} className='button button--outline button--add'>
              <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                  fill='white'
                />
              </svg>
              <span>Добавить</span>
              {count > 0 && <i>{count}</i>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetails;
