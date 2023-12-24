import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  productListReducer,
  productDetailReducer,
  productListByCategoryReducer,
  productListBySubCategoryReducer,
  productReviewCreateReducer,
  productReviewDeleteReducer,
  productReviewsReducer,
  productTopRateReducer,
  productCommentCreateReducer,
  productSearchReducer,
  compareProducts,
} from "./reducers/productReducers";
import { cartsReducer, cartUpdateReducer } from "./reducers/cartReducers";
import {
  getOrderDetailReducer,
  getOrdersHistoryReducer,
  createOrderReducer,
  cancelOrderReducer,
  quickPayReducer,
  queryCheckoutReducer,
} from "./reducers/orderReducers";
import { GHNReducers, getShippingFeReducer } from "./reducers/GHNReducers";
import { VNDToUSDReducer } from "./reducers/vndtousdReducer";
import { productListCompareReducer } from "./reducers/compareReducers";
const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  // productCompare: productListReducer,
  productSearch: productSearchReducer,
  productDetail: productDetailReducer,
  productListByCategories: productListByCategoryReducer,
  compareProducts: compareProducts,
  productListBySubCategory: productListBySubCategoryReducer,
  productReviewCreate: productReviewCreateReducer,
  productReviewDelete: productReviewDeleteReducer,
  productReviews: productReviewsReducer,
  productTopRate: productTopRateReducer,
  productCommentCreate: productCommentCreateReducer,
  //cart
  cartUpdate: cartUpdateReducer,
  carts: cartsReducer,

  //order
  orderDetail: getOrderDetailReducer,
  historyOrders: getOrdersHistoryReducer,
  createOrder: createOrderReducer,
  cancelOrder: cancelOrderReducer,
  quickPay: quickPayReducer,
  queryCheckout: queryCheckoutReducer,
  //addresses
  GHN: GHNReducers,
  shippingFee: getShippingFeReducer,
  //VND to USD
  VNDToUSD: VNDToUSDReducer,
  // Compare products
  productListCompare: productListCompareReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = userInfoFromStorage
  ? {
      userLogin: { userInfo: userInfoFromStorage },
    }
  : {
      userLogin: { userInfo: userInfoFromStorage, logout: true },
    };
const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
