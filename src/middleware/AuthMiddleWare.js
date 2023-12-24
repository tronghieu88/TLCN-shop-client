import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { getProfile, logout } from "../actions/userActions";

const AuthMiddleWare = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  // dispatch(getProfile());
  const navigate = useNavigate();
  // console.log(userInfo);
  if (userInfo) {
    const decodedToken = jwtDecode(userInfo.data.access_token);
    const currentTime = Date.now() / 1000;
    // console.log(decodedToken);
    // console.log(currentTime);
    // console.log(decodedToken.exp < currentTime);
    if (decodedToken.exp < currentTime) {
      // Token has expired
      toast.info("Token hết hạn, mời bạn đăng nhập lại!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(logout());
      navigate(`/login`);
    } else {
      // Token is still valid
      // toast.success(`Chào  ${userInfo.data}`, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      return children;
    }
  }
  return children;
};

export default AuthMiddleWare;
