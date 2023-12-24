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
  CART_UPDATE_RESET,
  CART_LIST_RESET,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const cartsReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_LIST_ITEM_REQUEST:
      return {
        loading: true,
        cartItems: [],
      }
    case CART_LIST_ITEM_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload.cart,
      }
    case CART_LIST_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_LIST_RESET:
      return {}
    default:
      return state
  }
}
export const cartUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return {
        loading: true,
      }
    case CART_ADD_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CART_ADD_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CART_UPDATE_ITEM_REQUEST:
      return {
        loading: true,
      }
    case CART_UPDATE_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CART_UPDATE_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CART_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
