import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ProductContextProvider from "./context/ProductContext";
import ClientContextProvider from "./context/ClientContext";
import { AuthContextProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import CartContextProvider from "./context/CartContext";
import { CartProvider } from "react-use-cart";
import CartPage from "./pages/Cart";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
    <CartContextProvider>
    <ClientContextProvider>
      <AuthContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </AuthContextProvider>
    </ClientContextProvider>
    </CartContextProvider>
    </CartProvider>
  </React.StrictMode>
);
