import { useState } from "react";
import { InputField } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { apiResetPassword } from "../apis";
import validate from "../utils/validate";
import Swal from "sweetalert2";
const ResetPassword = () => {
  const { tokenPassword } = useParams();
  const navigate = useNavigate();
  const [invalidField, setInvalidField] = useState([]);
  const [payload, setPayload] = useState({
    password: "",
    rePassword: "",
    tokenPassword: tokenPassword,
  });
  const handleSubmit = async (payload) => {
    const invalid = validate(payload, setInvalidField);
    
    if (invalid === 0) {
      if (payload.password === payload.rePassword) {
        const res = await apiResetPassword(payload);
        console.log(res);
        if (res?.success) {
          Swal.fire({
            title: "Thay đổi mật khẩu thành công!",
            icon: "success",
            timer: 1500,
            text: "Vui lòng đăng nhập lại!",
          }).then(() => {
            navigate("/");
          });
        } else {
          Swal.fire({ title: "Thất bại", text: res?.mes, icon: "error" });
        }
      } else {
        Swal.fire({
          title: "Thất bại!",
          text: "Nhập lại mật khẩu không chính xác!",
          icon: "info",
          timer: "1500",
        });
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="sm:w-[400px] w-full p-4">
        <InputField
          label={"Mật khẩu mới"}
          namekey={"password"}
          type={"password"}
          payload={payload}
          setPayload={setPayload}
          value={payload.password}
          invalidField={invalidField}
          setInvalidField={setInvalidField}
        />
        <InputField
          label={"Nhập lại mật khẩu"}
          namekey={"rePassword"}
          type={"password"}
          payload={payload}
          setPayload={setPayload}
          value={payload.rePassword}
          invalidField={invalidField}
          setInvalidField={setInvalidField}
        />
        <button
          className="bg-main rounded-md w-full py-[10px] text-center outline-none"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit(payload);
          }}
        >
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
