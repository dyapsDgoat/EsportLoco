import React, { useState, useEffect } from "react";
import "./Cart.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total_price, setTotalPrice] = useState(0);

  // State variables for user information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8800/user_cart");
        console.log(response.data);
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateItemTotal = (item) => {
    return (
      item.product_price - item.product_price * (item.product_discount / 100)
    );
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      cartItems.forEach((item) => {
        const itemTotal =
          (item.product_price -
            item.product_price * (item.product_discount / 100)) *
          item.product_quantity;
        totalPrice += itemTotal;
      });
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [cartItems]);

  const handleDeleteItem = async (prod_id) => {
    try {
      await axios.delete(`http://localhost:8800/delete_cart_item/${prod_id}`);
      // After deletion, fetch the updated cart items
      const response = await axios.get("http://localhost:8800/user_cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleIncreaseQuantity = async (prod_id) => {
    try {
      await axios.post(`http://localhost:8800/increase_quantity/${prod_id}`);
      // After increasing quantity, fetch the updated cart items
      const response = await axios.get("http://localhost:8800/user_cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleDecreaseQuantity = async (prod_id) => {
    try {
      // Make a POST request to decrease the quantity
      await axios.post(`http://localhost:8800/decrease_quantity/${prod_id}`);

      // After decreasing quantity, fetch the updated cart items
      const response = await axios.get("http://localhost:8800/user_cart");

      // Update your cart items in the state
      setCartItems(response.data);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const handleCheckout = async () => {
    // Validate all fields
    if (
      !firstName ||
      !lastName ||
      !contactNumber ||
      !houseNumber ||
      !streetName ||
      !city ||
      !zipCode
    ) {
      window.alert("Please fill out all fields before checking out.");
      return;
    } else {
      try {
        // Map the cart items to include product_total_price
        const checkoutData = cartItems.map((item) => ({
          ...item,
          product_total_price: calculateItemTotal(item) * item.product_quantity,
        }));

        // Make a POST request to the checkout endpoint
        await axios.post("http://localhost:8800/checkout", {
          first_name: firstName,
          last_name: lastName,
          contact_number: contactNumber,
          house_number: houseNumber,
          street_name: streetName,
          city: city,
          zip_code: zipCode,
          cartItems: checkoutData, // Pass the modified cart items
        });

        // After successful checkout, you can navigate the user to a confirmation page or perform other actions.
        window.alert("Checkout successful!");
      } catch (error) {
        console.error("Error during checkout:", error);
        // Handle errors as needed
      }
    }
  };

  return (
    <div className="Cart">
      <Navigation />
      <div className="shopping-cart">
        <div className="title">Your Cart</div>
        {cartItems.map((item) => (
          <div className="item" key={item.prod_id}>
            <div
              className="cart-buttons"
              onClick={() => handleDeleteItem(item.prod_id)}
            >
              <MdDelete size={20} />
            </div>
            <div className="cart-image">
              <img src={item.product_img1} alt={item.product_name} />
            </div>
            <div className="cart-description">
              <span>{item.product_name}</span>
              <span>{item.product_brand}</span>
              <span>{item.product_size}</span>
              <span>P{calculateItemTotal(item)}</span>
            </div>
            <div className="quantity">
              <button
                className="plus-btn"
                type="button"
                name="button"
                onClick={() => handleIncreaseQuantity(item.prod_id)}
              >
                <FaPlus />
              </button>
              <input
                type="text"
                name="name"
                value={item.product_quantity}
                readOnly
              />
              <button
                className="minus-btn"
                type="button"
                name="button"
                onClick={() => handleDecreaseQuantity(item.prod_id)}
              >
                <TiMinus size={15} />
              </button>
            </div>
          </div>
        ))}
        <div className="total_price">
          <h4>Total Price: P{total_price.toFixed(2)}</h4>
        </div>
        <div className="cart_checkout">
          <div className="title">Checkout</div>
          <div className="checkout-container">
            <h4>We only offer Cash on Delivery as of the moment</h4>
            <form className="cart-checkout-form">
              <label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Contact Number"
                  name="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="House No."
                  name="houseNumber"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Street Name"
                  name="streetName"
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Zip Code"
                  name="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </label>
              <button
                className="checkout-btn"
                type="button"
                onClick={handleCheckout}
              >
                CHECKOUT
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
