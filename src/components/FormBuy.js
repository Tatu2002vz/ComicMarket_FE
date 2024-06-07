import { useSelector } from "react-redux";
import icons from "../utils/icons";
import { apiBuyChapter } from "../apis";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const { RiMoneyDollarCircleFill, FiPlus, IoClose } = icons;

const FormBuy = ({
  id,
  price,
  chapNumber,
  coverImage,
  setIsShowFormBuy,
  slug,
  comic,
}) => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const handleClick = async () => {
    if (userData?.walletBalance < price) {
      Swal.fire({
        title: "Số dư của bạn không đủ! Vui lòng nạp thêm để tiếp tục!",
        icon: "info",
      });
    } else {
      console.log(typeof comic);
      const buyPurchase = await apiBuyChapter({ payload: comic, id });
      if (buyPurchase?.success === true) {
        Swal.fire({
          title: "Mua thành công!",
          icon: "success",
        }).then(() => {
          navigate(`/comic/chapter/${slug}/${id}`);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Đã có lỗi xảy ra!",
        }).then(() => {
          navigate(0);
        });
      }
    }
  };
  return (
    <div className="fixed w-full md:w-[600px] bg-mainBg rounded-md z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 md:p-10">
      <div className="flex gap-[2px]">
        <span className="bg-color-float flex items-center pl-4 py-2 pr-2 rounded-l-full">
          <RiMoneyDollarCircleFill className="mr-2" color="yellow" />
          {userData?.walletBalance}
        </span>
        <span className="bg-color-float flex items-center pr-2 py-2 pl-2 rounded-r-full cursor-pointer">
          <FiPlus className="mr-2" size={20} />
        </span>
      </div>
      <div className="p-3 border-main border rounded-md flex mt-7 bg-color-float gap-5">
        <img
          src={coverImage}
          alt="avatar"
          className="w-[50px] h-[50px] object-cover"
        />
        <div className="flex flex-col justify-center gap-2">
          <p className="font-bold">Chapter {chapNumber}</p>
          <p className="flex items-center">
            {price} <RiMoneyDollarCircleFill color="yellow" className="ml-1" />
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-7">
        <div
          className="py-3 px-8 bg-main rounded-md cursor-pointer"
          onClick={() => {
            handleClick();
          }}
        >
          Mua ngay
        </div>
      </div>
      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => {
          setIsShowFormBuy(false);
        }}
      >
        <IoClose size={30} />
      </div>
    </div>
  );
};

export default FormBuy;
