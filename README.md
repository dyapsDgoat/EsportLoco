
EsportLoco E-commerce Platform
Welcome to EsportLoco, an e-commerce platform dedicated to gaming enthusiasts! This platform is built using React.js, Node.js, Express.js for the backend, and MySQL for the database. It provides various endpoints to manage products, user information, shopping carts, and shipping details.

Getting Started
To get started with EsportLoco, follow these steps:

Install Dependencies: Make sure you have Node.js and npm installed on your machine. Then, run npm install to install all the required dependencies.

Set Up Database: Create a MySQL database named esportloco and import the provided SQL schema file to set up the necessary tables.

Configure Database Connection: In app.js, modify the MySQL connection settings according to your database configuration.

Run the Server: Start the Express server by running npm start.

Endpoints
1. GET /product_list
Returns all products available in the product list.
2. GET /product_list_with_stock
Returns products with available stock.
3. POST /user_info
Registers a new user or authenticates an existing user.
4. PUT /update_product/:id
Updates product information based on the provided ID.
5. DELETE /delete_product/:id
Deletes a product from the product list based on the provided ID.
6. POST /add_product
Adds a new product to the product list.
7. POST /add_to_cart
Adds a product to the user's shopping cart.
8. GET /user_cart
Retrieves all items in the user's shopping cart.
9. DELETE /delete_cart_item/:prod_id
Deletes a specific item from the user's shopping cart.
10. POST /increase_quantity/:prod_id
Increases the quantity of a specific item in the user's shopping cart.
11. POST /decrease_quantity/:prod_id
Decreases the quantity of a specific item in the user's shopping cart.
12. POST /checkout
Processes the checkout by inserting shipping details into the database and clearing the user's shopping cart.
13. DELETE /empty_user_cart
Deletes all items from the user's shopping cart.
14. GET /shipping_details
Retrieves shipping details for all orders.
Technologies Used
Frontend: React.js
Backend: Node.js, Express.js
Database: MySQL
Contributors
dyapsDgoat
Feel free to contribute to this project by submitting bug reports, feature requests, or pull requests. Happy shopping at EsportLoco! 🎮🛒
