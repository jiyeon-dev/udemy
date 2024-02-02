import { useCartContext } from "../contexts/Cart";
import CartItem from "./CartItem";
import Modal from "./UI/Modal";
import { useUserProgressContext } from "../contexts/UserProgress";

export default function Cart() {
  const { items, addItem, removeItem } = useCartContext();
  const { progress, hideCart, showCheckout } = useUserProgressContext();

  const openModal = progress === "cart";
  const totalCost = items.reduce(
    (acc, cur) => acc + +cur.quantity * cur.price,
    0
  );

  return (
    <Modal open={openModal} className='cart'>
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
        {items.length > 0 && (
          <button className='button' onClick={showCheckout}>
            Go to Checkout
          </button>
        )}
      </div>
    </Modal>
  );
}
