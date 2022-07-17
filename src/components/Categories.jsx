import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../store/slices/filtersSlice';

const Categories = () => {
  const dispatch = useDispatch();
  const activeCategoryId = useSelector((state) => state.filters.activeCategoryId);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, idx) => (
          <li
            key={idx}
            className={activeCategoryId === idx ? 'active' : null}
            onClick={() => dispatch(setCategory(idx))}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
