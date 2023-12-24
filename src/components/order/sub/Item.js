import React from "react";
import { Link } from "react-router-dom";
import { toVND } from "../../../utils/format";

const Item = (props) => {
  const { item } = props;

  // console.log(item);
  return (
    <div class="relative max-w-2xl mx-auto ">
      <div class="bg-white border rounded-lg max-w-sm ">
        <Link
          to={"/product/" + item.name.replaceAll(" ", "-")}
          state={{ slug: item?.product }}
        >
          <img
            class=" scale-90 hover:scale-105 ease-in duration-500 rounded-t-lg p-8"
            src={item?.image}
            alt="img"
          />
        </Link>
        <div class="px-5 pb-5">
          <div>
            <h3 class=" text-gray-900 font-semibold text-lg tracking-tight ">
              {item?.name}
            </h3>
          </div>
          <div class="flex ">
            <i>
              <s class="text-lg  text-gray-900 ">{toVND(item?.price * 1.1)}</s>-
              10%
            </i>
          </div>
          <div class="flex ">
            <span class="text-lg font-bold text-gray-900 k">
              {toVND(item?.price)}
            </span>
          </div>
          <div class="flex ">
            <b>Số lượng:</b>
            <span class=" ml-1  font-bold text-gray-900">{item?.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
