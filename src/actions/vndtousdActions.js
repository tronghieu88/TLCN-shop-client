import {
  VND_TO_USD_REQUEST,
  VND_TO_USD_SUCCESS,
  VND_TO_USD_FAIL,
} from '../constants/vndtousdConstants'
import axios from 'axios'
import { APP_ID } from '../apis/Api'

export const VNDToUSD = () => async (dispatch, getState) => {
  try {
    dispatch({ type: VND_TO_USD_REQUEST })
    const { data } = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}&symbols=VND&base=USD`
    )
    // const {
    //   carts: { cartItems },
    // } = getState()
    // console.log(cartItems)
    // const {
    //   shippingFee: { shippingFee },
    // } = getState()
    // console.log(shippingFee)
    // const vnd =
    //   cartItems.reduce(function (total, item) {
    //     return (total += item.item.price * item.item.quantity)
    //   }) + shippingFee.total
    // console.log(vnd, 'vnd')
    dispatch({
      type: VND_TO_USD_SUCCESS,
      payload: data.rates.VND,
    })
  } catch (error) {
    dispatch({
      type: VND_TO_USD_FAIL,
      error: error,
    })
  }
}
