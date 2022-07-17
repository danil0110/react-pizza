import { useDispatch } from 'react-redux';
import { setCategory } from '../store/slices/filtersSlice';

const Categories = ({ activeCategoryId }) => {
  const dispatch = useDispatch();

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
