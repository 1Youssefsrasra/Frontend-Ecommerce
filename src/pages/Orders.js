import "../css/Clients.css";
import HomeIcon from "@mui/icons-material/Home";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import GroupIcon from "@mui/icons-material/Group";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  //fetch orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("http://localhost:4000/api/command");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("error fetching orders", error);
      }
    }
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/command/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the status locally in the orders state
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/command/${orderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted order from the orders state
        const updatedOrders = orders.filter((order) => order._id !== orderId);
        setOrders(updatedOrders);
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }

  return (
    <>
      <div className="app-container">
        <div class="sidebar">
          <div class="sidebar-header">
            <div class="app-icon">LOGO</div>
          </div>
          <ul class="sidebar-list">
            <li class="sidebar-list-item">
              <Link to="/Admin">
                <HomeIcon />
                <span> Home</span>
              </Link>
            </li>
            <li class="sidebar-list-item ">
              <Link to="/Dashboard">
                <LocalMallIcon />
                <span> Products</span>
              </Link>
            </li>
            <li class="sidebar-list-item ">
              <Link to="/Clients">
                <GroupIcon />
                <span> Clients</span>
              </Link>
            </li>
            <li class="sidebar-list-item active">
              <Link to="/Orders">
                <LocalShippingIcon />
                <span> Orders</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Orders</h1>
          </div>
          <div className="products-area-wrapper tableView">
            <div class="products-header">
              <div class="product-cell">
                Number
                <button class="sort-button">
                  <ExpandMoreIcon />
                </button>
              </div>
              <div class="product-cell category">
                Product
                <button class="sort-button">
                  <ExpandMoreIcon />
                </button>
              </div>
              <div class="product-cell category">
                Quantity
                <button class="sort-button">
                  <ExpandMoreIcon />
                </button>
              </div>
              <div class="product-cell status-cell">
                Client's Phone
                <button class="sort-button">
                  <ExpandMoreIcon />
                </button>
              </div>
              <div class="product-cell sales">
                Date
                <button class="sort-button">
                  <ExpandMoreIcon />
                </button>
              </div>
              <div class="product-cell stock">
                Adress
                <button class="sort-button">
                  <ExpandMoreIcon />
                </button>
              </div>
              <div class="product-cell price">
                Price
                <button class="sort-button">
                  <ExpandMoreIcon />
                </button>
              </div>

              <div class="product-cell price">
                Status
                <button class="sort-button">
                  <ExpandMoreIcon />
                </button>
              </div>
            </div>

            <ul>
              {orders.map((order) => (
                <li key={order._id}>
                  <div className="products-row">
                    <div className="product-cell">{order._id}</div>
                    <div className="product-cell">
                      {order.products.map((productId,key) => (
                        <div key={key}>{productId.title+","} </div>
                      ))}
                    </div>
                    <div className="product-cell">{order.quantity}</div>

                    <div className="product-cell">
                      {new Date(order.dateCom).toLocaleDateString(
                        "en-GB",
                        options
                      )}
                    </div>
                    <div className="product-cell">ariana</div>
                    <div className="product-cell">{order.price}</div>
                    <div className="product-cell">

                      
                      <div className="status-button">
                        <select className="select-input"
                          value={order.status}
                          onChange={(event) => 
                            updateOrderStatus(order._id, event.target.value)}
                        >
                          <option value="In progress">In progress</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="product-cell">
                <button
                  className="delete-button"
                  onClick={() => deleteOrder(order._id)}
                >
                  -
                </button>
              </div>

                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
