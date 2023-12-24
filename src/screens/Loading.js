import React, { useEffect } from "react";
import "../sass/_loading.scss";
import logo from "../assets/images/icon.png";
import { FaCircleNotch } from "react-icons/fa";

const Loading = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // <div class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
    //   <span
    //     class="animate-spin text-primary-600 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 top-[50%]"
    //     role="status"
    //   >
    //     {/* <span class="visually-hidden">Loading...</span> */}
    //     <img className="visually-hidden" src={logo} alt="logo" />
    //   </span>
    // </div>

    <div class="w-full h-full fixed block top-0 left-0 bg-primary-100  opacity-50 z-50">
      <span class="animate-spin text-primary-600 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 top-[50%]">
        <svg
          class="animate-spin h-5 w-5 text-primary-600"
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
      </span>
    </div>
  );
};

export default Loading;
