import "./Footer.css"


const Footer = () => {
    return (

        <footer className="footer">
        <div className="contactarea">
          <div className="container">
            <div className="contactarea-wrapper">
              <div className="contactarea-email">
                <h1 className="email-title">
                  E-Mail us on new items, sales and requests.
                </h1>
                <p className="email-desc">You can contact us by our e-mail address.</p>
                <h3 className="contactarea-email-address">example@example</h3>
                <form>
                  <input type="text" placeholder="Enter your e-mail address." />
                  <button className="btn-subscribe">Subscribe</button>
                </form>
              </div>
              <div className="contactarea-phone">
                <h1 className="phone-title">Need help?</h1>
                <h1 className="phone-title-2">1131 261 31 16</h1>
                <p className="phone-desc">Available between 8.00am - 7.00pm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="widgets-row">
          <div className="container">
            <div className="footer-widgets">
              <div className="brand-info">
                <div className="footer-logo">
                  <a href="index.html" className="logo">LOGO</a>
                </div>
                <div className="footer-desc">
                  <p>
                    Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                    maecenas accumsan lacus vel facilisis
                  </p>
                </div>
                <div className="footer-contact">
                  <p>
                    <a href="tel:555 555 55 55">1313 1234 5678 90</a> –
                    <a href="mailto:info@example.com">example@example</a>
                  </p>
                </div>
              </div>
              <div className="widget-nav-menu">
                <h4>Information</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Returns Policy</a>
                  </li>
                  <li>
                    <a href="#">Shipping Policy</a>
                  </li>
                  <li>
                    <a href="#">Dropshipping</a>
                  </li>
                </ul>
              </div>
              <div className="widget-nav-menu">
                <h4>Account</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Dashboard</a>
                  </li>
                  <li>
                    <a href="#">My Orders</a>
                  </li>
                  <li>
                    <a href="#">My Wishlist</a>
                  </li>
                  <li>
                    <a href="#">Account details</a>
                  </li>
                  <li>
                    <a href="#">Track My Orders</a>
                  </li>
                </ul>
              </div>
              <div className="widget-nav-menu">
                <h4>Shop</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Affiliate</a>
                  </li>
                  <li>
                    <a href="#">Bestsellers</a>
                  </li>
                  <li>
                    <a href="#">Discount</a>
                  </li>
                  <li>
                    <a href="#">Latest Products</a>
                  </li>
                  <li>
                    <a href="#">Sale Products</a>
                  </li>
                </ul>
              </div>
              <div className="widget-nav-menu">
                <h4>Categories</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Women</a>
                  </li>
                  <li>
                    <a href="#">Men</a>
                  </li>
                  <li>
                    <a href="#">Bags</a>
                  </li>
                  <li>
                    <a href="#">Outerwear</a>
                  </li>
                  <li>
                    <a href="#">Shoes</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-row">
          <div className="container">
            <div className="footer-copyright">
              <div className="site-copyright">
                <p>
                  Copyright 2022 © Silicium. All rights reserved. Powered by Uygi.
                </p>
              </div>
              <div className="footer-menu">
                <ul className="footer-menu-list">
                  <li className="list-item">
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li className="list-item">
                    <a href="#">Terms and Conditions</a>
                  </li>
                  <li className="list-item">
                    <a href="#">Returns Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

    )
}

export default Footer;