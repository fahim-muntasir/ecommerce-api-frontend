import { useEffect } from "react";
import SearchBarModal from "./SearchBarModal";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import "./index.css";
import "./SearchBarModal.css";
import $ from "jquery";
import { CartContext } from "../context/CartProvider";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider"

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    $("#searchbar").on("click", function () {
      $(".modal-search").slideToggle();
    });

    $("#close-searchbar").on("click", function () {
      $(".modal-search").slideUp();
    });

    return () => {
      $("#searchbar").off("click");
      $("#close-searchbar").off("click");
    };
  }, []);
  const { pathname } = useLocation();
  // const user = localStorage.getItem("user");

  return (
    <header>
      <div className="global-notification">
        <div className="container">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit
            <a href="shop.html"> SATIN AL</a>
          </p>
        </div>
      </div>

      <div className="header-row">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-mobile">
              <i className="bi bi-list" id="btn-menu"></i>
            </div>
            <div className="header-left">
              <Link to={"/"}>LOGO</Link>
            </div>

            <div className="header-center" id="sidebar">
              <nav className="navigation">
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <Link
                      to={"/"}
                      className={` menu-link ${pathname === "/" && "active"}  `}
                    >
                      Home 
                      {/* <i className="bi bi-chevron-down"></i> */}
                    </Link>
                    {/* <div className="menu-dropdown-wrapper">
                      <ul className="menu-dropdown-content">
                        <li>
                          <a href="#">Lorem1</a>
                        </li>
                        <li>
                          <a href="#">Lorem1</a>
                        </li>
                        <li>
                          <a href="#">Lorem1</a>
                        </li>
                        <li>
                          <a href="#">Lorem1</a>
                        </li>
                        <li>
                          <a href="#">Lorem1</a>
                        </li>
                        <li>
                          <a href="#">Lorem1</a>
                        </li>
                        <li>
                          <a href="#">Lorem1</a>
                        </li>
                        <li>
                          <a href="#">Lorem1</a>
                        </li>
                        <li>
                          <a href="#">Lorem1</a>
                        </li>
                      </ul>
                    </div> */}
                  </li>
                  <li className="menu-list-item">
                    <Link
                      to={"/shop"}
                      className={` menu-link ${
                        pathname === "/shop" && "active"
                      }  `}
                    >
                      Shop <i className="bi bi-chevron-down"></i>
                    </Link>
                    <div className="menu-dropdown-wrapper">
                      <ul className="menu-dropdown-content">
                        <li>
                          <Link to={"/shop"}>All Products</Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="menu-list-item">
                    <Link to={"/blogs"} className="menu-link">
                      Blog
                    </Link>
                  </li>
                  <li className="menu-list-item">
                    <Link
                      to={"/Contact"}
                      className={` menu-link ${
                        pathname === "/Contact" && "active"
                      }  `}
                    >
                      Contact{" "}
                    </Link>
                  </li>
                </ul>
              </nav>
              <i className="bi-x" id="close-sidebar"></i>
            </div>
            <div className="header-right">
              <div className="header-right-links">
                <Link to={"/account"} className="header-account">
                  <i className="bi bi-person"></i>
                </Link>

                <div className="header-cart">
                  <Link to={"/cart"} className="header-cart-link">
                    <i className="bi bi-bag"></i>
                    <span className="header-cart-count">
                      {cartItems.length}
                    </span>
                  </Link>
                </div>
                <a href="#" className="searchbarxd">
                  <i className="bi bi-search" id="searchbar"></i>
                </a>
                {user && (
                  <button
                    className="logoutbtn"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure to logout?"
                        )
                      ) {
                        {
                          logout();
                        }
                      }
                    }}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchBarModal />
    </header>
  );
};

export default Header;
