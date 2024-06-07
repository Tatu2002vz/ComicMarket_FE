import logo from "../assets/logo.png";
import { InputField } from "../components";
import icons from "../utils/icons";
import { apiLogin, apiRegister, apiForgotPassword } from "../apis";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "../store/user/userSlice";
import validate from "../utils/validate";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const { useState, useEffect, memo } = require("react");
const { IoIosCloseCircle } = icons;
const Login = ({ setIsShow, active, setActive }) => {
  const dispatch = useDispatch();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [invalidField, setInvalidField] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const closeForm = () => {
    setIsShow(false);
  };
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    fullname: "",
  });
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      fullname: "",
    });
  };
  useEffect(() => {
    resetPayload();
    if (invalidField.length > 0) {
      setInvalidField([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, isForgotPassword]);
  const onKeyDown = (event) => {
    if(event.key === 'Enter') {
      handleSubmit(payload);
    }
  };
  const handleSubmit = async (payload) => {
    let invalid;
    if (!active && !isForgotPassword) {
      const { fullname, ...data } = payload;
      invalid = validate(data, setInvalidField);
    }
    if (active && !isForgotPassword) {
      invalid = validate(payload, setInvalidField);
    }
    if (isForgotPassword) {
      const { email } = payload;
      invalid = validate({ email: email }, setInvalidField);
    }
    if (invalid === 0) {
      if (!active && !isForgotPassword) {
        setIsLoading(true);
        const res = await apiLogin(payload);
        setIsLoading(false);
        if (res?.success) {
          await dispatch(
            login({
              isLoggingIn: true,
              userData: res?.userData,
              token: res?.accessToken,
            })
          );
          navigate(0);
          setIsShow(false);
        } else {
          Swal.fire(
            "Thất bại!",
            "Vui lòng kiểm tra lại tài khoản và mật khẩu!",
            "error"
          );
        }
        // navigate(0)
      }
      if (active && !isForgotPassword) {
        setIsLoading(true);
        const res = await apiRegister(payload);
        setIsLoading(false);
        console.log(res?.data);
        if (res?.success) {
          Swal.fire({
            title: "Thành công!",
            icon: "success",
            position: "center",
            timer: 1500,
            text: "Đăng ký thành công! Vui lòng đăng nhập lại!",
          }).then(() => {
            setIsShow(false);
          });
        } else {
          Swal.fire("Thất bại!", res?.mes, "error");
        }
      }
      if (isForgotPassword) {
        setIsLoading(true);
        const res = await apiForgotPassword(payload);
        setIsLoading(false);
        if (res?.success) {
          Swal.fire({
            title: "Thành công!",
            text: "Vui lòng kiểm tra email để lấy lại mật khẩu!",
            timer: 1500,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Thất bại!",
            text: "Email này chưa được đăng ký!",
            timer: 1500,
            icon: "error",
          });
        }
      }
    }
  };
  return (
    <div className="fixed w-full h-full flex items-center justify-center bg-mainBg/25 z-50 duration-300">
      <div className="rounded-[10px] login-popup p-5 animate-login-animation relative sm:w-[400px] max-w-[400px] w-full mr-6 ml-2">
        <IoIosCloseCircle
          className="absolute top-[-10px] right-[-10px] text-main bg-white rounded-full border-none cursor-pointer"
          size={30}
          onClick={closeForm}
        />
        <div className="flex justify-center text-[17px] font-[600] gap-5">
          <p
            className={
              active
                ? "relative after:content-[''] after:block after:absolute after:bg-main after:w-1/2 after:h-1 after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:rounded-md cursor-pointer"
                : "cursor-pointer text-gray-300"
            }
            onClick={() => {
              setActive(true);
              setIsForgotPassword(false);
            }}
          >
            Đăng ký
          </p>
          <p
            className={
              !active
                ? "relative after:content-[''] after:block after:absolute after:bg-main after:w-1/2 after:h-1 after:bottom-0 after:left-1/2 after:translate-x-[-50%] after:rounded-md cursor-pointer"
                : "cursor-pointer text-gray-300"
            }
            onClick={() => {
              setActive(false);
              setIsForgotPassword(false);
            }}
          >
            Đăng nhập
          </p>
        </div>
        <div className="px-[10px]">
          <div className="flex justify-center items-center">
            <img src={logo} alt="" className="w-[188px] mt-5 mb-10" />
          </div>
          {active ? (
            <div className="mb-5 w-full flex flex-col justify-center items-center">
              <p className="text-xl font-[600]">Đăng ký thành viên</p>
              <div className="w-full text-white mt-4">
                <InputField
                  label={"Email đăng kí"}
                  placeholder="example@example.com"
                  payload={payload}
                  setPayload={setPayload}
                  namekey="email"
                  value={payload.email}
                  invalidField={invalidField}
                  setInvalidField={setInvalidField}
                  onKeyDown={onKeyDown}
                />
                <InputField
                  label={"Mật khẩu"}
                  type={"password"}
                  payload={payload}
                  setPayload={setPayload}
                  namekey="password"
                  value={payload.password}
                  invalidField={invalidField}
                  setInvalidField={setInvalidField}
                  onKeyDown={onKeyDown}
                />
                {/* <InputField label={"Nhập lại mật khẩu"} type={"password"} payload={payload} setPayload={setPayload}/> */}
                <InputField
                  label={"Tên hiển thị"}
                  payload={payload}
                  setPayload={setPayload}
                  namekey="fullname"
                  value={payload.fullname}
                  invalidField={invalidField}
                  setInvalidField={setInvalidField}
                  onKeyDown={onKeyDown}
                />
              </div>
            </div>
          ) : (
            <div className="mb-5 w-full flex flex-col justify-center items-center">
              <p className="text-xl font-[600]">Đăng nhập</p>
              <div className="w-full text-white mt-4">
                <InputField
                  label={"Tên đăng nhập hoặc Email"}
                  placeholder="example@example.com"
                  payload={payload}
                  setPayload={setPayload}
                  namekey="email"
                  value={payload.email}
                  invalidField={invalidField}
                  setInvalidField={setInvalidField}
                  onKeyDown={onKeyDown}
                />
                {!isForgotPassword && (
                  <InputField
                    label={"Mật khẩu"}
                    type={"password"}
                    payload={payload}
                    setPayload={setPayload}
                    namekey={"password"}
                    value={payload.password}
                    invalidField={invalidField}
                    setInvalidField={setInvalidField}
                    onKeyDown={onKeyDown}
                  />
                )}
              </div>
              <div className="flex w-full justify-end">
                <p
                  className="italic cursor-pointer hover:text-main hover:underline text-xs"
                  onClick={() => {
                    setIsForgotPassword(!isForgotPassword);
                  }}
                >
                  {isForgotPassword ? "Quay lại đăng nhập!" : "Quên mật khẩu?"}
                </p>
              </div>
            </div>
          )}
          <button
            className="bg-main rounded-md w-full py-[10px] text-center outline-none"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              handleSubmit(payload);
            }}
          >
            {!isForgotPassword
              ? active
                ? "Đăng ký"
                : "Đăng nhập"
              : "Lấy lại mật khẩu"}
          </button>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default memo(Login);
