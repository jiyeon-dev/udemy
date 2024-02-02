import { useCartContext } from "../contexts/Cart";
import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";

export default function MealItem({ meal }) {
  const { addItem } = useCartContext();

  const handleClick = () => {
    addItem(meal);
  };

  return (
    <li className='meal-item'>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} />

        <div>
          <h3>{meal.name}</h3>
          <p className='meal-item-price'>
            {currencyFormatter.format(meal.price)}
          </p>
          <p className='meal-item-description'>{meal.description}</p>
        </div>

        <div className='meal-item-actions'>
          <Button onClick={handleClick}>Add to Cart</Button>
        </div>
      </article>
    </li>
  );
}
