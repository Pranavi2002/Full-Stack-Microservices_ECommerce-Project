import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles.css"; // Import CSS globally

const AppRoutes = () => (
  <Router>
    <Navbar/>
    <div className="container">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  </Router>
);

export default AppRoutes;