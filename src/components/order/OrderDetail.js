import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cancelOrder, getOrderDetail } from "../../actions/orderActions";
import Loading from "../../screens/Loading";
import { MdCancelScheduleSend } from "react-icons/md";
import { toDate, toVND } from "../../utils/format";
import Item from "./sub/Item";
import CancelOrderModal from "./sub/CancelOrderModal";
import { CANCEL_ORDER_RESET } from "../../constants/orderConstants";
import { getHistoryOrders } from "../../actions/orderActions";
import { addDays } from "../../utils/ultils";

const OrderDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { loading, orderItems } = useSelector((state) => state.orderDetail);
  const {
    loading: loadingCancel,
    error: errorCancel,
    success: successCancel,
  } = useSelector((state) => state.cancelOrder);
  useEffect(() => {
    if (slug !== orderItems?._id) {
      dispatch(getOrderDetail(slug));
    }
    if (successCancel) {
      dispatch({ type: CANCEL_ORDER_RESET });
    }
    console.log(orderItems);
  }, [slug, successCancel]);

  //Handle cancel Order
  const [open, setOpen] = useState(false);

  const cancelHandle = (orderId, description) => {
    dispatch(cancelOrder(orderId, description));

    setOpen(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const x = addDays(orderItems?.updatedAt);
  // console.log(x);
  return (
    <>
      {loading && <Loading />}
      <div
        className="min-h-[300px] rounded-lg shadow-lg bg-white
              px-4 sm:px-6 lg:max-w-7xl lg:px-8 mx-4 lg:mx-auto pb-2
    "
      >
        <div className="pt-6">
          <nav aria-label="">
            <ol className=" flex max-w-2xl items-center space-x-2 ">
              <li key={5}>
                <div className="flex items-center">
                  <Link
                    to="/order-list"
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    Đơn hàng
                  </Link>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>

              <li key={orderItems?._id}>
                <div className="flex items-center">
                  <Link
                    to="/order-list"
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {orderItems?._id}
                  </Link>
                </div>
              </li>
            </ol>
          </nav>

          <h1 className="text-2xl pt-4 font-bold tracking-tight text-gray-900 sm:text-3xl mb-4">
            Chi tiết đơn hàng
          </h1>

          <div className="flow grid grid-cols-1 lg:grid-cols-6  gap-4">
            {/* Product grid */}
            <div className=" lg:col-span-4">
              <div className="rounded-lg border-4 border-dashed border-gray-200 lg:h-full">
                <div className="m-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
                  {orderItems?.orderItems?.map((item) => (
                    <Item item={item}></Item>
                  ))}
                </div>
              </div>
            </div>
            {/* Infor */}
            <div className="lg:col-span-2 rounded-lg border-4 border-dashed border-gray-200 p-2">
              <h3 className="text-lg font-bold tracking-tight text-gray-800 sm:text-xl ">
                Thông tin
              </h3>
              <hr className="my-2" />

              <div className="flex my-1">
                <b className="text-gray-600 font-bold mr-1">Ngày đặt:</b>
                <span> {toDate(orderItems?.createdAt)} </span>
              </div>
              <div className="flex my-1">
                <b className="text-gray-600 font-bold mr-1">Ngày cập nhật:</b>
                <span> {toDate(orderItems?.updatedAt)} </span>
              </div>
              {orderItems?.status?.statusNow === "Confirm" ? (
                <div className="flex my-1">
                  <b className="text-gray-600 font-bold mr-1">
                    Ngày giao hàng dự kiến:
                  </b>
                  <span> {addDays(orderItems?.updatedAt)} </span>
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-wrap my-1 ">
                <b className="text-gray-600 font-bold mr-1">
                  Địa chỉ nhận hàng:
                </b>
                <span className="">
                  {orderItems?.shippingAddress?.address}
                  {" ,"}
                </span>
                {/* <span className="">
                  {orderItems?.shippingAddress?.city}
                  {" ,"}
                </span>
                <span className="">{orderItems?.shippingAddress?.country}</span> */}
              </div>
              <div className="flex flex-wrap my-1">
                <b className="text-gray-600 font-bold mr-1">
                  Phương thức thanh toán:
                </b>
                <span> {orderItems?.paymentMethod} </span>
              </div>
              <div className="flex flex-wrap my-1">
                <b className="text-gray-600 font-bold mr-1">Trạng thái:</b>
                <span className="mr-2"> {orderItems?.status?.statusNow} </span>
                <span> ({orderItems?.status?.description}) </span>
              </div>
              <div className="flex my-1 ">
                <b className="text-gray-600 font-bold mr-1">Phí vận chuyển:</b>
                <span className="mr-2">
                  {" "}
                  {toVND(orderItems?.shippingPrice)}{" "}
                </span>
              </div>
            </div>
          </div>

          {/* cancel */}
          <div className="flex items-center justify-end my-4 text-red-500 ">
            <button
              disabled={orderItems?.status?.statusNow !== "pending"}
              type=""
              className={
                orderItems?.status?.statusNow !== "pending"
                  ? " flex w -full items-center justify-center rounded-md border border-gray-400   bg-gray-200  py-2 px-4 text-base font-medium opacity-50 "
                  : " flex w -full items-center justify-center rounded-md border border-gray-400   bg-gray-200  py-2 px-4 text-base font-medium text-red-500  hover:bg-gray-300  focus:outline-none focus:ring-2    focus:ring-primary-500 focus:ring-offset-2"
              }
              onClick={() => setOpen(true)}
            >
              <MdCancelScheduleSend className="mr-2 text-red-500" />
              Hủy
            </button>
          </div>
        </div>
      </div>

      <CancelOrderModal
        open={open}
        setOpen={setOpen}
        cancelHandle={cancelHandle}
        orderId={orderItems?._id}
      />
    </>
  );
};

export default OrderDetail;
