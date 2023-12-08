import { useState } from "react";

import Title from "./Title";
import Menu from "./Menu";
import Categories from "./Categories";

import items from "./data";
import "./index.css";

const categories = ["all", ...new Set(items.map((item) => item.category))];

const App = () => {
  const [menuItems, setMenuItems] = useState(items);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
    } else {
      setMenuItems(items.filter((item) => item.category === category));
    }
  };

  return (
    <main>
      <section className='menu'>
        <Title title='our menu' />
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
};
export default App;
