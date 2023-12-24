import React, { useEffect } from "react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetail } from "../../actions/productActions";
import Loading from "../../screens/Loading";
import Introduce from "./Introduce";
import Information from "./Information";
import Feedback from "./Feedback";
import {
  PRODUCT_CREATE_COMMENT_RESET,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../../constants/productsConstants";
import { TopProduct } from "./TopProduct";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ProductDetail = () => {
  const location = useLocation();
  const { slug } = location.state;
  // console.log(slug);
  const [render, setRender] = useState(false);

  const dispatch = useDispatch();
  const { product, loading, error, reviews, comments } = useSelector(
    (state) => state.productDetail
  );
  const { success } = useSelector((state) => state.productReviewCreate);
  const { success: successAddComment } = useSelector(
    (state) => state.productCommentCreate
  );

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (successAddComment) {
      dispatch({ type: PRODUCT_CREATE_COMMENT_RESET });
    }
    dispatch(productDetail(slug));
  }, [product._id, success, successAddComment]);
  //

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="min-h-[300px] rounded-lg bg-white shadow-lg
              px-4 sm:px-6 lg:max-w-7xl lg:px-8 mx-4 lg:mx-auto 
    "
        >
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol className=" flex max-w-2xl items-center space-x-2 ">
                <li key={product?.category}>
                  <div className="flex items-center">
                    <Link
                      to={`/${product?.category}`}
                      state={{ CategoryName: `${product?.category}` }}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {product?.category}
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

                <li key={product?.subCategory}>
                  <div className="flex items-center">
                    <Link
                      to={`/${product?.category}`}
                      state={{ CategoryName: `${product?.category}` }}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {product?.subCategory}
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>

            <h1 className="text-2xl pt-4 font-bold tracking-tight text-gray-900 sm:text-3xl ">
              {product?.name}
            </h1>
          </div>
          <Introduce product={product} loading={loading} />
          <Information product={product} loading={loading} />
          <Feedback
            product={product}
            loading={loading}
            reviews={reviews}
            comments={comments}
            setRender={setRender}
          />

          <TopProduct />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
