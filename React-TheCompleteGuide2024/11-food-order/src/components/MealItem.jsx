import { useCartContext } from "../contexts/Cart";

export default function MealItem({ meal }) {
  const { addItem } = useCartContext();

  const handleClick = (meal) => {
    addItem(meal);
  };

  return (
    <li className='meal-item'>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} />

        <div>
          <h3>{meal.name}</h3>
          <p className='meal-item-price'>${meal.price}</p>
          <p className='meal-item-description'>{meal.description}</p>
        </div>

        <div className='meal-item-actions'>
          <button className='button' onClick={() => handleClick(meal)}>
            Add to Cart
          </button>
        </div>
      </article>
    </li>
  );
}
