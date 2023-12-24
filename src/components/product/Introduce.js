import React, { useEffect, useState } from "react";
import Slider from "../slider/Slider";

import { RadioGroup } from "@headlessui/react";
import { toVND } from "../../utils/format";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import Loading from "../../screens/Loading";
import { toast } from "react-toastify";
import AddToCartModal from "./sub/AddToCartModal";
import ConfirmAddToCart from "./sub/ConfirmAddToCart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Introduce = (props) => {
  const { product, loading } = props;

  //handle modal add to cart
  const [openModal, setOpenModal] = useState(false);

  // handle selec option
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  //handle Image
  const [imgArr, setImgArr] = useState([]);
  useEffect(() => {
    let arr = [];
    product?.productOptions[selectedOption]?.colors[selectedColor]?.images.map(
      (color) => {
        arr.push(color?.urlImage);
      }
    );
    // const sliceArr = arr.slice(0, 7);
    // console.log(sliceArr);
    setImgArr(arr);
  }, [product._id, selectedOption, selectedColor]);

  //handle quantity
  const plusQT = () => {
    if (
      quantity ===
      product?.productOptions[selectedOption]?.colors[selectedColor]?.quantity
    ) {
      toast.error("Số lượng đạt giới hạn", {
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
      setQuantity(quantity + 1);
    }
  };

  const minusQT = () => {
    if (quantity === 1) {
      toast.error("Số lượng đạt giới hạn", {
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
      setQuantity(quantity - 1);
    }
  };

  //
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
      setOpenModal(true);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="py-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="rounded-lg shadow-lg lg:col-span-7 pt-4 py-7 border ">
              <Slider imgArr={imgArr} />
            </div>
            <div className="rounded-lg shadow-lg lg:col-span-5 p-4 border">
              {/* Option */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-900">
                    Các option
                  </h3>
                  {/* <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Size guide
                </a> */}
                </div>

                <RadioGroup
                  value={selectedOption}
                  onChange={setSelectedOption}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    {" "}
                    Choose a size{" "}
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product?.productOptions?.map((option, index) => (
                      <RadioGroup.Option
                        key={option?._id}
                        value={index}
                        className={({ active }) =>
                          classNames(
                            option
                              ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                              : "bg-gray-50 text-gray-200 cursor-not-allowed",
                            active ? "ring-2 ring-primary-500" : "",
                            "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                        onClick={() => setSelectedOption(index)}
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {option?.productOptionName}
                            </RadioGroup.Label>
                            {option ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-primary-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Colors */}
              <div className="my-4">
                <h3 className="text-base font-medium text-gray-900">Màu sắc</h3>
                <div class="flex justify-start my-2 ">
                  {product?.productOptions[selectedOption]?.colors?.map(
                    (color, index) => (
                      <div
                        class="form-check form-check-inline mr-6"
                        key={index}
                        onClick={() => setSelectedColor(index)}
                      >
                        <input
                          class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border
                  border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none 
                  transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 
                  cursor-pointer"
                          type="radio"
                          name="inlineRadioOptions"
                          id={color._id}
                          value={color._id}
                          checked={index === selectedColor}
                          // onChange={setSelectedColor(index)}
                        />
                        <label
                          class="form-check-label inline-block text-gray-800"
                          for="inlineRadio10"
                        >
                          {color.color}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className=" flex justify-start flex-col">
                <p className="text-3xl tracking-tight text-gray-900 font-semibold ">
                  {toVND(product?.productOptions[selectedOption]?.price)}
                </p>
                <p className="text-3xl tracking-tight text-gray-900  my-4">
                  <i>
                    <s className="mr-4">
                      {toVND(
                        (product?.productOptions[selectedOption]?.price /
                          (100 -
                            product?.productOptions[selectedOption]
                              ?.promotion)) *
                          100
                      )}
                    </s>
                  </i>
                  <i>
                    - {product?.productOptions[selectedOption]?.promotion} %
                  </i>
                </p>
              </div>

              <div className=" flex">
                <h3 className="text-base font-medium text-gray-900 mr-1">
                  Số lượng còn :
                </h3>
                <i>
                  <b>
                    {
                      product?.productOptions[selectedOption]?.colors[
                        selectedColor
                      ]?.quantity
                    }
                  </b>
                </i>
                <div className="ml-10 max-w-[120px] px-4 rounded border-2 border-solid border-gray-400">
                  <button className=" mr-4 rounded-r  " onClick={minusQT}>
                    <AiOutlineMinus />
                  </button>
                  {quantity}
                  <button className="ml-4 rounded-l " onClick={plusQT}>
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={handleOpenModal}
                  type=""
                  className=" mt-4 flex w-[90%] lg:w-[80%]  items-center justify-center rounded-md border border-transparent bg-primary-600 py-3 px-8 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <FaShoppingCart className="mr-2" />
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmAddToCart
        open={openModal}
        setOpen={setOpenModal}
        product={product}
        selectedOption={selectedOption}
        selectedColor={selectedColor}
        quantity={quantity}
      />
    </>
  );
};

export default Introduce;
