import {
  ADD_PRODUCT_COMPARE_FAIL,
  ADD_PRODUCT_COMPARE_REQUEST,
  ADD_PRODUCT_COMPARE_SUCCESS,
  COMPARE_PRODUCT_FAIL,
  COMPARE_PRODUCT_REQUEST,
  COMPARE_PRODUCT_SUCCESS,
  REMOVE_ALL_PRODUCT_COMPARE_FAIL,
  REMOVE_ALL_PRODUCT_COMPARE_REQUEST,
  REMOVE_ALL_PRODUCT_COMPARE_SUCCESS,
  REMOVE_PRODUCT_COMPARE_FAIL,
  REMOVE_PRODUCT_COMPARE_REQUEST,
  REMOVE_PRODUCT_COMPARE_SUCCESS,
} from "../constants/compareProductConstants";

export const productListCompareReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_COMPARE_REQUEST:
      return { ...state, loading: true, products: [] };
    case ADD_PRODUCT_COMPARE_SUCCESS:
      return;
    case ADD_PRODUCT_COMPARE_FAIL:
      return { loading: false, error: action.payload };
    case REMOVE_PRODUCT_COMPARE_REQUEST:
      return;
    case REMOVE_PRODUCT_COMPARE_SUCCESS:
      return;
    case REMOVE_PRODUCT_COMPARE_FAIL:
      return { loading: false, error: action.payload };
    case REMOVE_ALL_PRODUCT_COMPARE_REQUEST:
      return { ...state, loading: true };
    case REMOVE_ALL_PRODUCT_COMPARE_SUCCESS:
      return {};
    case REMOVE_ALL_PRODUCT_COMPARE_FAIL:
      return { loading: false, error: action.payload };
    case COMPARE_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case COMPARE_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        compare: action.payload.compare,
      };
    case COMPARE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
