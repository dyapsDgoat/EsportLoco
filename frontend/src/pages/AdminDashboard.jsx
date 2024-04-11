import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("products");
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({
    prod_id: "",
    prod_name: "",
    prod_brand: "",
    prod_price: "",
    prod_discount: "",
    prod_stock: "",
  });
  const [newProduct, setNewProduct] = useState({
    prod_name: "",
    prod_brand: "",
    prod_cat: "",
    prod_desc: "",
    prod_price: "",
    prod_discount: "",
    prod_img1: "",
    prod_img2: "",
    prod_img3: "",
    prod_img4: "",
    prod_stock: "",
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/product_list");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllProducts();
  }, []);

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8800/update_product/${editProduct.prod_id}`,
        editProduct
      );

      const res = await axios.get("http://localhost:8800/product_list");
      setProducts(res.data);

      setEditProduct({
        prod_id: "",
        prod_name: "",
        prod_brand: "",
        prod_price: "",
        prod_discount: "",
        prod_stock: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8800/delete_product/${productId}`);

      const res = await axios.get("http://localhost:8800/product_list");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:8800/add_product", newProduct);

      const res = await axios.get("http://localhost:8800/product_list");
      setProducts(res.data);

      setNewProduct({
        prod_name: "",
        prod_brand: "",
        prod_cat: "",
        prod_desc: "",
        prod_price: "",
        prod_discount: "",
        prod_img1: "",
        prod_img2: "",
        prod_img3: "",
        prod_img4: "",
        prod_stock: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div className="admin-dashboard-whole">
      <div className="admin-dashboard-container">
        <nav className="ad-nav">
          <ul>
            <li>
              <a href="#">
                <i className="fas">
                  <FaHome />
                </i>
                <span className="ad-nav-item">Home</span>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fas">
                  <FaUserAlt />
                </i>
                <span className="ad-nav-item">Profile</span>
              </a>
            </li>
            <li>
              <a href="#" className="ad-logout">
                <i className="fas ">
                  <IoIosLogOut />
                </i>
                <span className="ad-nav-item">Log out</span>
              </a>
            </li>
          </ul>
        </nav>

        <section className="ad-main">
          <section className="ad-main-course">
            <h1>Products</h1>
            <table className="ad-product-table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Product Brand</th>
                  <th>Product Price</th>
                  <th>Product Discount</th>
                  <th>Product Stock</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.prod_id}>
                    <td>{product.prod_id}</td>
                    <td>
                      {editProduct.prod_id === product.prod_id ? (
                        <input
                          type="text"
                          value={editProduct.prod_name}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              prod_name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        product.prod_name
                      )}
                    </td>
                    <td>
                      {editProduct.prod_id === product.prod_id ? (
                        <input
                          type="text"
                          value={editProduct.prod_brand}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              prod_brand: e.target.value,
                            })
                          }
                        />
                      ) : (
                        product.prod_brand
                      )}
                    </td>
                    <td>
                      {editProduct.prod_id === product.prod_id ? (
                        <input
                          type="text"
                          value={editProduct.prod_price}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              prod_price: e.target.value,
                            })
                          }
                        />
                      ) : (
                        product.prod_price
                      )}
                    </td>
                    <td>
                      {editProduct.prod_id === product.prod_id ? (
                        <input
                          type="text"
                          value={editProduct.prod_discount}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              prod_discount: e.target.value,
                            })
                          }
                        />
                      ) : (
                        product.prod_discount
                      )}
                    </td>
                    <td>
                      {editProduct.prod_id === product.prod_id ? (
                        <input
                          type="text"
                          value={editProduct.prod_stock}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              prod_stock: e.target.value,
                            })
                          }
                        />
                      ) : (
                        product.prod_stock
                      )}
                    </td>
                    <td>
                      {editProduct.prod_id === product.prod_id ? (
                        <button onClick={handleSave}>Save</button>
                      ) : (
                        <button onClick={() => handleEdit(product)}>
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleDelete(product.prod_id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="ad-second-course">
            <h1>Add Product</h1>
            <form className="ad-form" onSubmit={(e) => e.preventDefault()}>
              <label>
                Product Name:
                <input
                  type="text"
                  name="prod_name"
                  value={newProduct.prod_name}
                  onChange={handleNewProductChange}
                />
              </label>
              <label>
                Product Brand:
                <input
                  type="text"
                  name="prod_brand"
                  value={newProduct.prod_brand}
                  onChange={handleNewProductChange}
                />
              </label>
              <label>
                Product Category:
                <input
                  type="text"
                  name="prod_cat"
                  value={newProduct.prod_cat}
                  onChange={handleNewProductChange}
                />
              </label>
              <label>
                Product Description:
                <input
                  type="text"
                  name="prod_desc"
                  value={newProduct.prod_desc}
                  onChange={handleNewProductChange}
                />
              </label>
              <label>
                Product Price:
                <input
                  type="number"
                  name="prod_price"
                  value={newProduct.prod_price}
                  onChange={handleNewProductChange}
                />
              </label>
              <label>
                Product Discount:
                <input
                  type="number"
                  name="prod_discount"
                  value={newProduct.prod_discount}
                  onChange={handleNewProductChange}
                />
              </label>
              <label>
                Product Img1 Path:
                <input
                  type="text"
                  name="prod_img1"
                  value={newProduct.prod_img1}
                  onChange={handleNewProductChange}
                />
              </label>
              <label>
                Product Img2 Path:
                <input
                  type="text"
                  name="prod_img2"
                  value={newProduct.prod_img2}
                  onChange={handleNewProductChange}
                />
              </label>
              <label>
                Product Img3 Path:
                <input
                  type="text"
                  name="prod_img3"
                  value={newProduct.prod_img3}
                  onChange={handleNewProductChange}
                />
              </label>
              <label>
                Product Img4 Path:
                <input
                  type="text"
                  name="prod_img4"
                  value={newProduct.prod_img4}
                  onChange={handleNewProductChange}
                />
              </label>
              <label>
                Product Stock:
                <input
                  type="number"
                  name="prod_stock"
                  value={newProduct.prod_stock}
                  onChange={handleNewProductChange}
                />
              </label>
              <button type="button" onClick={handleAddProduct}>
                Submit
              </button>
            </form>
          </section>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
