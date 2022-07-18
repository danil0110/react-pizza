type CategoriesProps = {
  activeCategoryId: number;
  onChangeCategory: (categoryId: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ activeCategoryId, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, idx) => (
          <li
            key={idx}
            className={activeCategoryId === idx ? 'active' : ''}
            onClick={() => onChangeCategory(idx)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
