const Categories = ({ categories, filterItems }) => {
  return (
    <div className='btn-container'>
      {categories.map((category, index) => {
        return (
          <button
            key={index}
            type='button'
            className='btn'
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
