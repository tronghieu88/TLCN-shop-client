import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createProductReview } from "../../../actions/productActions";
import { toastWarn } from "../../../utils/ultils";
export default function AddReviewModal(props) {
  const { open, setOpen, product, slug } = props;
  const { userInfo } = useSelector((state) => state.userLogin);

  // console.log(product);
  // // const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);

  const [params, setParams] = useState({
    rating: 5,
    comment: "",
    slug: slug,
  });
  const onChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };
  const reviewHandler = () => {
    if (params.comment === "") {
      toastWarn("Vui lòng nhập đánh giá");
      return;
    } else {
      setOpen(false);
      dispatch(
        createProductReview({
          rating: params.rating,
          comment: params.comment,
        })
      );
      setParams({ ...params, ["comment"]: "" });
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg 
              bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div> */}
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-bold leading-6 text-gray-900 mb-1"
                      >
                        Đánh giá {product?.name}
                      </Dialog.Title>
                      <div className="mt-2 flex items-center">
                        <img
                          src={product?.image}
                          alt="img"
                          className="max-w-[30%] h-full"
                        />
                        <div className="w-full">
                          <Rating
                            name="rating"
                            value={params.rating}
                            onChange={onChange}
                          />
                          <div className="flex flex-col">
                            <label htmlFor="name" className="font-medium">
                              Cảm nhận
                            </label>
                            <textarea
                              type="name"
                              name="comment"
                              className="mt-1 block w-full p-2 text-black placeholder-gray-500 transition-all 
                                        duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none 
                                    focus:border-blue-600 focus:bg-white caret-blue-600"
                              value={params.comment}
                              id="name"
                              onChange={onChange}
                              placeholder="Mời bạn chia sẻ cảm nhận về sản phẩm"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent
                     bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm
                      hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-red-500 
                      focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => reviewHandler()}
                  >
                    Đánh giá
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border 
                    border-gray-300 bg-white px-4 py-2 text-base font-medium 
                    text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Trở về
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
