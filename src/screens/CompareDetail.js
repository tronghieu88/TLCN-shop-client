import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { compare } from "../actions/productActions";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { toVND } from "../utils/format";
import { Rating } from "@mui/material";

const CompareDetail = () => {
  const { loading, data, error } = useSelector(
    (state) => state.compareProducts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const pd1 = data ? data?.product1 : {};
  const pd2 = data ? data?.product2 : {};
  console.log(pd1);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <header className="flex justify-start items-center">
            <Link to="/">
              <IoIosArrowBack />
            </Link>
            &nbsp;
            <h1 className="font-extrabold text-2xl text-left">
              {" "}
              So sánh sản phẩm
            </h1>
          </header>
          <div className="flex flex-col rounded-md bg-white border py-2 px-4">
            <h3 className="text-left text-xl font-bold">Tổng quan</h3>
            <hr className="my-2" />
            <section className="grid grid-cols-2">
              <div className="col-span-1 flex flex-col">
                <Link
                  to={"/product/" + pd1.name.replaceAll(" ", "-")}
                  state={{ slug: pd1?._id }}
                >
                  <img
                    src={pd1?.image}
                    alt="imgproduct1"
                    className="max-w-[50%] h-auto scale-90 hover:scale-105 ease-in duration-500"
                  />
                </Link>
                <h4 className="font-semibold text-lg">{pd1?.name}</h4>
                <p>{toVND(pd1?.price)}</p>
                <i>
                  <s>{toVND(pd1?.price)}</s>
                </i>
                <span className="flex items-center">
                  {" "}
                  <Rating value={pd1?.rating} readOnly /> &nbsp;
                  <i>{pd1?.numReviews} đánh giá</i>
                </span>
              </div>
              <div className="col-span-1 flex flex-col">
                <Link
                  to={"/product/" + pd2.name.replaceAll(" ", "-")}
                  state={{ slug: pd2?._id }}
                >
                  <img
                    src={pd2?.image}
                    alt="imgproduct1"
                    className="max-w-[50%] h-auto scale-90 hover:scale-105 ease-in duration-500"
                  />
                </Link>
                <h4 className="font-semibold text-lg">{pd2?.name}</h4>
                <p>{toVND(pd2?.price)}</p>
                <i>
                  <s>{toVND(pd2?.price)}</s>
                </i>
                <span className="flex items-center">
                  {" "}
                  <Rating value={pd2?.rating} readOnly /> &nbsp;
                  <i>{pd2?.numReviews} đánh giá</i>
                </span>
              </div>
            </section>

            <h3 className="text-xl text-left font-bold mt-4">
              Thông số kỹ thuật
            </h3>
            <hr className="my-2" />
            <section className="grid grid-cols-2 mx-4">
              <ul className="col-span-1 list-disc">
                {pd1?.detailSpecs.map((spec, i) => (
                  <li key={i} className="mb-2">
                    {" "}
                    {spec?.name} {":"} {spec?.value}
                  </li>
                ))}
              </ul>
              <ul className="col-span-1 list-disc">
                {pd2?.detailSpecs.map((spec, i) => (
                  <li key={i} className="mb-2">
                    {" "}
                    {spec?.name} {":"} {spec?.value}
                  </li>
                ))}
              </ul>
            </section>

            <h3 className="font-bold text-xl mt-4">
              Thông tin giới thiệu sản phẩm
            </h3>
            <hr className="my-2" />
            <section className="grid grid-cols-2 m2-4 ">
              <p className="col-span-1 px-2 ">{pd1?.description}</p>
              <p className="col-span-1 px-2">{pd2?.description}</p>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default CompareDetail;
