import React from 'react';

function Categories({ categoryId, onClickCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
              className={categoryId === i ? 'active' : ''}
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
