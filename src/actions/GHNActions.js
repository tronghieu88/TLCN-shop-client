import axios from "axios";

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
} from "../constants/GHNConstants";
import {
  Token_API_GHN,
  GHN,
  GHN_CALCULATE_FEE,
  SHOP_ID,
  district_id,
} from "../apis/Api";
export const getProvinceList = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROVINCE_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Token: `${Token_API_GHN}`,
      },
    };
    const { data } = await axios.get(`${GHN}/province`, config);
    dispatch({
      type: GET_PROVINCE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROVINCE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getDistrictList = (provinceId) => async (dispatch) => {
  try {
    dispatch({ type: GET_DISTRICT_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Token: `${Token_API_GHN}`,
      },
    };
    const { data } = await axios.get(`${GHN}/district`, {
      headers: {
        "Content-Type": "application/json",
        Token: `${Token_API_GHN}`,
      },
      params: {
        province_id: provinceId,
      },
    });

    dispatch({
      type: GET_DISTRICT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DISTRICT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getWardList = (districtId) => async (dispatch) => {
  try {
    dispatch({ type: GET_WARD_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Token: `${Token_API_GHN}`,
      },
    };
    const { data } = await axios.get(
      `${GHN}/ward?district_id=${districtId}`,
      config
    );
    dispatch({
      type: GET_WARD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_WARD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getShippingFe = (dataForm) => async (dispatch) => {
  const Token = "36ccac9c-5cf2-11ed-b8cc-a20ef301dcd7";
  const shop_id = 120559;
  const province_id = 202;
  const from_district = 3695;
  try {
    dispatch({
      type: GET_SHIPPING_FEE_REQUEST,
    });
    let inputData = {
      from_district_id: from_district,
      service_id: null,
      service_type_id: null,
      to_district_id: dataForm.district,
      to_ward_code: dataForm.ward,
      height: 20,
      length: 20,
      weight: 200,
      width: 20,
    };
    const headers = {
      Token,
      "Content-Type": "application/json",
    };
    const params = {
      shop_id: shop_id,
      from_district: from_district,
    };
    const res = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services`,
      {
        params: {
          ...params,
          to_district: dataForm.district,
        },
        headers: {
          ...headers,
        },
      }
    );
    const { data } = res.data;
    // Get first serve - temp only
    inputData = {
      ...inputData,
      service_id: data[0].service_id,
    };
    const result = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
      {
        params: {
          ...params,
          ...inputData,
        },
        headers,
      }
    );

    // close before product
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Token,
    //   },
    // }
    // const { data } = await axios.post(
    //   `${GHN_CALCULATE_FEE}`,
    //   {
    //     params: {
    //       service_id: 53320, // Loại dịch vụ vận chuyển
    //       service_type_id: null, // Loại dịch vụ vận chuyển
    //       shop_id: shop_id, //Quản lý thông tin cửa hàng/người bán
    //       from_district_id: district_id, // Mã quận/huyện nơi gửi hàng
    //       to_district_id: dataForm.district.DistrictID, // Mã quận/huyện nơi nhận hàng
    //       to_ward_code: dataForm.ward.WardCode, // Mã Mã phường nhận bưu kiện.
    //       weight: 200, // Khối lượng gói hàng (gram)
    //       length: 20, // Chiều dài (cm)
    //       width: 20, // Chiều rộng (cm)
    //       height: 10, // Chiều cao (cm)
    //       insurance_value: 10000,
    //       coupon: null,
    //     },
    //   },

    //   config
    // )
    // console.log(data)
    dispatch({ type: GET_SHIPPING_FEE_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_SHIPPING_FEE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
