import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliders = [
  "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/02/banner/top-free760-400-760x400-1.png",
  "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/02/banner/760-400-760x400-3.png",
  "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/760x400--5--760x400-1.jpg",
  "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/CHESO-1-760x400-1.png",
];

const Deal = () => {
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
    } else if (size >= 640 && size < 768) {
      setSettings({ ...settings, slidesToShow: 2 });
    } else {
      setSettings({ ...settings, slidesToShow: 3 });
    }
  }, [size]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-gray-300  p-4 mt-4 pb-10 rounded-lg">
      <div className="flex items-start">
        <h2 className="heading-2 text-left text-gray-900"> DEAL KHỦNG</h2>
      </div>
      <div className="flex justify-center">
        <Slider {...settings} className="mt-4 w-[95%] ">
          {sliders.map((slider, i) => (
            <div className="px-2" key={i}>
              <img src={slider} alt="" className="rounded-md" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Deal;
