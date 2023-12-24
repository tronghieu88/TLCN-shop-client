import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toVND } from "../../utils/format";
import { Rating } from "@mui/material";
import { TbEqualNot } from "react-icons/tb";
import AddToCartModal from "./sub/AddToCartModal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../screens/Loading";
import { addProductCompare } from "../../actions/productActions";

const ProductCard = (props) => {
  // const [product, setProduct] = useState(props?.product);
  const { product, loading } = props;
  // const { loading } = props;
  const [open, setOpen] = useState(false);

  //
  // handle add to cart
  // const [selectedOption, setSelectedOption] = useState(0);
  // const [selectedColor, setSelectedColor] = useState(0);
  // const [quantity, setQuantity] = useState(1);
  const { logout } = useSelector((state) => state.userLogin);

  const navigate = useNavigate();
  const handleOpenModal = () => {
    if (logout) {
      navigate("/login");
      toast.info("Mời bạn đăng nhập vào hệ thống!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setOpen(true);
    }
  };

  // Compare
  const dispatch = useDispatch();
  const handleCompare = () => {
    dispatch(
      addProductCompare({
        id: product._id,
        name: product.name,
        image: product.image,
        price: product?.price,
        rating: product?.rating,
      })
    );
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div class="relative max-w-2xl mx-auto ">
          <div class="bg-white shadow-lg border rounded-lg max-w-sm ">
            <Link
              to={"/product/" + product.name.replaceAll(" ", "-")}
              state={{ slug: product?._id }}
            >
              <img
                class=" scale-90 hover:scale-105 ease-in duration-500 rounded-t-lg p-8"
                src={product?.image}
                alt="img"
              />
            </Link>
            <div class="px-5 pb-5">
              <div>
                <h3 class=" text-gray-900 font-semibold text-lg tracking-tight  ">
                  {product?.name}
                </h3>
              </div>
              <div class="flex ">
                <i>
                  <s class="text-lg  text-gray-900 ">
                    {toVND(product?.price * 1.1)}
                  </s>
                  - 10%
                </i>
              </div>
              <div class="flex ">
                <span class="text-lg font-bold text-gray-900 k">
                  {toVND(product?.price)}
                </span>
              </div>
              <div class="flex items-center mt-2.5 mb-4 ">
                <Rating value={product?.rating} readOnly />
                <span class="bg-blue-100 text-primary-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 ml-3">
                  {product?.rating}
                </span>
                <TbEqualNot
                  onClick={handleCompare}
                  className="w-12 h-8 text-white py-1 px-2 bg-primary-600 rounded-lg cursor-pointer hover:bg-primary-800"
                />
              </div>

              <div className="mt-4 w-full">
                <button
                  onClick={handleOpenModal}
                  class="w-full text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 
              focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
              dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>

          {/* <!-- loading overlay --> */}

          {/* <div class="hidden absolute bg-white bg-opacity-60 z-10 h-full w-full sm:flex items-center justify-center">
        <div class="flex items-center">
          <span class="text-3xl mr-4">Loading</span>
          
          <svg
            class="animate-spin h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          
        </div>
      </div> */}
        </div>
      )}

      <AddToCartModal open={open} setOpen={setOpen} product={product} />
    </>
  );
};

export default ProductCard;
