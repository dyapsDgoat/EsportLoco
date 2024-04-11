import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation";
import { FaCheckCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import "./ProPage/ProductPage.css";

const ProductPage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [productSize, setProductSize] = useState("S");

  const handleSizeClick = (size) => {
    setProductSize(size);
  };

  const addToCart = async () => {
    try {
      const existingCartItem = await checkIfProductExistsInCart(
        product.prod_id
      );

      if (existingCartItem) {
        // If the product is already in the cart, update the quantity
        const updatedQuantity = existingCartItem.product_quantity + 1;
        await axios.put("http://localhost:8800/update_cart_item", {
          prod_id: product.prod_id,
          product_quantity: updatedQuantity,
        });
      } else {
        // If the product is not in the cart, add a new entry
        await axios.post("http://localhost:8800/add_to_cart", {
          prod_id: product.prod_id,
          product_name: product.prod_name,
          product_brand: product.prod_brand,
          product_price: product.prod_price,
          product_discount: product.prod_discount,
          product_quantity: 1, // You may adjust the quantity as needed
          product_size: productSize, // Assuming you have a way to determine the product size
          product_img1: product.prod_img1, // Include product_img1 in the request
        });
      }

      window.alert("Product added to the cart successfully");
      console.log("Product added to the cart successfully");
    } catch (err) {
      console.error("Error adding product to the cart", err);
    }
  };

  const checkIfProductExistsInCart = async (prodId) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/check_product_in_cart/${prodId}`
      );
      return res.data;
    } catch (err) {
      console.error("Error checking if product exists in the cart", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/product_list`);
        const foundProduct = res.data.find(
          (p) => p.prod_id === parseInt(productID)
        );

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.log("Product not found");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [productID]);

  return (
    <div className="product-page">
      <Navigation />
      {product ? (
        <>
          <div className={"container"}>
            <div className="box">
              <div className="images">
                <div className="img-holder active">
                  <img
                    src={
                      process.env.PUBLIC_URL + product.prod_img1.substring(1)
                    }
                  />
                </div>
                <div className="img-holder">
                  <img
                    src={
                      process.env.PUBLIC_URL + product.prod_img2.substring(1)
                    }
                  />
                </div>
                <div className="img-holder">
                  <img
                    src={
                      process.env.PUBLIC_URL + product.prod_img3.substring(1)
                    }
                  />
                </div>
                <div className="img-holder">
                  <img
                    src={
                      process.env.PUBLIC_URL + product.prod_img4.substring(1)
                    }
                  />
                </div>
              </div>
              <div className="basic-info">
                <h1>{product.prod_name}</h1>
                <span>
                  $
                  {product.prod_price -
                    product.prod_price * (product.prod_discount / 100)}
                </span>
                <div className="options">
                  <button className="add-to-cart-button" onClick={addToCart}>
                    ADD TO CART
                  </button>
                </div>

                <div className="product-sizes">
                  <p> SIZES</p>
                  <button
                    onClick={() => handleSizeClick("S")}
                    style={{
                      backgroundColor: productSize === "S" ? "white" : "",
                      color: productSize === "S" ? "black" : "",
                    }}
                  >
                    S
                  </button>
                  <button
                    onClick={() => handleSizeClick("M")}
                    style={{
                      backgroundColor: productSize === "M" ? "white" : "",
                      color: productSize === "M" ? "black" : "",
                    }}
                  >
                    M
                  </button>
                  <button
                    onClick={() => handleSizeClick("L")}
                    style={{
                      backgroundColor: productSize === "L" ? "white" : "",
                      color: productSize === "L" ? "black" : "",
                    }}
                  >
                    L
                  </button>
                </div>
              </div>
              <div className="description">
                <p>{product.prod_desc}</p>
                <ul className="features">
                  <h3>Features</h3>
                  <li>
                    <FaCheckCircle size={15} /> 60% Cotton
                  </li>
                  <li>
                    <FaCheckCircle size={15} /> 40% Polyester
                  </li>
                  <li>
                    <FaCheckCircle size={15} /> Fit and Style
                  </li>
                  <li>
                    <FaCheckCircle size={15} /> Moisture Wicking
                  </li>
                  <li>
                    <FaCheckCircle size={15} /> Comfortable Fabric
                  </li>
                  <br></br>
                  <h5>Washing Instructions</h5>
                  <h4>
                    <FaHeart size={12} /> Mashine Wash Cold
                  </h4>
                  <h4>
                    <FaHeart size={12} /> Avoid Fabric Softeners
                  </h4>
                  <br></br>
                </ul>
                <ul className="social">
                  <li>
                    <a href="#">
                      <FaFacebook size={30} />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaInstagram size={30} />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaTwitter size={30} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;
