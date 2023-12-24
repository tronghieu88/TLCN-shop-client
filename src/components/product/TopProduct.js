import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { listTopProducts } from "../../actions/productActions";
import Loading from "../../screens/Loading";
import { toVND } from "../../utils/format";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

export const TopProduct = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productTopRate);
  //   console.log(products);
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    nav: true,
  });
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener("resize", handleSize);
  }, []);
  useEffect(() => {
    if (size < 640) {
      setSettings({ ...settings, slidesToShow: 1 });
    } else if (size >= 640 && size < 768) {
      setSettings({ ...settings, slidesToShow: 2 });
    } else {
      setSettings({ ...settings, slidesToShow: 4 });
    }
  }, [size]);

  console.log(size);

  useEffect(() => {
    if (!products) {
      dispatch(listTopProducts());
    }
  }, []);
  return (
    <>
      {loading && <Loading />}
      <div className=" pt-4 ">
        <h2 className="text-lg tracking-tight text-gray-900 font-bold">
          Sản phẩm nổi bật
        </h2>
        <div className="py-6 ">
          {/* <div className="m-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-4"> */}
          {/* {productByCategories?.map((product) => (
              <ProductCard product={product} loading={loading}></ProductCard>
            ))} */}
          <Slider {...settings} className=" flex items-center justify-start ">
            {products?.map((product, index) => (
              <div key={index} className=" px-2">
                <div class="bg-white shadow-lg border rounded-lg  ">
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
                      <h3 class=" text-gray-900 font-semibold text-lg tracking-tight ">
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
                    <div>
                      <Rating value={product?.rating} readOnly />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {/* <div className="absolute top-full ">123</div> */}
        {/* </div> */}
      </div>
    </>
  );
};
