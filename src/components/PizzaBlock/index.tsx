import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IPizzaCart, IPizzaResponse } from '../../interfaces/pizza.interface';
import { useAppDispatch } from '../../store';
import { addItem } from '../../store/cart/slice';
import { selectCartItemById } from '../../store/cart/selectors';

const PizzaBlock: React.FC<IPizzaResponse> = ({
  id,
  title,
  startPrice,
  prices,
  imageUrl,
  types,
  sizes
}) => {
  const typeLabels = ['тонкое', 'традиционное'];

  const dispatch = useAppDispatch();
  const [activeType, setActiveType] = useState<number>(types[0]);
  const [activeSize, setActiveSize] = useState<number>(sizes[0]);
  const [currentPrice, setCurrentPrice] = useState(startPrice);
  const itemId = `${id}-${typeLabels[activeType]}-${activeSize}`;
  const item = useSelector(selectCartItemById(itemId));

  const count = item ? item.count : 0;

  const onClickAdd = () => {
    const item: IPizzaCart = {
      id: itemId,
      title,
      price: currentPrice,
      type: typeLabels[activeType],
      size: activeSize,
      imageUrl,
      count: 1
    };

    dispatch(addItem(item));
  };

  const onChangeType = (typeId: number) => {
    setActiveType(typeId);
    setCurrentPrice(prices[typeId][activeSize]);
  };

  const onChangeSize = (size: number) => {
    setActiveSize(size);
    setCurrentPrice(prices[activeType][size]);
  };

  return (
    <div className='pizza-block'>
      <Link to={'/pizza/' + id}>
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
        <h4 className='pizza-block__title'>{title}</h4>
      </Link>
      <div className='pizza-block__selector'>
        <ul>
          {types.map((typeId) => {
            const active = activeType === typeId;
            return (
              <li
                key={typeId}
                className={active ? 'active' : ''}
                onClick={() => onChangeType(typeId)}
              >
                {typeLabels[typeId]}
                {active && typeId !== types[0] && (
                  <div className='price-increase'>+{prices[typeId][sizes[0]] - startPrice} ₴</div>
                )}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, idx) => {
            const active = activeSize === size;
            return (
              <li
                key={idx}
                className={activeSize === size ? 'active' : ''}
                onClick={() => onChangeSize(size)}
              >
                {size} см.
                {active && size !== sizes[0] && (
                  <div className='price-increase'>+{prices[types[0]][size] - startPrice} ₴</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {currentPrice} ₴</div>
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
  );
};

export default PizzaBlock;
