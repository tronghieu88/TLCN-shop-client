import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

const techs = [
  {
    img: "https://cdn.tgdd.vn/Files/2023/03/11/1516458/iphone-14-pro-max-viet-nam-421-110323-084444-300x200.jpg",
    detail:
      "Đánh giá chi tiết Xiaomi 13 Pro: Camera Leica đỉnh nhưng sự thú vị không chỉ dừng lại ở đó",
  },
  {
    img: "https://cdn.tgdd.vn/Files/2023/02/20/1511577/12314-200223-125032-300x200.jpg",
    detail:
      "Giữa tháng sale bát ngát: Mua iPhone 14 Pro Max, nhận ưu đãi tận 7.5 triệu",
  },
  {
    img: "https://cdn.tgdd.vn/Files/2023/03/12/1516767/iqooz7-tgdd-1231313-thumb-1copy-120323-175742-300x200.jpg",
    detail:
      "Cách dùng ChatGPT không cần tài khoản cực kỳ dễ dàng, bạn nên xem ngay bài viết",
  },
  {
    img: "https://cdn.tgdd.vn/Files/2023/03/11/1516516/danh-gia-xiaomi-13-pro-chinh-hang-thumb-110323-140717-300x200.jpg",
    detail:
      "Hình ảnh thực tế và cấu hình của iQOO Z7 series lần lượt bị rò rỉ trước khi ra mắt",
  },
];

const Technology = () => {
  return (
    <div className="bg-white rounded-lg p-4 mt-4 shadow-md">
      <div className="flex justify-between">
        <h2 className="heading-2"> 24H CÔNG NGHỆ</h2>
        <div className="flex justify-between items-center">
          <h3 className="mr-2">XEM TẤT CẢ</h3>
          <MdArrowForwardIos />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {techs.map((tech, i) => (
          <div className="flex flex-col " key={i}>
            <img src={tech.img} alt="img" className="rounded-lg mb-2" />
            <p>{tech.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technology;
