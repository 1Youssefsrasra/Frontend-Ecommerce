import { useEffect, useState } from "react";
import useProductContext from "../hooks/useProductContext";
import {useAuthContext} from "../hooks/useAuthContext";

import "../css/Products.css";
//components

import ProductDetails from "../components/Productdetails";
//import ProductForm from "../components/ProductForm";

const Products = () => {
  //const [products, setProducts]= useState(null)
  const { products, dispatch } = useProductContext();
  //const [filterMenuActive, setFilterMenuActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {user} = useAuthContext();


  /////////////////////
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


   
  ////////////////

  useEffect(() => {
    const fetchproducts = async () => {
      const response = await fetch("/api/products", {
        headers :{
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        //setProducts(json)
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };

    if(user && user.role==='admin'){
    fetchproducts(); 
  }

  }, [dispatch, user]); //empty array: render once at 1st


    
   /* const toggleFilterMenu = () => {
      setFilterMenuActive(!filterMenuActive);
    };*/


    useEffect(() => {

      if (!products) {
        return; // Avoid processing if products is null
      }

      // Apply the filter when the searchQuery or selectedCategory changes
      const filteredProductsList = selectedCategory === "All Categories"
        ? products
        : products.filter(product => product.category === selectedCategory);
      
      const filteredAndSearchedProducts = filteredProductsList.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      setFilteredProducts(filteredAndSearchedProducts);
    }, [products, selectedCategory, searchQuery]);








  return (
    <div className="products-area-wrapper">


      <div className="app-content-actions">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
         
          <div className="filter-button ">
            <select value={selectedCategory} onChange={handleCategoryChange} >
              <option>All Categories</option>
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          
        </div>


        
      </div>

      <div className="box-container">
        {products &&
          filteredProducts.map((product) => (
            <div className="box">
              <ProductDetails key={product._id} product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
