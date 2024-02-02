import { useCartContext } from "../contexts/Cart";
import { useUserProgressContext } from "../contexts/UserProgress";
import { useHttp } from "../hooks/useHttp";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { items, clearCart } = useCartContext();
  const { progress, hideCheckout } = useUserProgressContext();

  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const openModal = progress === "checkout";
  const totalCost = items.reduce(
    (acc, cur) => acc + +cur.quantity * cur.price,
    0
  );

  const handleClose = () => {
    clearData();
    hideCheckout();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: data,
        },
      })
    );
  };

  const handleFinish = () => {
    clearCart();
    handleClose();
  };

  if (data && !error) {
    return (
      <Modal open={openModal} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className='modal-actions'>
          <button className='button' onClick={handleFinish}>
            Okay
          </button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={openModal} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: ${totalCost}</p>
        <Input label='Full Name' id='name' type='text' name='name' />
        <Input label='E-Mail Address' id='email' type='email' name='email' />
        <Input label='Street' type='text' id='street' name='street' />
        <div className='control-row'>
          <Input
            label='Postal Code'
            type='text'
            id='postal-code'
            name='postal-code'
          />
          <Input label='City' type='text' id='city' name='city' />
        </div>

        {error && <Error title='Failed to submit order' message={error} />}

        <div className='modal-actions'>
          {isLoading ? (
            <span>Sending order data...</span>
          ) : (
            <>
              <button
                type='reset'
                className='text-button'
                onClick={handleClose}
              >
                Close
              </button>
              <button className='button'>Submit Order</button>
            </>
          )}
        </div>
      </form>
    </Modal>
  );
}
