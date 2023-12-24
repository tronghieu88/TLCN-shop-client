import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  //   console.log(userInfo?.status);
  return userInfo?.status ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
