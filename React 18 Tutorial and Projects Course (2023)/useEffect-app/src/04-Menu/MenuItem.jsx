const MenuItem = ({ id, title, price, img, desc }) => {
  return (
    <article className='menuItem'>
      <img src={`04-Menu${img}`} alt={title} className='img' />
      <div className='item-info'>
        <header>
          <h5>{title}</h5>
          <span className='item-price'>${price}</span>
        </header>
        <p className='item-text'>{desc}</p>
      </div>
    </article>
  );
};

export default MenuItem;
