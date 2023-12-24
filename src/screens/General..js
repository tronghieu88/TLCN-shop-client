import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const General = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <img
        src="https://online.hcmute.edu.vn/Portlets/UIS_MySpace/Images/SPKT.jpg"
        alt="logo"
        className="w-full h-auto mb-4"
      />
      <p className="text-lg font">
        Website thương mại điện tử được phát triển bởi nhóm sinh viên Đại học Sư
        Phạm Kỹ Thuật Thành Phố Hồ Chí Minh. Dự án được thực hiện nhằm mục đích
        hoàn thành đồ án tốt nghiệp được lấy ý tưởng từ{" "}
        <Link to="https://www.thegioididong.com">
          <i>
            <b className="text-primary-700 cursor-pointer hover:text-primary-400">
              Thế giới di động
            </b>
          </i>
        </Link>
        &nbsp; và API giao hàng từ phía
        <Link to="https://api.ghn.vn/">
          <i>
            <b className="text-primary-700 cursor-pointer hover:text-primary-400">
              {" "}
              Giao Hàng Nhanh
            </b>
          </i>
        </Link>
        . Dự án được thực hiện bởi nhóm sinh viên:
      </p>
      <ul className="text-lg font list-disc ml-6 my-4">
        <li className="font-semibold text-primary-900">
          Dan Bảo Nguyên - MSSV:19110036 - Frontend
        </li>
        <li className="font-semibold text-primary-900">
          Nguyễn Thái Hưng - MSSV: 19110221 - Backend
        </li>
      </ul>
      <p className="text-lg font">
        Để hoàn thành đề tài khóa luận tốt nghiệp này, lời cảm ơn đầu tiên em
        muốn gửi đến <b>TS. Lê Văn Vinh</b> , thầy đã luôn theo dõi và đồng hành
        cùng nhóm em trong suốt khoản thời gian hoàn thành đề tài từ giai đoạn
        lên ý tưởng cho đến giai đoạn triển khai trang web. Dù thầy phải hướng
        dẫn cho một số lượng sinh viên không nhỏ nhưng thầy vẫn luôn tận tình
        bám sát theo nhóm toàn bộ quá trình hoàn thành đề tài của nhóm.
      </p>
      <p className="text-lg font my-4">
        Ngoài ra, em muốn gửi lời cảm ơn đến toàn thể các thầy, cô trong Khoa
        đào tạo Chất lượng cao trường Đại học Sư Phạm Kỹ Thuật Thành Phố Hồ Chí
        Minh, đã cung cấp một nền tảng kiến thức vững chắc để hoàn thành được đề
        tài khóa luận chuyên ngành của nhóm. Hiện tại chúng em rất tự tin với
        lượng kiến thức mà thầy, cô đã cung cấp trong suốt quá trình học tại
        trường.
      </p>
      <p className="text-lg font">
        Để hoàn thành đề tài này, là một sự nỗ lực không hề nhỏ của từng cá nhân
        thành viên trong nhóm, nhưng do lần đầu tiếp xúc với MERN STACK nên
        không thể tránh khỏi những thiếu sót ngoài ý muốn, vì vậy những lần góp
        ý và giúp đỡ của thầy, cô với kinh nghiệm và kiến thức chuyên ngành dày
        dặn là rất quý báu đối với nhóm em. Cuối cùng, nhóm em muốn gửi lời chúc
        sức khỏe, hạnh phúc, thành công, những điều tốt đẹp nhất ở hiện tại và
        tương lai đến thầy, cô và gia đình.
      </p>
    </>
  );
};

export default General;
