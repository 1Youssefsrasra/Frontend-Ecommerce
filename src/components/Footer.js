import "./Footer.css";

const Footer = () => {
  return (
    <>
      <section class="info_section">
        
        <div class="info_container ">
          <div class="container">
            <div class="row">
              <div class="col-md-6 col-lg-4">
                <h6>ABOUT US</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  doLorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  doLorem ipsum dolor sit amet,
                </p>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="info_form ">
                  <h5>Newsletter</h5>
                  <form action="#">
                    <input type="email" placeholder="Enter your email" />
                    <button>Subscribe</button>
                  </form>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <h6>CONTACT US</h6>
                <div class="info_link-box">
                  <a href="/">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    <span> Gb road 123 london Uk </span>
                  </a>
                  <a href="/">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    <span>+01 12345678901</span>
                  </a>
                  <a href="/">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    <span> demo@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class=" footer_section">
            <p>
              &copy; <span id="displayYear"></span> All Rights Reserved 2023-2024
            </p>
        </footer>
      </section>
    </>
  );
};

export default Footer;
