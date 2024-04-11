import React, { useState } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Navigation = () => {
  const [overlayActive, setOverlayActive] = useState(false);

  const { userID } = useParams();
  console.log("user ID", userID);
  const handleMenuOpen = () => {
    setOverlayActive(true);
  };

  const handleMenuClose = () => {
    setOverlayActive(false);
  };

  const handleLinkClick = () => {
    // Close the menu when a link is clicked
    handleMenuClose();
  };

  return (
    <>
      <header>
        <Link className="logo" to="/">
          ESPORTLOCO
        </Link>
        <nav>
          <ul className="nav__links">
            <li>
              <Link to="/products" onClick={handleLinkClick}>
                PRODUCTS
              </Link>
            </li>
            <li>
              <Link to="/aboutus" onClick={handleLinkClick}>
                ABOUT US
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={handleLinkClick}>
                CART
              </Link>
            </li>
            <li>
              <Link to="/orders" onClick={handleLinkClick}>
                ORDERS
              </Link>
            </li>
          </ul>
        </nav>
        <Link className="cta" to="/">
          Home
        </Link>
        <p className="menu cta" onClick={handleMenuOpen}>
          Menu
        </p>
      </header>
      <div className={`overlay ${overlayActive ? "overlay--active" : ""}`}>
        <button className="close" onClick={handleMenuClose}>
          &times;
        </button>
        <div className="overlay__content">
          <Link to="/products" onClick={handleLinkClick}>
            Products
          </Link>
          <Link to="/aboutus" onClick={handleLinkClick}>
            About Us
          </Link>
          <Link to="/cart" onClick={handleLinkClick}>
            Cart
          </Link>
          <Link to="/orders" onClick={handleLinkClick}>
            Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
