import { useState } from 'react';

const Categories = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (idx) => setActiveIdx(idx);

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, idx) => (
          <li
            key={idx}
            className={activeIdx === idx ? 'active' : null}
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
