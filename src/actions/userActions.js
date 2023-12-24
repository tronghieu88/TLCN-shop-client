import axios from "axios";
import {
  USER_ADD_ADDRESS_REQUEST,
  USER_ADD_ADDRESS_SUCCESS,
  USER_ADD_ADDRESS_FAIL,
  USER_ADDRESS_DETAIL_FAIL,
  USER_ADDRESS_DETAIL_REQUEST,
  USER_ADDRESS_DETAIL_SUCCESS,
  USER_DELETE_ADDRESS_FAIL,
  USER_DELETE_ADDRESS_REQUEST,
  USER_DELETE_ADDRESS_SUCCESS,
  USER_GET_PROFILE_FAIL,
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_AVATAR_FAIL,
  USER_UPDATE_AVATAR_REQUEST,
  USER_UPDATE_AVATAR_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_ADDRESS_REQUEST,
  USER_UPDATE_ADDRESS_SUCCESS,
  USER_UPDATE_ADDRESS_FAIL,
  USER_REGISTER_RESET,
  USER_VERIFY_EMAIL_REQUEST,
  USER_VERIFY_EMAIL_FAIL,
  USER_VERIFY_EMAIL_RESET,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_SEND_EMAIL_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_RESET,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_RESET,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
} from "../constants/userConstants";
import {
  CART_LIST_RESET,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import { ORDER_HISTORY_RESET } from "../constants/orderConstants";
import { Server, localhost } from "../apis/Api";
import { toast } from "react-toastify";
import { toastSuccess, toastWarn } from "../utils/ultils";
import { useNavigate, Link } from "react-router-dom";
export const login = (email, password) => async (dispatch) => {
  try {
    console.log(email, password);
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${Server}/api/auth/login`,
      { email, password },
      config
    );
    // const addressDetail = data.data.user.addresses.find(
    //   (address) => address.idDefault === true
    // )
    console.log("data");
    console.log(data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    // dispatch({
    //   type: CART_SAVE_SHIPPING_ADDRESS,
    //   payload: addressDetail,
    // })

    localStorage.setItem("userInfo", JSON.stringify(data));
    if (data.status) {
      toastSuccess("Đăng nhập thành công");
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    toastWarn(`${error.response.data.message}`);
  }
};

export const register = (params) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${Server}/api/auth/register`,
      { ...params },
      config
    );
    // const addressDetail = data.data.user.addresses.find(
    //   (address) => address.idDefault === true
    // )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    // const navigate = useNavigate();
    // navigate("/login");
    if (data.success) {
      toastSuccess(
        "Đăng ký tài khoản thành công. Xác thực mail để có thể đăng nhập!"
      );
    }
    dispatch({
      type: USER_REGISTER_RESET,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toastWarn(
      `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`
    );
  }
};
export const verifyEmail = (Token) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_EMAIL_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${Server}/api/auth/verify-email`,
      {
        Token,
      },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    if (data.status) {
      toastSuccess("Đăng nhập thành công");
    }
  } catch (error) {
    dispatch({ type: USER_VERIFY_EMAIL_FAIL });
    toastWarn(
      `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`
    );
    dispatch({ type: USER_VERIFY_EMAIL_RESET });
  }
};
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${Server}/api/auth/password/forgot`,
      { email },
      config
    );
    dispatch({ type: USER_SEND_EMAIL_FORGOT_PASSWORD_SUCCESS, payload: data });
    if (data.success) {
      toastSuccess(`${data.message}`);
    }
  } catch (error) {
    dispatch({ type: USER_FORGOT_PASSWORD_FAIL });
    toastWarn(
      `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`
    );
    dispatch({ type: USER_FORGOT_PASSWORD_RESET });
  }
};
export const resetPassword = (dataForm) => async (dispatch) => {
  try {
    dispatch({ type: USER_RESET_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${Server}/api/auth/password/resetpassword`,
      { ...dataForm },
      config
    );
    dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
    if (data.success) {
      toastSuccess(`${data.message}`);
    }
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toastWarn(
      `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`
    );
    dispatch({ type: USER_RESET_PASSWORD_RESET });
  }
};
export const changePass = (dataForm) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_CHANGE_PASSWORD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    };
    const { data } = await axios.put(
      `${Server}/api/auth/password/change`,
      { ...dataForm },
      config
    );
    dispatch({ type: USER_CHANGE_PASSWORD_SUCCESS, payload: data });
    toastSuccess(`Đổi mật khẩu thành công.`);
  } catch (error) {
    dispatch({ type: USER_CHANGE_PASSWORD_FAIL, payload: error });
    toastWarn(
      `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`
    );
  }
};
export const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_GET_PROFILE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    };
    // const addressId = userInfo.data.user.addresses.find(
    //   (result) => result.idDefault === true
    // );
    const { data } = await axios.get(`${Server}/api/users/profile`, config);
    dispatch({
      type: USER_GET_PROFILE_SUCCESS,
      payload: data,
    });
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_GET_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toastWarn(`${error.response.data.message}`);
  }
};
export const getAddressDetail =
  (addressDetailId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_ADDRESS_DETAIL_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.data.access_token}`,
        },
      };
      const { data } = await axios.get(
        `${Server}/api/users/address/${addressDetailId}`,
        config
      );
      dispatch({
        type: USER_ADDRESS_DETAIL_SUCCESS,
        payload: { data, userInfo },
      });
      localStorage.setItem("shippingAddress", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_ADDRESS_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      toastWarn(`${error.response.data.message}`);
    }
  };
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: CART_LIST_RESET });
  dispatch({ type: ORDER_HISTORY_RESET });
  toastSuccess("Đăng xuất thành công");
};

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    };
    const { data } = await axios.put(
      `${Server}/api/users/profile`,
      { ...user },
      config
    );
    // console.log(data);

    // console.log(userInfo);
    // const { user } = data;

    const updateUser = {
      status: true,
      message: "Authenticated",
      data: {
        access_token: userInfo.data.access_token,
        refresh_token: userInfo.data.refresh_token,
        user: {
          ...userInfo.data.user,
          ...data.user,
        },
      },
    };
    // console.log(updateUser);

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: updateUser });
    localStorage.setItem("userInfo", JSON.stringify(updateUser));

    if (data.success) {
      toastSuccess("Cập nhật thông tin thành công!");
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toastWarn(`${error.response.data.message}`);
  }
};

