import logo from "../assets/logo.jpg";
import { useCartContext } from "../contexts/Cart";
import { useUserProgressContext } from "../contexts/UserProgress";

export default function Header() {
  const { items } = useCartContext();
  const { showCart } = useUserProgressContext();

  const total = items.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <div id='main-header'>
      <div id='title'>
        <img src={logo} />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button type='button' className='text-button' onClick={showCart}>
          Cart ({total})
        </button>
      </nav>
    </div>
  );
}
