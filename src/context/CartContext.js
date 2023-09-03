import { createContext, useReducer } from 'react';

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
              return { cartItems: action.payload}
    case 'REMOVE_FROM_CART':
        return{cartItems: state.cartItems.filter((w)=> w._id !== action.payload._id) }
    case 'CLEAR_CART':
        return { cartItems: [] };
    default:
      return state;
  }
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [], // Initial state for cart items
  });

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
