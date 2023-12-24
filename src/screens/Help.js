import React from "react";
import { useEffect } from "react";

const Help = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <h1 className="my-4 text-xl  font-extrabold ">
        Thông tin trợ giúp khách hàng
      </h1>
      <p className="text-lg">
        Khách hàng cần trợ giúp về{" "}
        <strong>đơn hàng, bảo hành, kỹ thuật, tư vấn mua hàng</strong> hãy liên
        hệ <i>hotline:</i>
        <b className="text-primary-700"> 0828674940</b> hoặc{" "}
        <b className="text-primary-700">0586187410</b>
      </p>
    </>
  );
};

export default Help;
