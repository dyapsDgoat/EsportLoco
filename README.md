# EsportLoco E-commerce Platform

Welcome to EsportLoco, an e-commerce platform dedicated to gaming enthusiasts! This platform is built using React.js for the frontend, Node.js for the backend, Express.js for the server, and MySQL for the database. It provides various endpoints to manage products, user information, shopping carts, and shipping details.

![image](https://github.com/dyapsDgoat/EsportLoco/assets/95419316/9be29e82-d105-4deb-bb8c-6a742291e72e)
![image](https://github.com/dyapsDgoat/EsportLoco/assets/95419316/97d4b0ca-f5f2-403f-8f3d-32b2b4bc32a9)



## Getting Started

To get started with EsportLoco, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.

2. **Install Dependencies**: Navigate to the project directory and run `npm install` to install all the required dependencies for both the frontend and backend.

3. **Set Up Database**: Create a MySQL database named `esportloco` and import the provided SQL schema file to set up the necessary tables.

4. **Configure Database Connection**: In the backend (`server.js`), modify the MySQL connection settings according to your database configuration.

5. **Run the Server**: Start the Express server by running `npm start` in the `backend` directory.

6. **Run the Frontend**: Start the React development server by running `npm start` in the `frontend` directory.

7. **Access the Application**: Open your browser and navigate to `http://localhost:3000` to access the EsportLoco e-commerce platform.

## Endpoints

### Backend Endpoints

1. **GET `/product_list`**

   - Returns all products available in the product list.

2. **GET `/product_list_with_stock`**

   - Returns products with available stock.

3. **POST `/user_info`**

   - Registers a new user or authenticates an existing user.

4. **PUT `/update_product/:id`**

   - Updates product information based on the provided ID.

5. **DELETE `/delete_product/:id`**

   - Deletes a product from the product list based on the provided ID.

6. **POST `/add_product`**

   - Adds a new product to the product list.

7. **POST `/add_to_cart`**

   - Adds a product to the user's shopping cart.

8. **GET `/user_cart`**

   - Retrieves all items in the user's shopping cart.

9. **DELETE `/delete_cart_item/:prod_id`**

   - Deletes a specific item from the user's shopping cart.

10. **POST `/increase_quantity/:prod_id`**

    - Increases the quantity of a specific item in the user's shopping cart.

11. **POST `/decrease_quantity/:prod_id`**

    - Decreases the quantity of a specific item in the user's shopping cart.

12. **POST `/checkout`**

    - Processes the checkout by inserting shipping details into the database and clearing the user's shopping cart.

13. **DELETE `/empty_user_cart`**

    - Deletes all items from the user's shopping cart.

14. **GET `/shipping_details`**

    - Retrieves shipping details for all orders.

### Frontend Routes

- **Home**: Displays the list of products available for purchase.
- **Login/Register**: Allows users to log in to an existing account or register a new one.
- **Product Details**: Displays detailed information about a selected product.
- **Shopping Cart**: Displays the items added to the user's shopping cart and allows them to proceed to checkout.
- **Checkout**: Allows users to enter shipping details and complete the purchase.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Contributors

- james Gabriel Japson (https://github.com/dyapsDgoat)

Feel free to contribute to this project by submitting bug reports, feature requests, or pull requests. Happy shopping at EsportLoco! 🎮🛒