export const updateAvatar = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_AVATAR_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    };

    // console.log(formData.get("image"));
    const { data } = await axios.put(
      `${Server}/api/users/avatar`,
      formData,
      config
    );

    // Cam on LOC HELP ME
    // const { data } = await axios({
    //   method: "PUT",
    //   url: `${Server}/api/users/avatar`,
    //   data: formData,
    //   headers: { ...config.headers, "Content-Type": "multipart/form-data" },
    // });

    // console.log(data);
    // console.log(userInfo);

    const updateUser = {
      status: true,
      message: "Authenticated",
      data: {
        access_token: userInfo.data.access_token,
        refresh_token: userInfo.data.refresh_token,
        user: {
          ...userInfo.data.user,
          ...data,
        },
      },
    };

    // console.log(updateUser);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: updateUser });
    localStorage.setItem("userInfo", JSON.stringify(updateUser));

    if (data.success === true) {
      toastSuccess("Cập nhật avatar thành công!");
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_AVATAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toastWarn(`${error.response.data.message}`);
  }
};

export const addAddress = (dataForm) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_ADDRESS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo.data.access_token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    };
    const { data } = await axios.post(
      `${Server}/api/users/address`,
      { ...dataForm },
      config
    );
    dispatch({
      type: USER_ADD_ADDRESS_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    toastSuccess("Thêm địa chỉ thành công!");
  } catch (error) {
    dispatch({
      type: USER_ADD_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toastWarn("Thêm địa chỉ thất bại!");
  }
};

export const updateAddress =
  (dataForm, addressId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_ADDRESS_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.data.access_token}`,
        },
      };
      const { data } = await axios.put(
        `${Server}/api/users/address/${addressId}`,
        { ...dataForm },
        config
      );
      console.log({ ...dataForm });
      dispatch({ type: USER_UPDATE_ADDRESS_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toastSuccess(" Cập nhật địa chỉ thành công!");
    } catch (error) {
      const {
        userLogin: { userInfo },
      } = getState();
      dispatch({
        type: USER_UPDATE_ADDRESS_FAIL,
        payload: userInfo,
      });
      toastWarn("Cập nhật địa chỉ thất bại!");
    }
  };

export const deleteAddress = (addressID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_ADDRESS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    };

    const { data } = await axios.delete(
      `${Server}/api/users/address/${addressID}`,
      config
    );

    dispatch({ type: USER_DELETE_ADDRESS_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
    toastSuccess("Xóa địa chỉ thành công!");
  } catch (error) {
    dispatch({
      type: USER_DELETE_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toastWarn("Xóa địa chỉ thất bại!");
  }
};
