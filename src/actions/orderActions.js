import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  MOMO_QUICK_PAY_ORDER_REQUEST,
  MOMO_QUICK_PAY_ORDER_SUCCESS,
  MOMO_QUICK_PAY_ORDER_FAIL,
  QUERY_CHECKOUT_REQUEST,
  QUERY_CHECKOUT_SUCCESS,
  QUERY_CHECKOUT_FAIL,
} from "../constants/orderConstants";
import { logout } from "./userActions";
import { Server } from "../apis/Api";
import axios from "axios";
import { toastSuccess } from "../utils/ultils";
export const getOrderDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAIL_REQUEST,
    });
    const { userLogin: userInfo } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.userInfo.data.access_token}`,
      },
    };
    const { data } = await axios.get(`${Server}/api/orders/${id}`, config);
    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Login first to access this resource.") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload: message,
    });
  }
};
export const getHistoryOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_HISTORY_REQUEST,
    });
    const { userLogin: userInfo } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.userInfo.data.access_token}`,
      },
    };
    const { data } = await axios.get(`${Server}/api/orders/myorders`, config);
    dispatch({
      type: ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Login first to access this resource.") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_HISTORY_FAIL,
      payload: message,
    });
  }
};
export const createOrder =
  (dataForm, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_ORDER_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userInfo.data.access_token}`,
        },
      };
      const { data } = await axios.post(
        `${Server}/api/orders`,
        { ...dataForm, paymentResult },
        config
      );
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const cancelOrder =
  (orderId, description) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CANCEL_ORDER_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userInfo.data.access_token}`,
        },
      };
      const { data } = await axios.put(
        `${Server}/api/orders/${orderId}`,
        {
          status: {
            statusNow: "cancel",
            description: `${description}`,
          },
        },
        config
      );
      dispatch({
        type: CANCEL_ORDER_SUCCESS,
        payload: data,
      });
      if (data?.success) {
        toastSuccess("Hủy đơn hàng thành công");
        dispatch(getHistoryOrders());
      }
      dispatch({
        type: ORDER_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CANCEL_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const initiateQuickPay = (dataForm) => async (dispatch, getState) => {
  try {
    dispatch({ type: MOMO_QUICK_PAY_ORDER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    };
    const { data } = await axios.post(
      `${Server}/api/orders/momo`,
      { ...dataForm },
      config
    );

    dispatch({ type: MOMO_QUICK_PAY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOMO_QUICK_PAY_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const queryCheckout = (dataForm) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUERY_CHECKOUT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    };
    console.log(userInfo.data.access_token);
    console.log(dataForm);
    const { data } = await axios.post(
      `${Server}/api/orders/momo/query`,
      { ...dataForm },
      config
    );
    dispatch({ type: QUERY_CHECKOUT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Login first to access this resource.") {
      dispatch(logout());
    }
    dispatch({
      type: QUERY_CHECKOUT_FAIL,
      payload: message,
    });
  }
};
