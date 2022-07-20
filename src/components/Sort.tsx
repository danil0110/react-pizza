import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { selectSort } from '../store/filters/selectors';

import { setSortOrder, setSortProperty } from '../store/filters/slice';
import { SortOrders, SortProperties } from '../store/filters/types';

const Sort: React.FC = () => {
  const dispatch = useAppDispatch();
  const options: { property: string; order: string } = useSelector(selectSort);
  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', onClickOutside);
    return () => document.body.removeEventListener('click', onClickOutside);
  }, []);

  const sortByLabels = {
    rating: 'популярности',
    startPrice: 'цене',
    title: 'алфавиту'
  };

  const onClickSortProperty = (value: SortProperties) => {
    if (value !== options.property) dispatch(setSortProperty(value));
    setOpen(false);
  };

  const onClickOrder = () => {
    const order = options.order === 'asc' ? SortOrders.DESC : SortOrders.ASC;
    dispatch(setSortOrder(order));
  };

  return (
    <div className='sort' ref={sortRef}>
      <div className='sort__label'>
        <div className='sort__arrow-wrapper' onClick={onClickOrder}>
          <svg
            style={options.order === 'desc' ? { transform: 'rotate(180deg)' } : {}}
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
              fill='#2C2C2C'
            />
          </svg>
        </div>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>
          {
            sortByLabels[
              options.property as keyof { rating: string; startPrice: string; title: string }
            ]
          }
        </span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {Object.entries(sortByLabels).map((item, idx) => (
              <li
                key={idx}
                className={item[0] === options.property ? 'active' : ''}
                onClick={() => onClickSortProperty(item[0] as SortProperties)}
              >
                {item[1]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
