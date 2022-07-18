import { useDispatch } from 'react-redux';
import { setCategory } from '../store/slices/filtersSlice';

type CategoriesProps = {
  activeCategoryId: number;
};

const Categories: React.FC<CategoriesProps> = ({ activeCategoryId }) => {
  const dispatch = useDispatch();

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, idx) => (
          <li
            key={idx}
            className={activeCategoryId === idx ? 'active' : ''}
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
