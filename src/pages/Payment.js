import { useDispatch, useSelector } from "react-redux";
import icons from "../utils/icons";
import { InputField } from "../components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import validate from "../utils/validate";
import { apiDeposit, createPaymentURL, getPaymentReturn } from "../apis";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCurrent } from "../store/user/asyncAction";
const { BsFillUnlockFill, RiMoneyDollarCircleFill } = icons;
const Payment = () => {
  const { userData } = useSelector((state) => state.user);
  const [payload, setPayload] = useState({
    amount: "",
  });
  const [invalidField, setInvalidField] = useState([]);
  // const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log();
  const params = new URLSearchParams(location.search);
  const paramsObject = Object.fromEntries(params);
  const dispatch = useDispatch();
  const handleDeposit = async () => {
    if (payload.amount % 100 !== 0) {
      toast.error("Nhập số tiền hợp lệ!");
    } else {
      const invalid = validate(payload, setInvalidField);
      if (invalid === 0) {
        // const fetchDeposit = await apiDeposit({
        //   payload: { amount: +payload.amount / 100 },
        // });
        // if (fetchDeposit.success) {
        //   toast.success("Nạp tiền thành công!");
        //     setTimeout(() => {
        //         dispatch(getCurrent())
        //     }, 2000)
        // } else {
        //   toast.error("Nạp tiền thất bại! Vui lòng thử lại sau!");
        // }
        const fetchDeposit = await createPaymentURL(Number(payload.amount));
        console.log(fetchDeposit);
        if (fetchDeposit.success) {
          window.location.href = fetchDeposit.mes;
          console.log(fetchDeposit.mes);
        }
      }
    }
  };
  const getPaymentRs = async () => {
    const rs = await getPaymentReturn(paramsObject);
    if (rs.success) {
      if (rs.mes === "00") {
        navigate(0)
        navigate("/payment/success");
        // toast.success("Nạp tiền thành công!");
      }
    } else {
      toast.error("Nạp tiền thất bại! Vui lòng thử lại sau!");
    }
  };
  useEffect(() => {
    if (Object.keys(paramsObject).length > 0) {
      getPaymentRs();
    }
  }, []);
  return (
    <div className="min-h-fs max-w-main mx-auto">
      <div className="">
        <h1 className="text-[36px] text-center">Gold dùng để làm gì? </h1>
        <div className="flex gap-5 md:gap-10 justify-center items-center mt-10 px-4">
          <BsFillUnlockFill className="text-main md:text-[50px] text-[60px]" />
          <div>
            <h2 className="text-[30px]">Mở khoá truyện</h2>
            <p>
              Đọc ngay những chapter mới nhất của các bộ Comics hàng đầu tại
              ComicMarket
            </p>
          </div>
        </div>
      </div>
      <div className="bg-color-float w-full py-5 px-10 md:py-10 md:px-20 my-10">
        <h1 className="text-[30px] flex justify-between border-b pb-5 border-[#ccc]">
          Nạp gold
          <p className="flex items-center text-main">
            {userData?.walletBalance}
            <RiMoneyDollarCircleFill color="yellow" size={30} />
          </p>
        </h1>
        <div className="my-10">
          <InputField
            label={"Nhập số tiền cần nạp (10.000 vnd = 100 gold):"}
            placeholder={"10000, 20000, 100000"}
            value={payload.amount}
            setPayload={setPayload}
            invalidField={invalidField}
            setInvalidField={setInvalidField}
            namekey={"amount"}
          />
        </div>
        <button
          className="px-4 py-2 border rounded-md mb-4 bg-gradient-to-l from-main to-purple-600"
          onClick={() => {
            handleDeposit();
          }}
        >
          Thanh toán
        </button>
        {location.pathname === "/payment/success" && <div className="text-green-500 text-lg">Thanh toán thành công!</div>}
      </div>
    </div>
  );
};

export default Payment;
