const Categories = ({ value, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, idx) => (
          <li
            key={idx}
            className={value === idx ? 'active' : null}
            onClick={() => onClickCategory(idx)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
