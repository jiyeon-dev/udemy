import { createContext, useContext, useReducer } from "react";

const CartContext = createContext({
  items: [], // { ...item, quantity: 0 }
  addItem: () => [],
  removeItem: () => [],
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    /**
     * 아이템이 장바구니에 존재하는지 체크
     * - 존재하면 -> quantity + 1 로 업데이트
     * - 존재하지 않으면 -> quantity = 1 로 신규 추가
     */
    const existItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.item.id
    );

    const updatedItems = [...state.items];
    if (existItemIndex > -1) {
      const existItem = state.items[existItemIndex];
      updatedItems[existItemIndex] = {
        ...existItem,
        quantity: existItem.quantity + 1,
      };
    } else {
      updatedItems.push({ ...action.payload.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    /**
     * 장바구니에서 아이템 찾기
     * - 기존 개수가 1개인 경우 -> 아이템 제거
     * - 기존 개수가 2개 이상인 경우 -> quantity - 1
     */
    const existItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const existItem = state.items[existItemIndex];

    const updatedItems = [...state.items];
    if (existItem.quantity === 1) {
      updatedItems.splice(existItemIndex, 1);
    } else {
      updatedItems[existItemIndex] = {
        ...existItem,
        quantity: existItem.quantity - 1,
      };
    }

    return { ...state, items: updatedItems };
  }

  return { ...state };
}

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });

  const handleAddItem = (item) => {
    cartDispatch({ type: "ADD_ITEM", payload: { item } });
  };

  const handelRemoveItem = (id) => {
    cartDispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        addItem: handleAddItem,
        removeItem: handelRemoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
}
