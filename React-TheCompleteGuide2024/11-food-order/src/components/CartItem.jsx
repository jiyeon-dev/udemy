export default function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <li className='cart-item'>
      <p>
        {item.name} - {item.quantity} x ${item.price}
      </p>
      <div className='cart-item-actions'>
        <button onClick={onDecrease}>-</button>
        {item.quantity}
        <button onClick={onIncrease}>+</button>
      </div>
    </li>
  );
}
