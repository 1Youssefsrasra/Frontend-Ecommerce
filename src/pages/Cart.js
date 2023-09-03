import React, { useState } from "react";
//import useCartContext from '../hooks/useCartContext';
import { useCart } from "react-use-cart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//import { useAuthContext } from "../hooks/useAuthContext";


const CartPage = () => {

  const [orderPlaced, setOrderPlaced] = useState(false);


  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  if (isEmpty) return <h1 className="text-center">Your cart is empty1</h1>;

  const handleOrderNowClick = async () => {
  // Gather the necessary order data
  const orderData = {
    products: items.map((item) => item._id), // Use items from the cart
    dateCom: new Date().toISOString(), // Replace with actual order date
    price: cartTotal, // Use the cart total from useCart
    quantity: totalItems,
  };
  console.log("Order Data:", orderData); 

  try {
    const response = await fetch("/api/command", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(orderData),
    });
    console.log("API Response:", response);

    if (response.ok) {
      setOrderPlaced(true);
    } else {
      console.error("Failed to create order");
    }
  } catch (error) {
    console.error("Error creating order:", error);
  }
};



  return (
    <>
    <Navbar />
      <div className="py-4 container light">
        <div className="row justify-content-center">
          <div className="col-12">
            <h5>
              Cart ({totalUniqueItems}) total Items ({totalItems}){" "}
            </h5>
            <table className="table table-light table-hover m-0">
              <tbody>
                {items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.price}$</td>
                      <td>Quantity ({item.quantity})</td>
                      <td>
                        <button 
                          className="btn btn-info ms-2"
                          onClick={()=> updateItemQuantity(item.id, item.quantity - 1)}
                        >-</button>
                        <button 
                          className="btn btn-info ms-2"
                          onClick={()=> updateItemQuantity(item.id, item.quantity + 1)}
                        >+</button>
                        <button 
                          className="btn btn-danger ms-2"
                          onClick={()=> removeItem(item.id)}
                        >Remove Item</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="col-auto ms-auto">
            <h2>Total Price: $ {cartTotal}</h2>
          </div>
          <div className="col-auto">
            <button 
              className="btn btn-danger m-2"
              onClick={()=> emptyCart()}
            >Clear Cart</button>
     {!orderPlaced ? (
        <button className="btn btn-primary m-2" onClick={handleOrderNowClick}>
          Order Now
        </button>
      ) : (
        <p>Order has been placed!</p>
      )}          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
