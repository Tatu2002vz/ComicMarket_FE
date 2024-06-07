import { useEffect, useState } from "react";
import icons from "../utils/icons";
import postExcel from "../utils/postExcel";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
const { IoIosCloseCircle, RiMoneyDollarCircleFill } = icons;
const Report = ({ errorComic, errorReport, setShowReport, isComic }) => {
  const { isLoggingIn, userData } = useSelector((state) => state.user);
  const [payload, setPayload] = useState({
    user: "Khách",
    comicOrChapter: errorComic,
    errorReport: "",
    textError: "",
  });
  const [textError, setTextError] = useState("");
  const closeForm = () => {
    setShowReport(false);
  }
  const handleChange = (data) => {
    if (data.value !== "0") {
      setPayload((prev) => ({
        ...prev,
        errorReport: data.childNodes[data.value].textContent,
      }));
      setTextError(
        errorReport?.find((item) => {
          return item.id.toString() === data.value;
        })?.text
      );
    } else {
      setTextError("");
    }
  };
  useEffect(() => {
    if (isLoggingIn) {
      setPayload((prev) => ({ ...prev, user: userData.fullname }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="fixed w-full h-full flex items-center justify-center bg-mainBg/70 z-50 duration-300 top-0 left-0">
      <div className="rounded-[10px] p-5 bg-mainBg animate-login-animation relative w-[400px]">
        <IoIosCloseCircle
          className="absolute top-[-10px] right-[-10px] text-main bg-white rounded-full border-none cursor-pointer"
          size={30}
          onClick={() => {
            closeForm();
          }}
        />
        <div className="mb-5 text-[21px] text-center font-bold">Báo lỗi</div>
        <div className="pb-5">
          <p className="pl-[6px] mb-[5px]">
            {isComic ? "Truyện" : "Chapter"} lỗi
          </p>
          <p className="px-4 bg-inputBg w-full leading-[44px] rounded-md">
            {errorComic}
          </p>
        </div>
        <div className="pb-5">
          <p className="pl-[6px] mb-[5px]">Chọn lỗi</p>
          <select
            className="px-4 bg-inputBg w-full h-[44px] rounded-md"
            onChange={(event) => {
              handleChange(event.target);
            }}
          >
            <option value={"0"}>--Chọn loại lỗi--</option>
            {errorReport?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="pb-5">
          {textError === "" ? (
            <p className="pl-[6px] mb-[5px] leading-7 wrap">
              Mô tả chi tiết lỗi. Nếu đúng sẽ được thưởng{" "}
              <span className="inline-block">
                <span className="flex items-center ml-1">
                  500
                  <RiMoneyDollarCircleFill className="ml-1 text-yellow-400" />
                </span>
              </span>{" "}
              . Báo sai sẽ bị trừ
              <span className="inline-block">
                <span className="flex items-center ml-1">
                  500
                  <RiMoneyDollarCircleFill className="ml-1 text-yellow-400" />
                </span>
              </span>
            </p>
          ) : (
            textError
          )}
          <input
            className="px-4 bg-inputBg w-full h-[44px] rounded-md outline-none focus:outline-main -outline-offset-2"
            onChange={(event) => {
              setPayload((prev) => ({
                ...prev,
                textError: event.target.value,
              }));
            }}
          />
        </div>
        <div className="pb-5">
          <button
            className="w-full text-center bg-main h-[44px] rounded-full"
            onClick={(event) => {
              event.preventDefault();
              
              if (payload.errorReport === "")
                Swal.fire({
                  title: "Bạn cần chọn loại lỗi!",
                  icon: "info",
                });
              else {
                postExcel(payload);
                Swal.fire({
                  title: 'Cảm ơn bạn đã báo cáo!',
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false
                }).then(() => {
                  closeForm()
                })
              }
            }}
          >
            Báo cáo
          </button>
        </div>
      </div>
      ;
    </div>
  );
};

export default Report;
