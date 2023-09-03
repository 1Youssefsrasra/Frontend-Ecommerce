import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PaidIcon from '@mui/icons-material/Paid';
import GroupIcon from "@mui/icons-material/Group";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import ProductForm from "../components/ProductForm";
import "../css/AdminHome.css";
const AdminHome = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalClients, setTotalClients] = useState(0);

  const [menPercentage, setMenPercentage] = useState(0);
  const [womenPercentage, setWomenPercentage] = useState(0);
  const [kidsPercentage, setKidsPercentage] = useState(0);

  const [bestClients, setBestClients] = useState([]);
  const [bestProduct, setBestProduct] = useState(null);

  const [totalAmountDelivered, setTotalAmountDelivered] = useState(0);

  const [categoryPercentages, setCategoryPercentages] = useState({
    Men: 0,
    Women: 0,
    Kids: 0
  });
  

  useEffect(() => {
    // Fetch data from your backend APIs and update state
    async function fetchData() {
      try {
        const productsResponse = await fetch("/api/products");
        const productsData = await productsResponse.json();
        setTotalProducts(productsData.length);

        // Sort products based on total_sales
        const sortedProducts = productsData.sort(
          (a, b) => b.total_sales - a.total_sales
        );

        // Get the best product (first item after sorting)
        const topProduct = sortedProducts[0];
        setBestProduct(topProduct);

        // Calculate totals
        let totalMen = 0;
        let totalWomen = 0;
        let totalKids = 0;

          // Calculate category sales
          let totalMenSales = 0;
          let totalWomenSales = 0;
          let totalKidsSales = 0;

        productsData.forEach((product) => {
          if (product.category === "Men") {
            totalMen++;
            totalMenSales += product.total_sales;
          } else if (product.category === "Women") {
            totalWomen++;
            totalWomenSales += product.total_sales;
          } else if (product.category === "Kids") {
            totalKids++;
            totalKidsSales += product.total_sales;
          }
        });

        const totalSales = totalMenSales + totalWomenSales + totalKidsSales;
        const menPercentage = ((totalMenSales / totalSales) * 100).toFixed(2);
        const womenPercentage = ((totalWomenSales / totalSales) * 100).toFixed(2);
        const kidsPercentage = ((totalKidsSales / totalSales) * 100).toFixed(2);
        setCategoryPercentages({
          Men: menPercentage,
          Women: womenPercentage,
          Kids: kidsPercentage
        });


        // Update state
        setMenPercentage(((totalMen / totalProducts) * 100).toFixed(2));
        setWomenPercentage(((totalWomen / totalProducts) * 100).toFixed(2));
        setKidsPercentage(((totalKids / totalProducts) * 100).toFixed(2));

        const ordersResponse = await fetch("/api/command");
        const ordersData = await ordersResponse.json();
        setTotalOrders(ordersData.length);


            // Calculate the total amount for delivered orders
    const calculateTotalAmountDelivered = () => {
      const deliveredOrders = ordersData.filter((order) => order.status === "Delivered");
      const sum = deliveredOrders.reduce((acc, order) => acc + order.price, 0);
      return sum;
    };

    // Update the total amount for delivered orders
    setTotalAmountDelivered(calculateTotalAmountDelivered());




        const clientsResponse = await fetch("/api/client");
        const clientsData = await clientsResponse.json();
        setTotalClients(clientsData.length);

        // Sort clients based on total_orders
        const sortedClients = clientsData.sort(
          (a, b) => b.total_orders - a.total_orders
        );
        // Get the top 3 clients
        const topClients = sortedClients.slice(0, 3);
        setBestClients(topClients);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [totalProducts]);

  return (
    <>
      <div class="sidebar">
        <div class="sidebar-header">
          <div class="app-icon">LOGO</div>
        </div>
        <ul class="sidebar-list">
          <li class="sidebar-list-item active">
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
          <li class="sidebar-list-item">
            <Link to="/Clients">
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
          <h1 className="app-content-headerText">Admin </h1>
          
        </div>

        <div className="admin-home">
          <div className="cards">
            <Card
              title="Total Products"
              icon={<LocalMallIcon />}
              value={totalProducts}
              percentage={0} // You can adjust this value
            />
            <Card
              title="Total Orders"
              icon={<LocalShippingIcon />}
              value={totalOrders}
              percentage={15} 
            />
            <Card
              title="Total Clients"
              icon={<GroupIcon />}
              value={totalClients}
              percentage={30} 
            />
             <Card
          title="Total Amount "
          icon={<PaidIcon />}
          value={totalAmountDelivered}
          percentage={0}
        />
          </div>
        </div>
        <div className="stats-section">
          <ProductForm />
          <div className="stats">
            <div
              className="chart"
              style={{
                background: `conic-gradient(
                  rgb(13, 65, 179) 0deg, rgb(13, 65, 179) ${womenPercentage}%,
                  rgb(13, 63, 97) ${womenPercentage}%, rgb(13, 63, 97) ${100 - kidsPercentage}%,
                  rgb(23, 181, 209) ${100 - kidsPercentage}%, rgb(23, 181, 209) 0%
      )`,
              }}
            >
              {" "}
            </div>

            <ul className="key">
              <li>
                <strong class="percent green">{menPercentage}%</strong>
                <span class="choice">MEN</span>
              </li>
              <li>
                <strong class="percent red">{womenPercentage}%</strong>
                <span class="choice">WOMEN</span>
              </li>
              <li>
                <strong class="percent orange">{kidsPercentage}%</strong>
                <span class="choice">KIDS</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="simple-bar-chart">
          <div class="item" style={{ color: `#fff`, height: `${categoryPercentages.Men}px` }}>
            <div class="label">Men</div>
            <div class="value">{categoryPercentages.Men}%</div> 
          </div>
          <div class="item" style={{ color: `#fff`, height: `${categoryPercentages.Women}px` }}>
            <div class="label">Women</div>
            <div class="value">{categoryPercentages.Women}%</div>
          </div>
          <div class="item" style={{ color: `#fff`, height: `${categoryPercentages.Kids}px` }}>
            <div class="label">Kids</div>
            <div class="value">{categoryPercentages.Kids}%</div>
          </div>
        </div>

        <div className="best-clients">
          <h2>Best Clients</h2>
          <ul className="key">
            {bestClients.map((client, index) => (
              <li className="" key={client._id}>
                <strong class="percent">{index + 1}</strong>

                <span className="choice">
                  {client.prenom} {client.nom} - Total Orders:{" "}
                  {client.total_orders}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="best-product">
          <h2>Best Product</h2>
          {bestProduct && (
            <div className="row1">
              <h3>
                {bestProduct.title} ({bestProduct.category}) - Total Sales: {bestProduct.total_sales}
              </h3>
            </div>
          )}
        </div>

        
      </div>
    </>
  );
};

export default AdminHome;
