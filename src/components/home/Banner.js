import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const background =
  "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/kdhjd-1920x450.jpg";

const sliders = [
  "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/sdptn720-220-720x220-1.png",
  "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/realme720-220-720x220-3.png",
  "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/ip14-720-220-720x220-2.png",
  "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/Redmi-12c-720-220-720x220-6.png",
  "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/s23-720-220-720x220-7.png",
  "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/02/banner/reno8t-720-220-720x220-8.png",
];
const promotions = [
  {
    name: "Điện thoại hot",
    icon: "https://cdn.tgdd.vn//content/icon-TGDD-OF-100x100.gif",
    href: "/Điện thoại",
  },
  {
    name: "Laptop giảm sốc",
    icon: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/120-x-120a-120x120.png",
    href: "/Laptop",
  },
  {
    name: "Tablet độc quyền",
    icon: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Frame-46604--1--120x120-1.png",
    href: "/Tablet",
  },
  {
    name: "Phụ kiện mới về",
    icon: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Group-8-120x120-2.png",
    href: "/Phụ kiện",
  },
];
export default function Banner() {
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
    } else {
      setSettings({ ...settings, slidesToShow: 2 });
    }
  }, [size]);
  return (
    <div className="">
      {/* Backgound */}
      <div className=" ">
        <img
          src={background}
          alt="background"
          className="hidden md:block rounded-lg  w-full"
        />
      </div>

      {/* Sliders */}
      <div className="mt-4 mb-8">
        <Slider {...settings}>
          {sliders.map((slider, i) => (
            <div className=" w-full h-40 px-2 " key={i}>
              <img src={slider} alt="" className="max-h-40 w-full rounded-md" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Promotions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {promotions.map((pro, i) => (
          <Link
            className="rounded-lg shadow-lg lg:col-span-1 p-4 border flex items-center justify-around hello"
            key={i}
            to={pro?.href}
          >
            <img src={pro.icon} alt="icon" className="w-14 h-14" />

            <h2 className="text-lg tracking-tight text-gray-900 font-bold">
              {pro.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* Events */}
    </div>
  );
}
