import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_LIST_BY_CATEGORY_REQUEST,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_CATEGORY_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  CLEAR_ERRORS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_LIST_BY_SUB_CATEGORY_REQUEST,
  PRODUCT_LIST_BY_SUB_CATEGORY_FAIL,
  PRODUCT_LIST_BY_SUB_CATEGORY_SUCCESS,
  PRODUCT_CREATE_COMMENT_REQUEST,
  PRODUCT_CREATE_COMMENT_SUCCESS,
  PRODUCT_CREATE_COMMENT_FAIL,
  PRODUCT_CREATE_COMMENT_RESET,
  ADD_PRODUCT_TO_COMPARE,
  REMOVE_PRODUCT_OUT_COMPARE,
  REMOVE_ALL_PRODUCTS_OUT_COMPARE,
  COMPARE_PRODUCTS_REQUEST,
  COMPARE_PRODUCTS_SUCCESS,
  COMPARE_PRODUCTS_FAIL,
  PRODUCT_CREATE_REPLY_COMMENT_REQUEST,
  PRODUCT_CREATE_REPLY_COMMENT_SUCCESS,
  PRODUCT_CREATE_REPLY_COMMENT_FAIL,
} from '../constants/productsConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const productSearchReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_SEARCH_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      }
    case PRODUCT_SEARCH_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const productDetailReducer = (
  state = { product: [], reviews: [], loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        reviews: action.payload.reviews,
        comments: action.payload.comments,
      }
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}
export const productListByCategoryReducer = (
  state = { productByCategories: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_BY_CATEGORY_REQUEST:
      return {
        loading: true,
        productByCategories: [],
        filerProductByCategories: [],
      }
    case PRODUCT_LIST_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        productByCategories: action.payload.data,
        filerProductByCategories: action.payload.temp,
        categoryName: action.payload.categoryName,
        success: true,
      }
    case PRODUCT_LIST_BY_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const compareProducts = (
  state = { loading: false, products: [] },
  action
) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_COMPARE:
      return {
        loading: false,
        products: action.payload,
      }
    case REMOVE_PRODUCT_OUT_COMPARE:
      return {
        loading: false,
        products: action.payload,
      }
    case REMOVE_ALL_PRODUCTS_OUT_COMPARE:
      return {
        loading: false,
        products: [],
      }
    case COMPARE_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case COMPARE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case COMPARE_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
export const productListBySubCategoryReducer = (
  state = { productBySubCategories: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_BY_SUB_CATEGORY_REQUEST:
      return {
        loading: false,
        productBySubCategories: [],
      }
    case PRODUCT_LIST_BY_SUB_CATEGORY_SUCCESS:
      return {
        loading: false,
        productBySubCategories: action.payload,
      }
    case PRODUCT_LIST_BY_SUB_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
export const productReviewsReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      }
    case GET_REVIEWS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}
export const productReviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}
export const productCommentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_COMMENT_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_CREATE_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case PRODUCT_CREATE_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PRODUCT_CREATE_REPLY_COMMENT_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_CREATE_REPLY_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case PRODUCT_CREATE_REPLY_COMMENT_FAIL:
      return {
        loading: true,
        error: action.payload,
      }
    case PRODUCT_CREATE_COMMENT_RESET:
      return {}
    default:
      return state
  }
}
export const productTopRateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
