import {
  GET_PROVINCE_LIST_REQUEST,
  GET_DISTRICT_LIST_REQUEST,
  GET_DISTRICT_LIST_FAIL,
  GET_PROVINCE_LIST_FAIL,
  GET_PROVINCE_LIST_SUCCESS,
  GET_DISTRICT_LIST_SUCCESS,
  GET_WARD_LIST_REQUEST,
  GET_WARD_LIST_SUCCESS,
  GET_WARD_LIST_FAIL,
  GET_SHIPPING_FEE_REQUEST,
  GET_SHIPPING_FEE_SUCCESS,
  GET_SHIPPING_FEE_FAIL,
  CLEAR_ERROR,
  CLEAR_ERROR_ADDRESS,
} from "../constants/GHNConstants";

export const GHNReducers = (state = {}, action) => {
  switch (action.type) {
    case GET_PROVINCE_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_PROVINCE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        province: action.payload.data,
        // district: {},
        // ward: {},
      };
    case GET_PROVINCE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_DISTRICT_LIST_REQUEST:
      return {
        loading: true,
        province: state.province,
      };
    case GET_DISTRICT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        district: action.payload.data,
      };
    case GET_DISTRICT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_WARD_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WARD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        ward: action.payload.data,
      };
    case GET_WARD_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR_ADDRESS:
      return {};
    default:
      return state;
  }
};
export const getShippingFeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SHIPPING_FEE_REQUEST:
      return {
        loading: true,
      };
    case GET_SHIPPING_FEE_SUCCESS:
      return {
        loading: false,
        shippingFee: action.payload.data,
      };
    case GET_SHIPPING_FEE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {};
    default:
      return state;
  }
};
