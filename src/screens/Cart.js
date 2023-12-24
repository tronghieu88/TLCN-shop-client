import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";
import { GiConfirmed } from "react-icons/gi";
import { CiDiscount1 } from "react-icons/ci";
import { getCarts, updateCart } from "../actions/cartActions";
import {
  createOrder,
  getHistoryOrders,
  initiateQuickPay,
} from "../actions/orderActions";
import { toVND } from "../utils/format";
import Loading from "./Loading";
// import paypal from '../assets/images/paypal.svg'
import vnpay from "../assets/images/vnpay.svg";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import momo from "../assets/images/momo-seeklogo.com.svg";
import momosvg1 from "../assets/images/momo-primary-logo/MoMo Primary Logo/svg/momo_circle_pinkbg.svg";
import momosvg2 from "../assets/images/momo-primary-logo/MoMo Primary Logo/pdf/momo_icon_circle_pinkbg.pdf";
import momosvg3 from "../assets/images/momo-primary-logo/MoMo Primary Logo/svg/momo_square_pinkbg.svg";
// import { getAddressDetail } from '../actions/userActions'
import {
  getDistrictList,
  getProvinceList,
  getShippingFe,
  getWardList,
} from "../actions/GHNActions";
import { CLEAR_ERROR, CLEAR_ERROR_ADDRESS } from "../constants/GHNConstants";
import {
  CREATE_ORDER_RESET,
  MOMO_QUICK_PAY_ORDER_RESET,
} from "../constants/orderConstants";
import { VNDToUSD } from "../actions/vndtousdActions";
import { VND_TO_USD_RESET } from "../constants/vndtousdConstants";
import { Link } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { BsFillCartXFill } from "react-icons/bs";
import { toastError, toastSuccess, toastWarn } from "../utils/ultils";
import { getAddressDetail } from "../actions/userActions";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading: loadingMomo,
    success: successMomo,
    error: errorMomo,
    payUrl,
  } = useSelector((state) => state.quickPay);
  const {
    loading: loadingOder,
    success: successOrder,
    successOrderId,
    error: errorOrder,
  } = useSelector((state) => state.createOrder);
  const {
    loading: loadingVndToUsd,
    error: errorVndToUsd,
    rates,
  } = useSelector((state) => state.VNDToUSD);

  const { cartItems } = useSelector((state) => state.carts);

  const { loading, error, success } = useSelector((state) => state.cartUpdate);

  const plusQT = (index) => {
    console.log("Plus");

    //checkout qt
    if (cartItems[index].item.quantity === cartItems[index].item.countInStock) {
      toastWarn("Số lượng đạt giới hạn!");
    } else {
      const body = {
        itemId: cartItems[index]?._id,
        quantity: cartItems[index].item.quantity + 1,
      };

      dispatch(updateCart(body.itemId, body.quantity));
      // check error
      if (error) {
        toastError(`${error}`);
      } else {
        toastSuccess("Tăng số lượng thành công!");
      }
    }
  };

  const minusQT = (index) => {
    console.log("Minus");
    // check qt
    if (cartItems[index].item.quantity === 1) {
      toastWarn("Không thể giảm tiếp!");
    } else {
      const body = {
        itemId: cartItems[index]?._id,
        quantity: cartItems[index].item.quantity - 1,
      };

      dispatch(updateCart(body.itemId, body.quantity));

      //check error
      if (error) {
        toastError(`${error}`);
      } else {
        toastSuccess("Giảm số lượng thành công!");
      }
    }
  };

  //Remove Item
  const handleRemoveItem = (index) => {
    const body = {
      itemId: cartItems[index]?._id,
      quantity: 0,
    };

    dispatch(updateCart(body.itemId, body.quantity));
    if (error) {
      toastError(`${error}`);
    } else if (loading === false) {
      toastSuccess(`Xóa sản phẩm thành công!`);
    }
  };
  //Handle order
  const [isOnline, setIsOnline] = useState(false);
  const {
    province,
    district,
    ward,
    error: errorAddresslist,
  } = useSelector((state) => state.GHN);
  const {
    loading: loadingFee,
    error: errorFee,
    shippingFee,
  } = useSelector((state) => state.shippingFee);
  const {
    addressDetail,
    userInfo,
    loading: loadingUser,
  } = useSelector((state) => state.userLogin);
  console.log(userInfo);
  const [selectedSenderProvince, setSelectedSenderProvince] = useState("");
  const [selectedSenderDistrict, setSelectedSenderDistrict] = useState("");
  const [selectedSenderWard, setSelectedSenderWard] = useState("");
  const [street, setStreet] = useState("");

  //Handle Click Choose Address
  const addDefault = userInfo?.data?.user?.addresses.filter(
    (add, i) => add.idDefault === true
  );
  const [isDefautAddress, setIsDefautAddress] = useState(
    addDefault[0].address ? true : false
  );
  const handleClickDefautAddress = () => {
    setSelectedSenderDistrict("");
    setSelectedSenderWard("");
    setIsDefautAddress(true);
  };

  console.log(addDefault[0].detailAddress);
  useEffect(() => {
    // if (!addressDetail) {
    //   dispatch(getAddressDetail())
    // }
    if (isDefautAddress && addDefault[0].address) {
      dispatch(getAddressDetail(addDefault[0].detailAddress));
    } else if (!province) {
      dispatch(getProvinceList());
    }
  }, [dispatch, province, isDefautAddress]);
  useEffect(() => {
    if (addressDetail && !isDefautAddress) {
      dispatch(getDistrictList(addressDetail?.province?.provinceID));
      dispatch(getWardList(addressDetail?.district?.districtID));
    }
  }, [addressDetail, dispatch]);
  useEffect(() => {
    if (selectedSenderProvince && !isDefautAddress) {
      dispatch(getDistrictList(selectedSenderProvince.ProvinceID));
    }
  }, [selectedSenderProvince, dispatch]);
  useEffect(() => {
    if (selectedSenderDistrict && !isDefautAddress) {
      dispatch(getWardList(selectedSenderDistrict.DistrictID));
    }
  }, [selectedSenderDistrict, dispatch]);
  useEffect(() => {
    if (selectedSenderWard && !isDefautAddress) {
      const dataForm = {
        province: selectedSenderProvince,
        district: selectedSenderDistrict.DistrictID,
        ward: selectedSenderWard.WardCode,
      };
      dispatch(getShippingFe(dataForm));
      dispatch(VNDToUSD());
      console.log(dataForm);
    } else if (isDefautAddress && addressDetail) {
      const dataForm = {
        province: addressDetail?.detailAddress.province.provinceID,
        district: addressDetail?.detailAddress.district.districtID,
        ward: addressDetail?.detailAddress.ward.wardCode,
      };
      dispatch(getShippingFe(dataForm));
      dispatch(VNDToUSD());
    }
  }, [selectedSenderWard, isDefautAddress, addressDetail, dispatch]);

  useEffect(() => {
    if (successMomo) {
      if (payUrl) {
        window.location.href = `${payUrl}`;
      }

      dispatch({ type: MOMO_QUICK_PAY_ORDER_RESET });
    }
    if (errorMomo) {
      dispatch({ type: MOMO_QUICK_PAY_ORDER_RESET });
    }
    if (errorOrder) {
      toast.error(
        `Xãy ra lỗi trong quá trình thực thi! Xin vui lòng liên hệ quản trị viên.`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      dispatch({ type: CREATE_ORDER_RESET });
    }
    if (successOrder) {
      toastSuccess("Thêm đơn hàng thành công!");

      dispatch(getCarts());
      navigate(`/order/${successOrderId}`);
      dispatch({ type: CREATE_ORDER_RESET });
      dispatch(getHistoryOrders());
    }
    if (errorFee) {
      toastWarn("Chung tôi chưa hỗ trợ giao hàng tại địa chỉ này!");

      dispatch({ type: CLEAR_ERROR });
    }
    if (errorAddresslist) {
      toastError("Đã xảy ra lỗi,xin vui lòng thử lại!");

      dispatch({ type: CLEAR_ERROR_ADDRESS });
    }
    if (errorVndToUsd) {
      toastError("Đã xảy ra lỗi,trong quá trình chuyển đổi tiền tệ");
      dispatch({ type: VND_TO_USD_RESET });
    }
  }, [
    errorFee,
    errorAddresslist,
    dispatch,
    errorVndToUsd,
    successOrder,
    errorOrder,
    successMomo,
    errorMomo,
  ]);

  const successPaymentHandler = (paymentResult) => {
    if (!selectedSenderProvince.ProvinceName) {
      toastWarn("Chọn Tỉnh/Thành phố!");
      return;
    }
    if (!selectedSenderDistrict.DistrictName) {
      toastWarn("Chọn Huyện/Quận!");
      return;
    }
    if (!selectedSenderWard.WardName) {
      toastWarn("Chọn Xã/Phường!");
      return;
    }
    if (street.length === 0) {
      toastWarn("Nhập số nhà/đường!");
      return;
    } else {
      const dataForm = {
        shippingAddress: {
          address: `${street}, ${selectedSenderProvince?.ProvinceName}, Huyện ${selectedSenderDistrict?.DistrictName}, ${selectedSenderWard?.WardName}`,
          city: `${selectedSenderProvince?.ProvinceName}`,
          country: "VN",
        },
        paymentMethod: isOnline ? "paypal" : "COD",
        itemsPrice: cartItems?.reduce(function (total, item) {
          return (total += item?.item?.price * item?.item?.quantity);
        }, 0),
        shippingPrice: shippingFee && shippingFee.total,
        totalPrice:
          shippingFee &&
          cartItems?.reduce(function (total, item) {
            return (total += item?.item?.price * item?.item?.quantity);
          }, 0 + shippingFee.total),
        paymentResult: paymentResult,
      };
      dispatch(createOrder(dataForm));
    }
  };
  const shipCodHandle = () => {
    if (!selectedSenderProvince.ProvinceName) {
      toastWarn("Chọn Tỉnh/Thành phố!");
      return;
    }
    if (!selectedSenderDistrict.DistrictName) {
      toastWarn("Chọn Huyện/Quận!");
      return;
    }
    if (!selectedSenderWard.WardName) {
      toastWarn("Chọn Xã/Phường!");
      return;
    }
    if (street.length === 0) {
      toastWarn("Nhập số nhà/đường!");
      return;
    } else {
      const dataForm = {
        shippingAddress: {
          address: `${street}, ${selectedSenderProvince?.ProvinceName}, Huyện ${selectedSenderDistrict?.DistrictName}, ${selectedSenderWard?.WardName}`,
          city: `${selectedSenderProvince?.ProvinceName}`,
          country: "VN",
        },
        paymentMethod: isOnline ? "paypal" : "COD",
        itemsPrice: cartItems?.reduce(function (total, item) {
          return (total += item?.item?.price * item?.item?.quantity);
        }, 0),
        shippingPrice: shippingFee && shippingFee.total,
        totalPrice:
          shippingFee &&
          cartItems?.reduce(function (total, item) {
            return (total += item?.item?.price * item?.item?.quantity);
          }, 0 + shippingFee.total),
      };

      dispatch(createOrder(dataForm));
    }
  };
  const handlePaymentMomo = () => {
    if (!selectedSenderProvince.ProvinceName) {
      toastWarn("Chọn Tỉnh/Thành phố!");
      return;
    }
    if (!selectedSenderDistrict.DistrictName) {
      toastWarn("Chọn Huyện/Quận!");
      return;
    }
    if (!selectedSenderWard.WardName) {
      toastWarn("Chọn Xã/Phường!");
      return;
    }
    if (street.length === 0) {
      toastWarn("Nhập số nhà/đường!");
      return;
    } else {
      const dataForm = {
        shippingAddress: {
          address: `${street}, ${selectedSenderProvince?.ProvinceName}, Huyện ${selectedSenderDistrict?.DistrictName}, ${selectedSenderWard?.WardName}`,
          city: `${selectedSenderProvince?.ProvinceName}`,
          country: "VN",
        },
        paymentMethod: isOnline ? "paypal" : "COD",
        itemsPrice: cartItems?.reduce(function (total, item) {
          return (total += item?.item?.price * item?.item?.quantity);
        }, 0),
        shippingPrice: shippingFee && shippingFee.total,
        totalPrice:
          shippingFee &&
          cartItems?.reduce(function (total, item) {
            return (total += item?.item?.price * item?.item?.quantity);
          }, 0 + shippingFee.total),
      };
      dispatch(initiateQuickPay(dataForm));
    }
  };

  return (
    <>
      {(loading || loadingUser || loadingFee) && <Loading />}
      {loadingOder && <Loading />}
      <div class="  rounded-lg  mx-2 bg-white shadow-lg ">
        <h1 class="mb-10 text-center text-2xl font-bold">Giỏ hàng</h1>

        {cartItems?.length === 0 ? (
          <div className="flex items-center justify-center flex-col ">
            <BsFillCartXFill className="w-10 h-10 text-red-600" />
            <h4 className="my-2"> Không có sản phẩm nào trong giỏ hàng</h4>
            <Link to="/" className="flex items-center justify-center mb-4">
              <button
                type=""
                className="  flex w-full  items-center justify-center rounded-md border border-transparent bg-primary-600 py-3 px-8 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <AiTwotoneHome className="mr-2" />
                Về trang chủ
              </button>
            </Link>
          </div>
        ) : (
          <div
            class="  px-6  xl:px-0 
              grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  mx-4 mb-4 gap-4"
          >
            {/* Items */}
            <div class="rounded-lg  lg:col-span-1 ">
              {cartItems?.map((cartItem, index) => (
                <div
                  class="justify-between mb-4 rounded-lg border bg-white p-6 shadow-md sm:flex sm:justify-start"
                  key={index}
                >
                  {/* img */}
                  <img
                    src={cartItem?.item?.image}
                    alt="img"
                    class="w-full rounded-lg sm:w-40"
                  />
                  {/* detail */}
                  <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    {/* infor */}
                    <div class="mt-5 sm:mt-0">
                      <h2 class="text-lg font-bold text-gray-900">
                        {cartItem?.item?.name}
                      </h2>
                      <p class="mt-1 text-base text-gray-700">
                        {cartItem?.item?.info?.optionName}
                      </p>
                      <p class="mt-1 text-base text-gray-700">
                        {cartItem?.item?.info?.colorName}
                      </p>
                    </div>

                    {/* qt-price */}
                    <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block   items-center">
                      <div class="flex items-center border-gray-100">
                        <span
                          class="cursor-pointer rounded-l bg-gray-100 py-1 px-3 duration-100 
                    hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => minusQT(index)}
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          class="h-8 w-8 border bg-white text-center text-xs "
                          type="text"
                          disabled
                          value={cartItem?.item?.quantity}
                          min="1"
                        />
                        <span
                          class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 
                    hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => plusQT(index)}
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>

                      <div class="flex items-center  ">
                        <p class="text-base font-semibold mr-2">
                          {toVND(
                            cartItem?.item?.price * cartItem?.item?.quantity
                          )}
                        </p>
                        <TiDelete
                          onClick={() => handleRemoveItem(index)}
                          className="h-5 w-5 text-red-600 hover:text-primary-600 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <!-- Sub total --> */}
            <div class=" rounded-lg border bg-white p-6 shadow-md md:mt-0  lg:col-span-1 mb-2">
              <h3 class=" text-left text-lg font-bold">Thông tin đơn hàng</h3>
              <hr class="my-4" />
              {/* Infor */}
              <h3 class=" text-left text-base font-bold">
                Thông tin khách hàng
              </h3>
              <div className="flex mt-1 ">
                <b className="font-medium">Tên khách hàng:</b>
                &nbsp;
                <p>{userInfo?.data?.user?.name}</p>
              </div>
              <div className="flex my-2">
                <b className="font-medium">Điện thoại:</b>
                &nbsp;
                <p>{userInfo?.data?.user?.phone}</p>
              </div>
              <div className="flex mb-1">
                <b className="font-medium">Email:</b>
                &nbsp;
                <p>{userInfo?.data?.user?.email}</p>
              </div>

              <hr class="my-4" />
              {/* Address */}
              <h3 class=" text-left text-base font-bold">Địa chỉ giao hàng</h3>

              <div class="flex justify-center flex-col mt-2">
                <div class="form-check form-check-inline mb-2">
                  <input
                    class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border
                  border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none 
                  transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 
                  cursor-pointer"
                    type="radio"
                    name="2"
                    id=""
                    value=""
                    required
                    checked={isDefautAddress}
                    // defaultChecked
                    onClick={() => handleClickDefautAddress()}
                  />
                  <label
                    class="form-check-label inline-block text-gray-800"
                    for="defaultAddress"
                  >
                    Mặc định: &nbsp;
                    {addDefault[0] ? (
                      <i>{addDefault[0]?.address}</i>
                    ) : (
                      <Link to={"/user-infor"}>Thêm địa chỉ</Link>
                    )}
                  </label>
                </div>
                <div class="form-check form-check-inline ">
                  <input
                    class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border
                  border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none 
                  transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 
                  cursor-pointer"
                    type="radio"
                    name="2"
                    id=""
                    value=""
                    required
                    checked={!isDefautAddress}
                    onClick={() => setIsDefautAddress(false)}
                  />
                  <label
                    class="form-check-label inline-block text-gray-800"
                    for="defaultAddress"
                  >
                    Chọn địa chỉ mới
                  </label>
                </div>
              </div>

              {!isDefautAddress && (
                <div className="w-full lg:w-full  mb-2 ">
                  <div className="w-full flex flex-wrap justify-between">
                    <div class="w-full md:w-[45%]  py-4 flex justify-center">
                      <div class=" w-full">
                        <select
                          class="form-select appearance-none block w-full p-2 text-base
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding bg-no-repeat
                              border border-solid border-gray-300
                              rounded-md
                              transition
                              ease-in-out
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          aria-label="Default select example"
                          onChange={(event) =>
                            setSelectedSenderProvince(
                              JSON.parse(event.target.value)
                            )
                          }
                        >
                          <option selected>Tỉnh</option>
                          {province &&
                            province.map((province) => (
                              <option
                                key={province.ProvinceID}
                                value={JSON.stringify(province)}
                              >
                                {province.ProvinceName}
                              </option>
                            ))}
                          {/* <option value='1'>An Giang</option>
                      <option value='2'>HCM</option>
                      <option value='3'>Đồng Tháp</option> */}
                        </select>
                      </div>
                    </div>
                    <div class="w-full md:w-[45%]  py-4 flex justify-center">
                      <div class=" w-full">
                        <select
                          class="form-select appearance-none block w-full p-2 text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding bg-no-repeat
                                border border-solid border-gray-300
                                rounded-md
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          aria-label="Default select example"
                          onChange={(event) =>
                            setSelectedSenderDistrict(
                              JSON.parse(event.target.value)
                            )
                          }
                        >
                          <option selected>Huyện</option>
                          {district &&
                            district.map((district) => (
                              <option
                                key={district.DistrictID}
                                value={JSON.stringify(district)}
                              >
                                {district.DistrictName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div class="w-full md:w-[45%]  py-4 flex justify-center">
                      <div class=" w-full">
                        <select
                          class="form-select appearance-none block w-full p-2 text-base
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding bg-no-repeat
                              border border-solid border-gray-300
                              rounded-md
                              transition
                              ease-in-out
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          aria-label="Default select example"
                          onChange={(event) =>
                            setSelectedSenderWard(
                              JSON.parse(event.target.value)
                            )
                          }
                        >
                          <option selected>Xã</option>
                          {ward &&
                            ward.map((ward) => (
                              <option
                                key={ward.WardCode}
                                value={JSON.stringify(ward)}
                              >
                                {ward.WardName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div class="w-full  py-4 flex justify-center">
                      <input
                        required
                        type="address"
                        name="detailaddress"
                        onChange={(e) => setStreet(e.target.value)}
                        id=""
                        placeholder="Đường/Số nhà"
                        aria-describedby="undefined-error"
                        class="w-full  p-2 m-auto  text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>
                </div>
              )}
              <hr class="my-4" />
              {/* Voucher */}
              <div className="w-full flex justify-between flex-wrap ">
                <div class="w-full md:w-[50%] py-4 flex justify-center">
                  <input
                    type="address"
                    name=""
                    id=""
                    class="w-full  p-2 m-auto  text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                </div>

                <div className="w-full md:w-[40%] flex items-center justify-center ">
                  <button
                    type=""
                    className="  flex w-full  items-center justify-center rounded-md border border-transparent 
                  bg-primary-600 p-2 text-base font-medium text-white hover:bg-primary-700 focus:outline-none 
                  focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    <CiDiscount1 className="mr-2" />
                    Áp dụng
                  </button>
                </div>
              </div>

              <hr class="my-4" />
              {/*Total   */}
              <div>
                <div class=" flex justify-between">
                  <p class="text-gray-700">Tổng giá trị sản phẩm</p>
                  <p class="text-gray-700 font-medium">
                    {toVND(
                      cartItems?.reduce(function (total, item) {
                        return (total +=
                          item?.item?.price * item?.item?.quantity);
                      }, 0)
                    )}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="text-gray-700">Phí vận chuyển</p>
                  <p class="text-gray-700 font-medium">
                    {shippingFee && toVND(shippingFee.total)}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="text-lg font-bold">
                    Tổng cộng{" "}
                    <i className="text-xs font-normal">(bao gồm VAT)</i>{" "}
                  </p>
                  <p class="mb-1 text-lg font-bold">
                    {shippingFee
                      ? toVND(
                          cartItems?.reduce(function (total, item) {
                            return (total +=
                              item?.item?.price * item?.item?.quantity);
                          }, 0 + shippingFee.total)
                        )
                      : toVND(
                          cartItems?.reduce(function (total, item) {
                            return (total +=
                              item?.item?.price * item?.item?.quantity);
                          }, 0)
                        )}
                  </p>
                </div>
              </div>
              <hr class="my-4" />
              {/* Checkout */}
              <div>
                <h3 class=" text-left text-base font-bold mb-2">
                  Chọn hình thức thanh toán
                </h3>
                <div class="flex justify-center flex-col ">
                  <div class="form-check form-check-inline mb-2">
                    <input
                      class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border
                  border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none 
                  transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 
                  cursor-pointer"
                      type="radio"
                      name="1"
                      id=""
                      value=""
                      // onChange={setSelectedColor(index)}
                      required
                      checked={!isOnline}
                      onClick={() => setIsOnline(false)}
                    />
                    <label
                      class="form-check-label inline-block text-gray-800"
                      for="inlineRadio10"
                    >
                      Thanh toán khi nhận hàng
                    </label>
                  </div>
                  <div class="form-check form-check-inline ">
                    <input
                      class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border
                  border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none 
                  transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 
                  cursor-pointer"
                      type="radio"
                      name="1"
                      id=""
                      value=""
                      required
                      onClick={() => setIsOnline(true)}
                    />
                    <label
                      class="form-check-label inline-block text-gray-800"
                      for="inlineRadio10"
                    >
                      Thanh toán online
                    </label>
                  </div>
                </div>

                {/*Paypal VNPay  */}
                {isOnline && (
                  <div className="grid grid-cols-1 mt-4   ">
                    <button
                      type="button"
                      class="text-gray-900 bg-white hover:bg-gray-100 border 
                  border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 
                  font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 
                  dark:text-gray-900 dark:hover:bg-gray-200  mb-2
                  mr-4  col-span-1 flex justify-center"
                      onClick={() => handlePaymentMomo()}
                    >
                      <img
                        src={momosvg1}
                        alt="Momo"
                        class="max-w-[25%] h-auto  mr-2 -ml-1"
                      />
                    </button>
                    <div
                      class="text-gray-900 bg-white hover:bg-gray-100 border col-span-1
                  border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 
                  font-medium rounded-lg text-sm px-5 py-2.5 text-center  
                  items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 
                  dark:text-gray-900 dark:hover:bg-gray-200  mb-2 flex justify-center items-center
                  mr-4 z-0"
                    >
                      <PayPalScriptProvider
                        options={{
                          "client-id":
                            "AYnnIG_uYjcamwk8Vcd5pTuDyCjl-MBx43rB-lB1eDYDNitB6swG_k97jMKAFcz0o98mjoPo1zs5ZOGP",
                        }}
                      >
                        <PayPalButtons
                          amount={(
                            cartItems.reduce(function (total, item) {
                              return (total +=
                                item?.item?.price * item?.item?.quantity);
                            }, shippingFee?.total) / rates
                          ).toFixed(2)}
                          createOrder={(data, action) => {
                            return action.order
                              .create({
                                purchase_units: [
                                  {
                                    amount: {
                                      value: (
                                        cartItems.reduce(function (
                                          total,
                                          item
                                        ) {
                                          return (total +=
                                            item?.item?.price *
                                            item?.item?.quantity);
                                        },
                                        shippingFee?.total) / rates
                                      ).toFixed(2),
                                    },
                                  },
                                ],
                              })
                              .then((orderID) => {
                                return orderID;
                              })
                              .catch((error) => {
                                console.log(error);
                                return error;
                              });
                          }}
                          onApprove={(data, action) => {
                            return action.order.capture().then((res) => {
                              successPaymentHandler(res);
                            });
                          }}
                        />
                      </PayPalScriptProvider>
                    </div>
                  </div>
                )}
              </div>

              <hr class="my-4" />

              <div className="flex items-center justify-center">
                <button
                  type=""
                  className="  flex w-[90%] lg:w-[80%]  items-center justify-center rounded-md border border-transparent bg-primary-600 py-3 px-8 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  onClick={() => shipCodHandle()}
                >
                  <GiConfirmed className="mr-2" />
                  Mua hàng
                </button>
              </div>

              {/* <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
