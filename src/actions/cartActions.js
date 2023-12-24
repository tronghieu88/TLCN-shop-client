import axios from "axios";
import {
  CART_LIST_ITEM_REQUEST,
  CART_LIST_ITEM_SUCCESS,
  CART_LIST_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_UPDATE_ITEM_REQUEST,
  CART_UPDATE_ITEM_SUCCESS,
  CART_UPDATE_ITEM_FAIL,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
import { Server, Token_API_GHN, GHN } from "../apis/Api";
import { logout } from "./userActions";
import { toastError, toastSuccess } from "../utils/ultils";

export const getCarts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_LIST_ITEM_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    };
    const { data } = await axios.get(`${Server}/api/carts`, config);
    console.log("first");
    console.log(data);
    dispatch({
      type: CART_LIST_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_LIST_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addToCart = (quantity, item) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_ADD_ITEM_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    };
    const { data } = await axios.post(
      `${Server}/api/carts`,
      { quantity, item },
      config
    );
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
    });
    dispatch({
      type: CART_LIST_ITEM_SUCCESS,
      payload: data,
    });
    if (data.success) {
      toastSuccess("Thêm sản phẩm vào giỏ hàng thành công!");
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: message,
    });
  }
};
export const updateCart = (itemId, quantity) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_UPDATE_ITEM_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    };
    await axios.put(`${Server}/api/carts`, { itemId, quantity }, config);
    dispatch({
      type: CART_UPDATE_ITEM_SUCCESS,
    });
    const { data } = await axios.get(`${Server}/api/carts`, config);
    dispatch({
      type: CART_LIST_ITEM_SUCCESS,
      payload: data,
    });
    toastSuccess("Cập nhật giỏ hàng thành công!");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CART_UPDATE_ITEM_FAIL,
      payload: message,
    });
  }
};
