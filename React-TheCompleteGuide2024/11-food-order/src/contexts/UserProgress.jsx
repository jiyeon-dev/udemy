import { createContext, useContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "", // cart , checkout
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export default function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  const showCart = () => setUserProgress("cart");
  const hideCart = () => setUserProgress("");

  const showCheckout = () => setUserProgress("checkout");
  const hideCheckout = () => setUserProgress("");

  return (
    <UserProgressContext.Provider
      value={{
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
}

export const useUserProgressContext = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error(
      "useUserProgressContext must be used within a UserProgressContextProvider"
    );
  }
  return context;
};
