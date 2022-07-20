type CategoriesProps = {
  categories: string[];
  activeCategoryId: number;
  onChangeCategory: (categoryId: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({
  categories,
  activeCategoryId,
  onChangeCategory
}) => {
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
