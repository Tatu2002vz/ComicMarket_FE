import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { memo } from "react";
const Footer = () => {
  return (
    <div className="bg-headerBg">
      <div className="flex flex-col gap-10 md:flex-row lg:gap-32 max-w-main mx-auto py-10 px-[10px] md:px-0">
      <div className="basis-1/2">
        <img src={logo} alt="logo" className="h-[30px] mb-4" />
        <p>
          Luôn cập nhật liên tục các bộ truyện mới, truyện VIP để phục vụ độc
          giả
        </p>
        <p>Truyện đa dạng phù hợp cho mọi lứa tuổi.</p>
        <p>Email khiếu nại: tavantu2002vz@gmail.com</p>
        <Link to={"/"}>Giới thiệu</Link>
        <Link to={"/"}>Liên hệ</Link>
        <Link to={"/"}>Chính sách</Link>
        <p>Copyright © 2024 ComicMarket</p>
      </div>
      <div className="basis-1/2 flex items-center">
        Mọi thông tin và hình ảnh trên website đều được sưu tầm trên Internet.
        Chúng tôi không sở hữu hay chịu trách nhiệm bất kỳ thông tin nào trên
        web này. Nếu làm ảnh hưởng đến cá nhân hay tổ chức nào, khi được yêu
        cầu, chúng tôi sẽ xem xét và gỡ bỏ ngay lập tức.
      </div>
    </div>
    </div>
  );
};

export default memo(Footer);
