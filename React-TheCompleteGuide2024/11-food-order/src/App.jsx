import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./contexts/Cart";
import UserProgressContextProvider from "./contexts/UserProgress";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
