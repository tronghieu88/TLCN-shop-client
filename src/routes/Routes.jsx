import React from "react";
import { Navigate, Redirect, Route, Routes } from "react-router-dom";

import ErrorBoundary from "../components/error/ErrorBoundary";
// Public
import Home from "../screens/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
// Private
import Cart from "../screens/Cart";
import Orders from "../screens/Orders";
import OrderDetail from "../components/order/OrderDetail";
import UserInfor from "../screens/UserInfor";
import ForgotPass from "../components/auth/ForgotPass";
import ChangePass from "../components/auth/ChangePass";
import ProductDetail from "../components/product/ProductDetail";
import ProductList from "../components/product/ProductList";
import NotFound from "../components/error/NotFound";
import PrivateRoute from "../utils/PrivateRoute";
import Help from "../screens/Help";
import General from "../screens/General.";
import ReTypePass from "../components/auth/ReTypePass";
import CompareDetail from "../screens/CompareDetail";
import VerifyEmail from "../components/auth/VerifyEmail";
const Components = () => {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Public -Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/:CategoryName" element={<ProductList />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/help" element={<Help />} />
        <Route path="/general" element={<General />} />
        <Route path="/changepass" element={<ChangePass />} />
        <Route path="/retypepass" element={<ReTypePass />} />
        <Route path="compareDetail" element={<CompareDetail />} />

        {/* Private- Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/user-infor" element={<UserInfor />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-list" element={<Orders />} />
          <Route path="/order/:slug" element={<OrderDetail />} />
        </Route>

        {/*Exception*/}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default Components;
