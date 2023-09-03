import "../css/Dashboard.css";
import HomeIcon from "@mui/icons-material/Home";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import GroupIcon from "@mui/icons-material/Group";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Products from "./Products";
import { Link } from 'react-router-dom';

const Dashboard = () => {


  return (
    <>
      <div className="app-container">


        <div className="sidebar">
          <div className="sidebar-header">
            <div className="app-icon">LOGO</div>
          </div>
          <ul className="sidebar-list">
            <li className="sidebar-list-item">
            <Link to="/Admin">
                <HomeIcon />
                <span> Home</span>
              </Link>
            </li>
            <li className="sidebar-list-item active">
              <a href="/">
                <LocalMallIcon />
                <span> Products</span>
              </a>
            </li>
            <li className="sidebar-list-item">
            <Link to="/Clients">
                <GroupIcon />
                <span> Clients</span>
              </Link>
            </li>
            <li className="sidebar-list-item">
            <Link to="/Orders">
                <LocalShippingIcon />
                <span> Orders</span>
                </Link>
            </li>
          </ul>
        </div>

        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Products</h1>
            <Link to="/Add-product">
            <button className="app-content-headerButton" >Add Product</button>
            </Link>
          </div>

          <div className="products-section">
            <Products/>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
