import { CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'
import {
  USER_ADD_ADDRESS_FAIL,
  USER_ADD_ADDRESS_REQUEST,
  USER_ADD_ADDRESS_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_DELETE_ADDRESS_FAIL,
  USER_REGISTER_RESET,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_RESET,
  USER_RESET_PASSWORD_SUCCESS,
  USER_UPDATE_AVATAR_FAIL,
  USER_UPDATE_AVATAR_REQUEST,
  USER_UPDATE_AVATAR_SUCCESS,
  USER_VERIFY_EMAIL_REQUEST,
  USER_VERIFY_EMAIL_RESET,
} from '../constants/userConstants'
import { USER_DELETE_ADDRESS_SUCCESS } from '../constants/userConstants'
import { USER_DELETE_ADDRESS_REQUEST } from '../constants/userConstants'
import {
  USER_ADDRESS_DETAIL_FAIL,
  USER_ADDRESS_DETAIL_REQUEST,
  USER_ADDRESS_DETAIL_SUCCESS,
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
  USER_UPDATE_ADDRESS_FAIL,
  USER_UPDATE_ADDRESS_REQUEST,
  USER_UPDATE_ADDRESS_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants'
export const userLoginReducer = (
  state = {
    logout: true,
  },
  action
) => {
  switch (action.type) {
    // login
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    // Update profile
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    // Update avatar
    case USER_UPDATE_AVATAR_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      }
    case USER_UPDATE_AVATAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    //Get profile
    case USER_GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_GET_PROFILE_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_GET_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
        ...state,
      }

    // get address
    case USER_ADDRESS_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_ADDRESS_DETAIL_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload.userInfo,
        addressDetail: action.payload.data.address,
      }
    case USER_ADDRESS_DETAIL_FAIL:
      return {
        loading: false,
        userInfo: action.payload.userInfo,
        error: action.payload,
      }

    // Add a new address
    case USER_ADD_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case USER_ADD_ADDRESS_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }

    case USER_ADD_ADDRESS_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
      }

    // Update address
    case USER_UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case USER_UPDATE_ADDRESS_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }

    case USER_UPDATE_ADDRESS_FAIL:
      return {
        loading: false,
        userInfo: action.payload,
      }

    //Delete address
    case USER_DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_DELETE_ADDRESS_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_DELETE_ADDRESS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    //change password
    case USER_CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_CHANGE_PASSWORD_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    // Logout
    case USER_LOGOUT:
      return { logout: true }
    default:
      return state
  }
}

export const userRegisterReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, registered: true }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_VERIFY_EMAIL_REQUEST:
      return { loading: true }
    case USER_VERIFY_EMAIL_RESET:
      return {}
    case USER_REGISTER_RESET:
      return {}
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true }
    case USER_RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case USER_RESET_PASSWORD_RESET:
      return {}
    case USER_RESET_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
