import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Test from "./pages/Test";
import AdminDashboard from "./pages/AdminDashboard";
import LoginSignup2 from "./pages/LoginSignup2";
import About from "./pages/About";
import Orders from "./pages/Orders";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:userID?" element={<Home />}></Route>
          <Route path="/products/:userID?" element={<ProductList />}></Route>
          <Route
            path="/productPage/:userID?/:productID"
            element={<ProductPage />}
          ></Route>
          <Route path="/cart/:userID?" element={<Cart />}></Route>
          <Route path="/adminlogin" element={<LoginSignup />}></Route>
          <Route path="/adminsignup" element={<LoginSignup2 />}></Route>
          <Route path="/test/:userID" element={<Test />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/aboutus" element={<About />}></Route>
          <Route
            path="/admindashboard/:userID?"
            element={<AdminDashboard />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
