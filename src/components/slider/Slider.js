import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

// const url = [
//   "https://cdn.tgdd.vn/Products/Images/42/269831/Slider/SLIDE5-1020x570.jpg",
//   "https://cdn.tgdd.vn/Products/Images/42/269831/Slider/note-110-1020x570.jpeg",
//   "https://cdn.tgdd.vn/Products/Images/42/269831/Slider/SLIDE5-1020x570.jpg",
//   "https://cdn.tgdd.vn/Products/Images/42/269831/Slider/note-110-1020x570.jpeg",
// ];

const size = {
  height: "400px",
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Slider = (props) => {
  const { imgArr } = props;
  const [curIndex, setCurIndex] = useState(0);

  const precvSlider = () => {
    const isFirstIndex = curIndex === 0;
    const nextIndex = isFirstIndex ? imgArr.length - 1 : curIndex - 1;
    setCurIndex(nextIndex);
  };

  const nextSlider = () => {
    const isLastIndex = curIndex === imgArr.length - 1;
    const nextIndex = isLastIndex ? 0 : curIndex + 1;
    setCurIndex(nextIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurIndex(slideIndex);
  };
  return (
    <div
      style={{ height: `${size.height}` }}
      className="w-full max-w-[1400px]  m-auto relative group content-center "
    >
      {/* <div className="w-[80%] h-[80%] flex items-center justify-center m-auto ">
        <div
          style={{ backgroundImage: `url(${imgArr[curIndex]})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500 "
        ></div>
      </div> */}
      <div className="w-full h-full flex items-center justify-center m-auto ">
        <img class="max-h-full w-auto" src={imgArr[curIndex]} alt="img"></img>
      </div>

      {/* Left arrow */}
      <div
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] left-4 text-2xl 
      rounded-full p-2 bg-black/20 text-white cursor-pointer opacity-70 hover:opacity-100 hover:bg-black/50"
      >
        <BsChevronLeft onClick={precvSlider} size={30} />
      </div>
      {/* Right arrow */}
      <div
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] right-4 text-2xl 
      rounded-full p-2 bg-black/20 text-white cursor-pointer opacity-70 hover:opacity-100 hover:bg-black/50"
      >
        <BsChevronRight onClick={nextSlider} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2 ">
        {imgArr.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className={classNames(
              slideIndex === curIndex
                ? "text-2xl opacity-40"
                : "text-2xl cursor-pointer"
            )}
          >
            <RxDotFilled onClick={() => goToSlide(slideIndex)} size={20} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
