import React from "react";

const techs = [
  {
    img: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/samsung-390-210-390x210.png",
    detail: "Samsung",
  },
  {
    img: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/01/banner/4138F801-4823-44D5-B626-32025C4D329C-390x210.png",
    detail: "Apple",
  },
  {
    img: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/Lenovolenovo-390x210-1.png",
    detail: "Lenovo",
  },
];
const Trademark = () => {
  return (
    <div className="bg-white rounded-lg p-4 mt-4 shadow-md">
      <div className="flex items-start">
        <h2 className="heading-2 text-left"> THƯƠNG HIỆU NỔI BẬT</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {techs.map((tech, i) => (
          <div className="flex flex-col items-center " key={i}>
            <img src={tech.img} alt="img" className="rounded-lg mb-2" />
            <p className="font-semibold">{tech.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trademark;
