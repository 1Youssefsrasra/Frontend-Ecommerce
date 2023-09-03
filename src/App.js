import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

//pages & components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
//import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductForm from './components/ProductForm';
import Clients from './pages/Clients';
import Orders from './pages/Orders';
import AdminHome from './pages/AdminHome';
import "./index.css";
import CartPage from './pages/Cart';
//import Carousel from './components/Carousel';


function App() { 

  const {user} =useAuthContext();

  return (
    <div className="App">    
      <BrowserRouter>
        <div className='pages'>
          <Routes>
          
            <Route path="/" element={ <div className='light'><Home /></div>  } />
            
            <Route path="/Cart" element={<CartPage/>} />
            <Route path="/Add-product" element={ <ProductForm/> } />
            <Route path="/Clients" element={ <Clients/> } />


            <Route path="/Dashboard" element={ <Dashboard/> }/>
            <Route path="/Login" element={ !user ? <Login/> : <Navigate to='/' />}  />
            <Route path="/Signup" element={ !user ? <Signup/>:  <Navigate to='/' /> }/>
            <Route path="/Orders" element={ <Orders/> }/>
            <Route path="/Admin" element={ <AdminHome/> }/>



          </Routes>

        </div>
      </BrowserRouter>

    </div>
    
  ); 
}

export default App;
