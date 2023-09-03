import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw Error('useCartContext must be used inside a CartContextProvider');
  }

  return context;
};

export default useCartContext;
