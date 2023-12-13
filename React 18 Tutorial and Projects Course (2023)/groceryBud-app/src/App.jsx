import Form from "./Form";
import Items from "./items";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import { useState } from "react";

const LOCAL_STORAGE_KEY = "list";

const setLocalStorage = (items) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
};

const getLocalStorage = () => {
  const list = localStorage.getItem(LOCAL_STORAGE_KEY);
  return list ? JSON.parse(list) : [];
};

const App = () => {
  const [items, setItems] = useState(getLocalStorage());

  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("item added to the list");
  };

  const removeItem = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
    setLocalStorage(newItems);
  };

  const editItem = (itemId) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <section className='section-center'>
      <ToastContainer position='top-center' />
      <Form addItem={addItem} />
      <Items items={items} removeItem={removeItem} editItem={editItem} />
    </section>
  );
};
export default App;
