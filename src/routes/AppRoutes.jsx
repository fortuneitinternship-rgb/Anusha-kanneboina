import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Categories from "../pages/Categories/Categories";
import Wishlist from "../pages/Wishlist/Wishlist";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Checkout from "../pages/Checkout/Checkout";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP/VerifyOTP";
import NewPassword from "../pages/NewPassword/NewPassword";
import SearchResults from "../pages/SearchResults/SearchResults";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} /> 
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/search" element={<SearchResults />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;