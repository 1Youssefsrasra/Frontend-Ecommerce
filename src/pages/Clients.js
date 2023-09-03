import React, { useState, useEffect } from "react";
import "../css/Clients.css";
import HomeIcon from "@mui/icons-material/Home";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import GroupIcon from "@mui/icons-material/Group";
//import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch("/api/client"); // Adjust the API endpoint
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    }

    fetchClients();
  }, []);

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
            <li class="sidebar-list-item active">
              <Link to="/">
                <GroupIcon />
                <span> Clients</span>
              </Link>
            </li>
            <li class="sidebar-list-item">
            <Link to="/Orders">
                <LocalShippingIcon />
                <span> Orders</span>
                </Link>
            </li>
          </ul>
        </div>

        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Clients</h1>
            <Link to="/Add-product">
              <button class="app-content-headerButton">Add Product</button>
            </Link>
          </div>
          <div className="products-area-wrapper tableView">
            <div class="products-header">
              <div class="product-cell">
                First Name
                <button  class="sort-button"><ExpandMoreIcon/>
                </button>
              </div>
              <div class="product-cell category">
                Last Name
                <button class="sort-button">
                <ExpandMoreIcon/>
                </button>
              </div>
              <div class="product-cell status-cell">
                Email
                <button class="sort-button">
                <ExpandMoreIcon/>
                </button>
              </div>
              <div class="product-cell sales">
                Adress
                <button class="sort-button">
                <ExpandMoreIcon/>
                </button>
              </div>
              <div class="product-cell stock">
                Cart
                <button class="sort-button">
                <ExpandMoreIcon/>
                </button>
              </div>
              <div class="product-cell price">
                Phone
                <button class="sort-button">
                <ExpandMoreIcon/>
                </button>
              </div>

              <div class="product-cell price">
                Status
                <button class="sort-button">
                <ExpandMoreIcon/>
                </button>
              </div>
            </div>


             
              <ul>
                {clients.map((client) => (
                  <li key={client._id}>
                    <div class="products-row">
                      
                      
                      <div class="product-cell sales">
                        {client.prenom}
                      </div>
                     
                      <div class="product-cell sales">
                        {client.nom}
                      </div>
                      <div class="product-cell stock">
                        {client.email}
                      </div>
                      <div class="product-cell price">
                        {client.adresse}
                      </div>
                      <div class="product-cell price">
                        {client.total_orders}
                      </div>
                      <div class="product-cell price">
                       {client.telephone}
                      </div>
                      <div class="product-cell status-cell">
                        <span class="status active">{client.role}</span>
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

export default Clients;
