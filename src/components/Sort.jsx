import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectSort, setSortOrder, setSortProperty } from '../store/slices/filtersSlice';

const Sort = () => {
  const dispatch = useDispatch();
  const options = useSelector(selectSort);
  const [open, setOpen] = useState(false);
  const sortRef = useRef();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', onClickOutside);
    return () => document.body.removeEventListener('click', onClickOutside);
  }, []);

  const sortByLabels = {
    rating: 'популярности',
    price: 'цене',
    title: 'алфавиту'
  };

  const onClickSortProperty = (value) => {
    if (value !== options.property) dispatch(setSortProperty(value));
    setOpen(false);
  };

  const onClickOrder = () => {
    const order = options.order === 'asc' ? 'desc' : 'asc';
    dispatch(setSortOrder(order));
  };

  return (
    <div className='sort' ref={sortRef}>
      <div className='sort__label'>
        <div className='sort__arrow-wrapper' onClick={onClickOrder}>
          <svg
            style={options.order === 'desc' ? { transform: 'rotate(180deg)' } : null}
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
        <span onClick={() => setOpen(!open)}>{sortByLabels[options.property]}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {Object.entries(sortByLabels).map((item, idx) => (
              <li
                key={idx}
                className={item[0] === options.property ? 'active' : null}
                onClick={() => onClickSortProperty(item[0])}
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
