import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoOptionsSharp } from "react-icons/io5";
import "./ProductList.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products with stock
        const res = await axios.get(
          "http://localhost:8800/product_list_with_stock"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the selected brand
    if (selectedBrand) {
      const filtered = products.filter(
        (product) => product.prod_brand === selectedBrand
      );
      setFilteredProducts(filtered);
    } else {
      // If no brand is selected, show all products
      setFilteredProducts(products);
    }
  }, [selectedBrand, products]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  return (
    <div>
      <Navigation />
      <div className="product-list-section">
        <div className="products">
          <div className="container">
            <h1 className="lg-title">ALL ESPORT APPAREL</h1>
            <p className="text-light">
              EsportLoco is your one-stop destination for a premium collection
              of esports apparel, offering a diverse range that combines style
              and comfort to elevate your gaming experience. Our carefully
              curated selection includes trendy and exclusive items that reflect
              the dynamic and vibrant spirit of the gaming community.
            </p>

            <div className="dropdown-brands">
              <button className="dropbtn">
                <IoOptionsSharp size={30} />
              </button>
              <div className="dropdown-content">
                <a onClick={() => handleBrandChange(null)}>ALL PRODUCTS</a>
                <a onClick={() => handleBrandChange("G2")}>G2</a>
                <a onClick={() => handleBrandChange("T1")}>T1</a>
                <a onClick={() => handleBrandChange("FNATIC")}>FNATIC</a>
                <a onClick={() => handleBrandChange("REKKLES")}>REKKLES</a>
                <a onClick={() => handleBrandChange("KCORP")}>KCORP</a>
              </div>
            </div>

            <div className="product-items">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="product" key={product.prod_id}>
                    <div className="product-content">
                      <Link
                        to={`/productPage/${product.prod_id}`}
                        key={product.prod_id}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="product-img">
                          <img src={product.prod_img1} alt="product image" />
                        </div>
                      </Link>
                      <Link
                        to={`/productPage/${product.prod_id}`}
                        key={product.prod_id}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="product-btns">
                          <button type="button" className="btn-cart">
                            VIEW PRODUCT
                          </button>
                        </div>
                      </Link>
                    </div>
                    <div className="product-info">
                      <div className="product-info-top">
                        <h2 className="sm-title">{product.prod_cat}</h2>
                        <div className="rating">
                          <p>
                            <strong>{product.prod_brand}</strong>
                          </p>
                        </div>
                      </div>
                      <a href="#" className="product-name">
                        {product.prod_name}
                      </a>
                      {product.prod_discount ? (
                        <>
                          <p className="product-price discounted">
                            ${product.prod_price}
                          </p>
                          <p className="product-price">
                            $
                            {product.prod_price -
                              product.prod_price *
                                (product.prod_discount / 100)}
                          </p>
                        </>
                      ) : (
                        <p className="product-discounted">
                          ${product.prod_price}
                        </p>
                      )}
                    </div>
                    // dito
                    {product.prod_discount !== null &&
                      product.prod_discount > 0 && (
                        <div className="off-info">
                          <h2 className="sm-title">
                            {product.prod_discount}% off
                          </h2>
                        </div>
                      )}
                  </div>
                ))
              ) : (
                <p className="no-product">No products</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
