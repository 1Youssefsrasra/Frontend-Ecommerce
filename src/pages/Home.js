import "../css/Home.css";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import { Carousel } from "react-bootstrap";
import WhyUs from "../components/WhyUs";
import { useState, useEffect } from "react";
import ProdCard from "../components/ProdCard";

const Home = () => {
  const [products, setProducts] = useState([]);




  useEffect(() => {
    async function fetchproducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchproducts();
  }, []);

  return (
    <>
      <Navbar />

      <Carousel infiniteLoop autoPlay interval={2000} fade>
        <Carousel.Item interval={10000}>
          <div className="carousel-image-container">
            <img src="img01.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <div className="carousel-image-container">
            <img src="img01.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image-container">
            <img src="img02.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      <section className="shop_section">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Latest Products</h2>
          </div>
          <div className="row">
            {products &&
              products.map((product) => (
                <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
                  <ProdCard product={product}
                  />

                </div>
              ))}
          </div>
        </div>

        <div className="btn-box">
          <a href="/">View All Products</a>
        </div>
      </section>

      <WhyUs />
      <Footer />
    </>
  );
};

export default Home;
