import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toVND } from "../utils/format";
import { Rating } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { BsChevronDoubleDown } from "react-icons/bs";
import Loading from "./Loading";
import {
  compare,
  deleteAllCompare,
  deleteOutCompare,
} from "../actions/productActions";
import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toastWarn } from "../utils/ultils";

const Compare = () => {
  const [open, setOpen] = useState(false);
  const { products, loading, messages } = useSelector(
    (state) => state.compareProducts
  );

  const { categoryName } = useSelector(
    (state) => state.productListByCategories
  );
  const { CategoryName } = useParams();
  useEffect(() => {
    if (CategoryName !== null) {
      if (CategoryName !== categoryName && products.length > 0) {
        dispatch(deleteAllCompare());
      }
    }
  }, [categoryName]);

  // console.log(products);
  const dispatch = useDispatch();
  const handleRemoveAll = () => {
    dispatch(deleteAllCompare());
  };
  const handleRemove = (id) => {
    dispatch(deleteOutCompare(id));
  };

  const navigate = useNavigate();
  const handleCompare = () => {
    // dispatch(compare());
    if (products.length < 2) {
      toastWarn("Chọn thêm sản phẩm để so sánh");
      return;
    } else {
      setOpen(false);
      navigate("/compareDetail");
      dispatch(compare());
    }
  };
  return (
    <>
      {loading && <Loading />}

      {products.length > 0 && (
        <div className="mx-4 md:mx-2">
          {open ? (
            // large
            <div
              className="fixed bottom-0 mx-auto inset-x-0 bg-white  rounded-lg border 
                         grid grid-cols-1 sm:grid-cols-5  max-w-5xl  z-30"
            >
              <div className="col-span-1 sm:col-span-4  grid grid-cols-2 py-2">
                {products.map((product, i) => (
                  <div
                    key={i}
                    className="col-span-1 border-r grid grid-cols-1 relative sm:grid-cols-2"
                  >
                    <img
                      src={product.image}
                      alt="product"
                      className="max-w-[100%] max-h-32 mx-auto col-span-1 "
                    />
                    <section className="col-span-1 ml-2">
                      <h3>{product.name}</h3>
                      <h3>{toVND(product.price)}</h3>
                      <Rating value={product.rating} readOnly />
                    </section>
                    <MdDeleteForever
                      onClick={() => handleRemove(product.id)}
                      className="absolute top-1 right-1 text-red-500 w-5 h-5 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              <div className="col-span-1 p-2 flex flex-col justify-center relative py-4 lg:py-0">
                <button
                  onClick={handleCompare}
                  className=" text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 
              focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center 
              dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
              mt-4 lg:mt-0"
                >
                  So sánh
                </button>
                <button
                  onClick={handleRemoveAll}
                  className=" mt-2 text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 
              focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center 
              "
                >
                  Xóa tất cả
                </button>
                <BsChevronDoubleDown
                  className="absolute top-1 right-1 text-primary-500 w-5 h-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="col-span-full mx-4 border-t-2">
                {messages?.message}
              </div>
            </div>
          ) : (
            // small
            <div
              className="fixed bottom-0 left-0 ml-4 mb-4 bg-white px-6 py-2 shadow-lg rounded-lg cursor-pointer"
              onClick={() => setOpen(true)}
            >
              So sánh
              <span>
                (<b>{products.length}</b>)
              </span>
            </div>
          )}
        </div>
      )}

      {/* <div className="fixed bottom-0">Compare</div> */}
    </>
  );
};

export default Compare;
