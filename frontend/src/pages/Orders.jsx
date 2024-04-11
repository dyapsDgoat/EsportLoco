import React, { useState, useEffect } from "react";
import "./Orders.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/shipping_details"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navigation />

      <div className="Orders">
        <div className="order-list">
          <div className="title">Orders</div>
          {orders.map((order) => (
            <div className="item" key={order.shipping_id}>
              <div className="cart-image">
                <img src={order.product_img1} alt="Product Image" />
              </div>
              <div className="cart-description">
                <span>{order.product_name}</span>
                <span>{order.product_brand}</span>
                <span>Quantity: {order.product_quantity}</span>
                <span>Total Price: ₱{order.product_total_price}</span>
              </div>
              <div className="address">
                <p>Shipping Address:</p>
                <p>
                  {order.first_name} {order.last_name}
                </p>
                <p>
                  {order.house_number} {order.street_name}, {order.city}{" "}
                  {order.zip_code}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Orders;
