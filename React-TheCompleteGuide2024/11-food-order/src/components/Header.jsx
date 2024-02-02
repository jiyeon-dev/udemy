import logo from "../assets/logo.jpg";

export default function Header() {
  return (
    <div id='main-header'>
      <div id='title'>
        <img src={logo} />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button type='button' className='text-button'>
          Cart (0)
        </button>
      </nav>
    </div>
  );
}
