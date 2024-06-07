/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import icons from "../utils/icons";
import { apiGetPurchase } from "../apis";
import FormBuy from "./FormBuy";
import calculateTime from "../utils/calculateTime";
const { RiMoneyDollarCircleFill } = icons;

const ChapterList = ({ data, slug, coverImage }) => {
  const navigate = useNavigate();
  const [isBought, setIsBought] = useState(false);
  const [isShowFormBuy, setIsShowFormBuy] = useState(false);
  const { isLoggingIn } = useSelector((state) => state.user);
  const handleClick = async ({ id }) => {
    if (!isLoggingIn) {
      Swal.fire({
        title: "Ớ ấy ơi, bạn chưa đang nhập",
        text: "Vui lòng tiến hành đăng nhập để tiến hành mua chapter này",
        icon: "info",
      });
    } else 
    if (isBought) {
      navigate(`/comic/chapter/${slug}/${id}`);
    } else if (!isBought) {
      setIsShowFormBuy(true);
    }
  };
  const fetchPurchase = async () => {
    const getPurchaseApi = await apiGetPurchase({ id: data._id });
    if (getPurchaseApi?.success === true) {
      setIsBought(true);
    }
  };
  useEffect(() => {
    if(data.price !== 0 && isLoggingIn) {
      fetchPurchase();
    }
  }, []);
  return (
    <div
      className="grid grid-cols-5 border-b border-chapter-border-color"
    >
      {data.price === 0 ? (
        <NavLink
          to={`/comic/chapter/${slug}/${data._id}`}
          className="col-span-2 font-bold py-3 pl-2 cursor-pointer"
        >
          Chapter {data.chapNumber}
        </NavLink>
      ) : (
        <div
          className="col-span-2 font-bold py-3 pl-2 cursor-pointer flex items-center"
          onClick={() => {
            handleClick({ id: data._id });
          }}
        >
          Chapter {data.chapNumber} 💎
        </div>
      )}
      <div className="col-span-1 text-label-text-color py-3 pl-2">
        {calculateTime(data.createdAt)}
      </div>
      <div className="col-span-1 text-label-text-color py-3 pl-2">
        {data.viewCount || 0}
      </div>
      <div className="col-span-1 text-main py-3 pl-2">
        {data.price === 0 ? (
          "Miễn phí"
        ) : isBought ? (
          "Đã mua"
        ) : (
          <span className="flex items-center">
            {data.price}
            <RiMoneyDollarCircleFill className="ml-1" color="yellow" />
          </span>
        )}
      </div>
      {isShowFormBuy && (
        <FormBuy
          id = {data._id}
          slug= {slug}
          chapNumber={data.chapNumber}
          price={data.price}
          coverImage={coverImage}
          comic={data.comic}
          setIsShowFormBuy={setIsShowFormBuy}
        />
      )}
    </div>
  );
};

export default ChapterList;
