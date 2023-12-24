import axios from 'axios'

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
  PRODUCT_LIST_BY_CATEGORY_REQUEST,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_CATEGORY_FAIL,
  PRODUCT_LIST_BY_SUB_CATEGORY_REQUEST,
  PRODUCT_LIST_BY_SUB_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_SUB_CATEGORY_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_CREATE_COMMENT_REQUEST,
  PRODUCT_CREATE_COMMENT_SUCCESS,
  PRODUCT_CREATE_COMMENT_FAIL,
  ADD_PRODUCT_TO_COMPARE,
  REMOVE_ALL_PRODUCTS_OUT_COMPARE,
  REMOVE_PRODUCT_OUT_COMPARE,
  COMPARE_PRODUCTS_REQUEST,
  COMPARE_PRODUCTS_FAIL,
  COMPARE_PRODUCTS_SUCCESS,
  PRODUCT_CREATE_REPLY_COMMENT_REQUEST,
  PRODUCT_CREATE_REPLY_COMMENT_SUCCESS,
  PRODUCT_CREATE_REPLY_COMMENT_FAIL,
} from '../constants/productsConstants'
import { logout } from './userActions'
import { Server } from '../apis/Api'
import { toast } from 'react-toastify'
import { toastError, toastSuccess } from '../utils/ultils'

/** GET Products  */
export const listProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const { data } = await axios.get(
        `${Server}/api/products?keyword=${keyword}&page=${pageNumber}`
      )
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

/**Search Product */
export const searchProducts = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SEARCH_REQUEST })
    const { data } = await axios.get(`${Server}/api/products`, {
      params: { ...keyword },
    })
    dispatch({
      type: PRODUCT_SEARCH_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/** Get Product Detail */
export const productDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST })

    const { data } = await axios.get(`${Server}/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
/** GET Product By Category */
export const getProductByCategory = (categoryName) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_REQUEST,
    })
    const { data } = await axios.get(
      `${Server}/api/products/category/${categoryName}`
    )
    // const temp = await data;
    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_SUCCESS,
      payload: { data, categoryName, temp: [...data] },
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
/** GET Product By SubCategory */
export const getProductsBySubCategory = (subCategoryId) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_BY_SUB_CATEGORY_REQUEST,
    })
    const { data } = await axios.get(
      `${Server}/api/products/subcategory/${subCategoryId}`
    )
    dispatch({
      type: PRODUCT_LIST_BY_SUB_CATEGORY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_SUB_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
/** GET Top Products */
export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })

    const { data } = await axios.get(`${Server}/api/products/topreviews`)

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
/** Create Product Review */
export const createProductReview = (review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    })
    const {
      productDetail: { product },
    } = getState()
    const { userLogin: userInfo } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.userInfo.data.access_token}`,
      },
    }

    const { data } = await axios.post(
      `${Server}/api/products/${product?._id}/reviews`,
      {
        rating: review.rating,
        comment: review.comment,
      },
      config
    )

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    })
    if (data?.message === 'Review added') {
      toastSuccess('Thêm đánh giá thành công!')
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    toastError('Thêm đánh giá thất bại!')
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}
/** Get Product Review */
export const getProductReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST })
    const { data } = await axios.get(`${Server}/api/products/${id}`)
    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    })
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    })
  }
}
// Delete product review
export const deleteReview =
  (reviewId, productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.userInfo.data.access_token}`,
        },
      }
      const { data } = await axios.delete(
        `${Server}/api/products/${productId}/reviews?reviewId=${reviewId}`,
        config
      )
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      })
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      })
    }
  }
export const createProductComment = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_COMMENT_REQUEST,
    })
    const { userLogin: userInfo } = getState()
    const {
      productDetail: { product },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.userInfo.data.access_token}`,
      },
    }
    const { data } = await axios.post(
      `${Server}/api/comments`,
      {
        comment: params.comment,
        productId: product._id,
      },
      config
    )
    dispatch({
      type: PRODUCT_CREATE_COMMENT_SUCCESS,
      payload: data,
    })
    if (data.success) {
      toastSuccess('Thêm bình luận thành công')
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Login first to access this resource.') {
      dispatch(logout())
    }
    toastError('Thêm bình luận thất bại!')
    dispatch({
      type: PRODUCT_CREATE_COMMENT_FAIL,
      payload: message,
    })
  }
}
export const replyComment = (dataForm) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REPLY_COMMENT_REQUEST })
    const { userLogin: userInfo } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.userInfo.data.access_token}`,
      },
    }
    const { data } = await axios.post(
      `${Server}/api/comments/${dataForm.comment}/reply`,
      { reply: dataForm.content },
      config
    )
    dispatch({ type: PRODUCT_CREATE_REPLY_COMMENT_SUCCESS, payload: data })
    toastSuccess('Trả lời bình luận thành công.')
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_REPLY_COMMENT_FAIL })
    toastError('Trả lời bình luận thất bại!')
  }
}
// Compare products
export const addProductCompare = (product) => (dispatch, getState) => {
  const {
    compareProducts: { products },
  } = getState()
  const isExist = products.filter((item) => product.id === item.id)
  // console.log(isExist);
  if (products.length === 2) {
    toast.warn('Danh sách sản phẩm so sánh đạt giới hạn!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  } else if (isExist.length > 0) {
    toast.warn('Sản phẩm đã có trong danh sách!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  } else {
    products.push(product)
    // console.log(products);
    dispatch({ type: ADD_PRODUCT_TO_COMPARE, payload: products })
    toast.success('Thêm vào danh sách so sánh thành công!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }
}
export const deleteOutCompare = (id) => (dispatch, getState) => {
  const {
    compareProducts: { products },
  } = getState()
  const newProducts = products.filter((item) => item.id !== id)
  console.log(newProducts)
  dispatch({ type: REMOVE_PRODUCT_OUT_COMPARE, payload: newProducts })
  toast.success('Xóa sản phẩm khỏi danh sách thành công!', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
}

export const deleteAllCompare = () => (dispatch) => {
  dispatch({ type: REMOVE_ALL_PRODUCTS_OUT_COMPARE })

  toast.success('Xóa danh sách sản phẩm so sánh thành công!', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
}

export const compare = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPARE_PRODUCTS_REQUEST })
    const {
      compareProducts: { products },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // const product1 = products[0].name;
    // const product2 = products[1].name;
    // const mess = `So sánh ${product1} và ${product2}, sản phẩm nào đáng mua hơn? `;
    // console.log(mess);

    // const { data } = await axios.post(
    //   `${Server}/api/products/compare`,

    //   { message: mess }
    // );
    // console.log(data);

    // New
    const id1 = products[0].id
    const id2 = products[1].id

    const res1 = await axios.get(`${Server}/api/products/${id1}`)
    const res2 = await axios.get(`${Server}/api/products/${id2}`)
    const data = await {
      product1: res1.data,
      product2: res2.data,
    }

    dispatch({ type: COMPARE_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: COMPARE_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
