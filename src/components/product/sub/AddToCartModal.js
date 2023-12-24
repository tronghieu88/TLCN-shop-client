import { Fragment, useEffect, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { toVND } from "../../../utils/format";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../actions/cartActions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AddToCartModal(props) {
  const { open, setOpen, product } = props;
  // const [open, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //handle Image
  const [img, setImgArr] = useState(
    product?.productOptions[selectedOption]?.colors[selectedColor]?.images[0]
  );
  useEffect(() => {
    let img =
      product?.productOptions[selectedOption]?.colors[selectedColor]?.images[0]
        .urlImage;
    setImgArr(img);
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

  const { loading, error } = useSelector((state) => state.carts);
  const handleAddToCart = () => {
    const body = {
      item: {
        product: product?._id,
        option: product?.productOptions[selectedOption]?._id,
        color:
          product?.productOptions[selectedOption]?.colors[selectedColor]?._id,
      },
      quantity: quantity,
    };
    console.log(body);
    dispatch(addToCart(body.quantity, body.item));
    if (!error) {
      navigate("/cart");
    } else if (error) {
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setOpen(false);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full   items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white rounded-lg px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Main */}
                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6  lg:gap-x-8 lg:grid-cols-12">
                    {/* Img */}
                    <div className=" flex flex-col justify-center h-full   overflow-hidden rounded-lg   lg:col-span-5">
                      <img
                        src={img}
                        alt="img"
                        className=" object-cover object-center "
                      />
                    </div>

                    {/* Detail */}
                    <div className=" lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {product.name}
                      </h2>

                      {/* Options */}
                      <div className="mt-10">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-medium text-gray-900">
                            Các option
                          </h3>
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
                          <div className="grid grid-cols-4 gap-4 sm:grid-cols-4 lg:grid-cols-4">
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
                        <h3 className="text-base font-medium text-gray-900">
                          Màu sắc
                        </h3>
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

                      {/* Price */}
                      <div className=" flex justify-start flex-col">
                        <p className="text-2xl tracking-tight text-gray-900 font-semibold ">
                          {toVND(
                            product?.productOptions[selectedOption]?.price *
                              (1 -
                                product?.productOptions[selectedOption]
                                  ?.promotion *
                                  0.01)
                          )}
                        </p>
                        <p className="text-2xl tracking-tight text-gray-900  my-4">
                          <i>
                            <s className="mr-4">
                              {toVND(
                                product?.productOptions[selectedOption]?.price
                              )}
                            </s>
                          </i>
                          <i>
                            -{" "}
                            {product?.productOptions[selectedOption]?.promotion}{" "}
                            %
                          </i>
                        </p>
                      </div>

                      {/*Quantity  */}
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
                          <button
                            className=" mr-4 rounded-r  "
                            onClick={minusQT}
                          >
                            <AiOutlineMinus />
                          </button>
                          {quantity}
                          <button className="ml-4 rounded-l " onClick={plusQT}>
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex mt-2">
                        <b className="mr-2 text-2xl">Tổng cộng:</b>
                        <p className="text-2xl tracking-tight text-primary-700 font-semibold">
                          {toVND(
                            product?.productOptions[selectedOption]?.price *
                              (1 -
                                product?.productOptions[selectedOption]
                                  ?.promotion *
                                  0.01) *
                              quantity
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-center mb-4">
                        <button
                          onClick={handleAddToCart}
                          type=""
                          className=" mt-4 flex w-[90%] lg:w-[80%]  items-center justify-center rounded-md border border-transparent bg-primary-600 py-3 px-8 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                          <FaShoppingCart className="mr-2" />
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
