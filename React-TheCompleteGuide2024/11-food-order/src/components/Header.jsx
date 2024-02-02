import logo from "../assets/logo.jpg";
import { useCartContext } from "../contexts/Cart";

export default function Header() {
  const { items } = useCartContext();
  const total = items.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <div id='main-header'>
      <div id='title'>
        <img src={logo} />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button type='button' className='text-button'>
          Cart ({total})
        </button>
      </nav>
    </div>
  );
}
