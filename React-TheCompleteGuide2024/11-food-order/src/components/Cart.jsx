import { useCartContext } from "../contexts/Cart";
import CartItem from "./CartItem";
import Modal from "./UI/Modal";
import { useUserProgressContext } from "../contexts/UserProgress";

export default function Cart() {
  const { items, addItem, removeItem } = useCartContext();
  const { progress, hideCart } = useUserProgressContext();

  const openModal = progress === "cart";
  const totalCost = items.reduce((acc, cur) => acc + +cur.price, 0);

  return (
    <Modal open={openModal} className='cart' onClose={hideCart}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            item={item}
            key={item.id}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className='cart-total'>${totalCost}</p>
      <div className='modal-actions'>
        <button className='text-button' onClick={hideCart}>
          Close
        </button>
        <button className='button'>Go to Checkout</button>
      </div>
    </Modal>
  );
}
