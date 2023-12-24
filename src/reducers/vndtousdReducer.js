import {
  VND_TO_USD_REQUEST,
  VND_TO_USD_SUCCESS,
  VND_TO_USD_FAIL,
  VND_TO_USD_RESET,
} from '../constants/vndtousdConstants'

export const VNDToUSDReducer = (state = {}, action) => {
  switch (action.type) {
    case VND_TO_USD_REQUEST:
      return {
        loading: true,
      }
    case VND_TO_USD_SUCCESS:
      return {
        loading: false,
        rates: action.payload,
      }
    case VND_TO_USD_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case VND_TO_USD_RESET:
      return {}
    default:
      return state
  }
}
