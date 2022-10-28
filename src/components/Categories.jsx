import React, { useState } from 'react';

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const [activeIndex, setActiveIndex] = useState(0);
  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoria, i) => {
          return (
            <li
              key={categoria}
              onClick={() => {
                onClickCategory(i);
              }}
              className={activeIndex === i ? 'active' : ''}
            >
              {categoria}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
