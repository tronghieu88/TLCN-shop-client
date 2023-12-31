import React, { useRef, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const CancelOrderModal = (props) => {
  const {
    open,
    setOpen,
    cancelHandle,
    orderId,
    product,
    selectedOption,
    selectedColor,
    quantity,
  } = props;
  const navigate = useNavigate();
  const cancelButtonRef = useRef(null);
  const [reason, setReason] = useState("Đổi ý");
  const dispatch = useDispatch();
  // console.log(reason);
  return (
    <>
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
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className=" flex items-center text-lg font-medium leading-6 text-gray-900 mb-1"
                        >
                          <AiOutlineQuestionCircle className="text-primary-600 mr-2" />
                          Bạn có muốn hủy đơn hàng?
                        </Dialog.Title>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="mx-4">
                    <div className="flex flex-col items-start w-full my-4 ">
                      <textarea
                        type="name"
                        name="comment"
                        className=" break-all  mt-1 block w-full  p-2 text-black placeholder-gray-500 transition-all 
                                        duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none 
                                    focus:border-blue-600 focus:bg-white caret-blue-600"
                        value={reason}
                        id="name"
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Nhập lý do muốn hủy đơn hàng"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent
                     bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm
                      hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-red-500 
                      focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => cancelHandle(orderId, reason)}
                    >
                      Hủy
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
    </>
  );
};
export default CancelOrderModal;
