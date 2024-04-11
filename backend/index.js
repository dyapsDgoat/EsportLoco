import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "esportloco",
});

// Handle MySQL connection errors
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to the database!");
});

app.use(express.json()); // Corrected middleware usage
app.use(cors());

//  Testing
app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

//  Express route for getting all rows from product_list
app.get("/product_list", (req, res) => {
  const q = "SELECT * FROM product_list";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/product_list_with_stock", (req, res) => {
  const q = "SELECT * FROM product_list WHERE prod_stock > 0";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// Insert user information into the database
app.post("/user_info", (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate that both username and password are provided
    if (!username || !password) {
      console.error("Invalid username or password post");
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password post" });
    }

    // Check if the request body includes 'confirmPassword'
    const isRegistration = "confirmPassword" in req.body;

    // For registration, insert user information into the 'user_info' table
    if (isRegistration) {
      const insertUserQuery =
        "INSERT INTO user_info (user_name, user_password) VALUES (?, ?)";
      const insertUserValues = [username, password];

      db.query(insertUserQuery, insertUserValues, (err, result) => {
        if (err) {
          console.error("Error inserting user into database:", err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }

        console.log("Registration successful!");
        res
          .status(200)
          .json({ success: true, message: "Registration successful!" });
      });
    } else {
      // For login, perform the login logic (query to check if user exists)
      const loginQuery =
        "SELECT user_id FROM user_info WHERE user_name = ? AND user_password = ?";

      db.query(loginQuery, [username, password], (err, data) => {
        if (err) {
          console.error("Error executing login query:", err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }

        if (data.length > 0) {
          const userId = data[0].user_id;
          return res.json({ success: true, userId });
        } else {
          return res.json({
            success: false,
            message: "Invalid username or password",
          });
        }
      });
    }
  } catch (error) {
    console.error("Error processing registration/login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});

app.put("/update_product/:id", (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  const q =
    "UPDATE product_list SET prod_name = ?, prod_brand = ?, prod_price = ?, prod_discount = ?, prod_stock = ? WHERE prod_id = ?";

  db.query(
    q,
    [
      updatedProduct.prod_name,
      updatedProduct.prod_brand,
      updatedProduct.prod_price,
      updatedProduct.prod_discount,
      updatedProduct.prod_stock,
      productId,
    ],
    (err, data) => {
      if (err) {
        console.error("Error updating product:", err);
        return res.json({
          success: false,
          message: "An error occurred during product update",
        });
      }

      return res.json({
        success: true,
        message: "Product updated successfully",
      });
    }
  );
});

app.delete("/delete_product/:id", (req, res) => {
  const productId = req.params.id;

  const q = "DELETE FROM product_list WHERE prod_id = ?";

  db.query(q, [productId], (err, data) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.json({
        success: false,
        message: "An error occurred during product deletion",
      });
    }

    return res.json({
      success: true,
      message: "Product deleted successfully",
    });
  });
});

app.post("/add_product", (req, res) => {
  const {
    prod_name,
    prod_brand,
    prod_cat,
    prod_desc,
    prod_price,
    prod_discount,
    prod_img1,
    prod_img2,
    prod_img3,
    prod_img4,
    prod_stock,
  } = req.body;

  const q = `
    INSERT INTO product_list 
    (prod_name, prod_brand, prod_cat, prod_desc, prod_price, prod_discount, prod_img1, prod_img2, prod_img3, prod_img4, prod_stock) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    q,
    [
      prod_name,
      prod_brand,
      prod_cat,
      prod_desc,
      prod_price,
      prod_discount,
      prod_img1,
      prod_img2,
      prod_img3,
      prod_img4,
      prod_stock,
    ],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.json({ success: false, message: "Failed to add product" });
      }

      return res.json({ success: true, message: "Product added successfully" });
    }
  );
});

app.post("/add_to_cart", async (req, res) => {
  const {
    prod_id,
    product_name,
    product_brand,
    product_price,
    product_discount,
    product_quantity,
    product_size,
    product_img1, // Include the new field in the request body
  } = req.body;

  // Placeholder logic to check if the product is already in the cart
  const checkQuery = "SELECT * FROM user_cart WHERE prod_id = ?";
  db.query(checkQuery, [prod_id], (checkErr, checkResult) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (checkResult.length > 0) {
      // If the product is already in the cart, update the quantity and other fields
      const existingCartItem = checkResult[0];
      const updatedQuantity =
        existingCartItem.product_quantity + product_quantity;
      const updateQuery = `
        UPDATE user_cart
        SET product_quantity = ?,
            product_img1 = ?  -- Include the new field in the update
        WHERE prod_id = ?;
      `;

      db.query(
        updateQuery,
        [updatedQuantity, product_img1, prod_id],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error(updateErr);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          return res.status(200).json({
            message:
              "Product quantity and image updated in the cart successfully",
          });
        }
      );
    } else {
      // If the product is not in the cart, add a new entry
      const insertQuery = `
        INSERT INTO user_cart (prod_id, product_name, product_brand, product_price, product_discount, product_quantity, product_size, product_img1)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;

      db.query(
        insertQuery,
        [
          prod_id,
          product_name,
          product_brand,
          product_price,
          product_discount,
          product_quantity,
          product_size,
          product_img1, // Include the new field in the insert
        ],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error(insertErr);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          return res
            .status(200)
            .json({ message: "Product added to the cart successfully" });
        }
      );
    }
  });
});

app.get("/user_cart", (req, res) => {
  const query = `
    SELECT prod_id, product_name, product_brand, product_price, product_discount, product_quantity, product_size, product_img1
    FROM user_cart;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("Fetched data:", result);
    return res.status(200).json(result);
  });
});

app.delete("/delete_cart_item/:prod_id", (req, res) => {
  const { prod_id } = req.params;

  const deleteQuery = `
    DELETE FROM user_cart
    WHERE prod_id = ?;
  `;

  db.query(deleteQuery, [prod_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Cart item deleted successfully" });
    } else {
      return res.status(404).json({ error: "Cart item not found" });
    }
  });
});

app.post("/increase_quantity/:prod_id", async (req, res) => {
  const { prod_id } = req.params;

  try {
    // Fetch the current item from the cart
    const [currentItem] = await new Promise((resolve, reject) => {
      const query = `
        SELECT prod_id, product_quantity
        FROM user_cart
        WHERE prod_id = ?;
      `;
      db.query(query, [prod_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    if (!currentItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Calculate the new quantity (you can adjust this logic based on your requirements)
    const newQuantity = currentItem.product_quantity + 1;

    // Update the quantity in the database
    const updateQuery = `
      UPDATE user_cart
      SET product_quantity = ?
      WHERE prod_id = ?;
    `;
    db.query(updateQuery, [newQuantity, prod_id], (updateErr, updateResult) => {
      if (updateErr) {
        console.error("Error updating quantity:", updateErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Return the updated cart
      const query = `
        SELECT prod_id, product_name, product_brand, product_price, product_discount, product_quantity, product_size, product_img1
        FROM user_cart;
      `;
      db.query(query, (err, result) => {
        if (err) {
          console.error("Error fetching updated cart:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.status(200).json(result);
      });
    });
  } catch (error) {
    console.error("Error increasing quantity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Decrease quantity
app.post("/decrease_quantity/:prod_id", async (req, res) => {
  const { prod_id } = req.params;

  try {
    // Fetch the current item from the cart
    const query = `
      SELECT prod_id, product_quantity
      FROM user_cart
      WHERE prod_id = ?;
    `;

    db.query(query, [prod_id], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      const currentItem = result[0];

      // Ensure the quantity does not go below 1
      const newQuantity = Math.max(1, currentItem.product_quantity - 1);

      // Update the quantity in the database
      const updateQuery = `
        UPDATE user_cart
        SET product_quantity = ?
        WHERE prod_id = ?;
      `;

      db.query(
        updateQuery,
        [newQuantity, prod_id],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error(updateErr);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          // Return the updated cart
          const selectQuery = `
          SELECT prod_id, product_name, product_brand, product_price, product_discount, product_quantity, product_size, product_img1
          FROM user_cart;
        `;

          db.query(selectQuery, (selectErr, selectResult) => {
            if (selectErr) {
              console.error(selectErr);
              return res.status(500).json({ error: "Internal Server Error" });
            }

            res.status(200).json(selectResult);
          });
        }
      );
    });
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/checkout", async (req, res) => {
  console.log("Checkout request received");

  const {
    first_name,
    last_name,
    contact_number,
    house_number,
    street_name,
    city,
    zip_code,
    cartItems, // Array of items in the cart
  } = req.body;

  console.log("Received data:", req.body);

  // Validate all fields
  if (
    !first_name ||
    !last_name ||
    !contact_number ||
    !house_number ||
    !street_name ||
    !city ||
    !zip_code
  ) {
    console.log("Validation failed");
    return res.status(400).json({
      error: "Please fill out all fields before checking out.",
    });
  }

  console.log("Validation passed");

  // Insert shipping details into the shipping_details table
  const insertShippingDetailsQuery = `
    INSERT INTO shipping_details 
    (first_name, last_name, contact_number, house_number, street_name, city, zip_code, prod_id, product_name, product_brand, product_price, product_discount, product_quantity, product_size, product_img1, product_total_price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Assuming cartItems is an array of items in the cart
  for (const item of cartItems) {
    console.log("Inserting data for item:", item);
    const params = [
      first_name,
      last_name,
      contact_number,
      house_number,
      street_name,
      city,
      zip_code,
      item.prod_id,
      item.product_name,
      item.product_brand,
      item.product_price,
      item.product_discount,
      item.product_quantity,
      item.product_size,
      item.product_img1,
      item.product_total_price,
    ];

    await db.query(insertShippingDetailsQuery, params);
  }
  // Clear the user's cart after successful checkout
  const clearCartQuery = `
DELETE FROM user_cart;
`;

  // Execute the query to clear the entire user_cart table
  await db.query(clearCartQuery);

  console.log("Checkout successful");

  res.status(200).json({ message: "Checkout successful" });
});

// Express route to delete all rows from user_cart
app.delete("/empty_user_cart", (req, res) => {
  const sql = "DELETE FROM user_cart";
  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error deleting rows from user_cart:", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("User cart emptied successfully.");
      res.status(204).send();
    }
  });
});

//  Express route for getting the rows of shipping_details
app.get("/shipping_details", (req, res) => {
  const q = "SELECT * FROM shipping_details";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});
