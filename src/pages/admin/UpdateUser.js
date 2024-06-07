import { useEffect, useState } from "react";
import { InputField } from "../../components";
import { apiGetUser, apiRegister, apiUpdateUser } from "../../apis";
import validate from "../../utils/validate";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [invalidField, setInvalidField] = useState([]);

  const [payload, setPayload] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "user",
    walletBalance: "0",
  });
  const fetchUser = async () => {
    const user = await apiGetUser(id);
    if (user.success) {
      setPayload((prev) => ({
        ...prev,
        fullname: user?.mes?.fullname,
        email: user?.mes?.email,
        // password: user?.mes?.password,
        role: user?.mes?.role,
        walletBalance: user?.mes?.walletBalance,
      }));
    }
  };
  useEffect(() => {
    if (id !== "new-user") {
      fetchUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleSubmit = async () => {
    const {password, ...dataUpdate} = payload
    let invalid = 0
    if(id === 'new-user') {
      invalid = validate(payload, setInvalidField);
      if (invalid === 0) {
        const fetchRegister = await apiRegister(payload);
        if (fetchRegister?.success) {
          toast.success("Thêm tài khoản thành công", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(fetchRegister?.mes, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } else {
      invalid = validate(dataUpdate, setInvalidField)
      const fetchUpdate = await apiUpdateUser({payload: dataUpdate, id: id})
      if(fetchUpdate.success) {
        toast.success("Cập nhật thành công", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(fetchUpdate?.mes, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <div className="w-[400px] mx-auto my-8">
      <InputField
        label={"Email đăng kí"}
        placeholder="example@example.com"
        payload={payload}
        setPayload={setPayload}
        namekey="email"
        value={payload.email}
        invalidField={invalidField}
        setInvalidField={setInvalidField}
      />
      {
        id === 'new-user' && <InputField
        label={"Mật khẩu"}
        type={"password"}
        payload={payload}
        setPayload={setPayload}
        namekey="password"
        value={payload.password}
        invalidField={invalidField}
        setInvalidField={setInvalidField}
      />
      }
      <InputField
        label={"Tên hiển thị"}
        payload={payload}
        setPayload={setPayload}
        namekey="fullname"
        value={payload.fullname}
        invalidField={invalidField}
        setInvalidField={setInvalidField}
      />
      {/* <InputField
        label={"Quyền"}
        type={"select"}
        payload={payload}
        setPayload={setPayload}
        namekey="role"
        value={payload.role}
        invalidField={invalidField}
        setInvalidField={setInvalidField}
      /> */}
      <div className="mb-5">
        <div className="mb-[10px]">Quyền</div>
        <select
          className="mb-2 h-[44px] w-full px-[15px] rounded-md bg-inputBg autofill:bg-inputBg focus:outline-none"
          onChange={(event) =>
            setPayload((prev) => ({ ...prev, role: event.target.value }))
          }
          value={payload.role}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <InputField
        label={"Số dư ví"}
        payload={payload}
        setPayload={setPayload}
        namekey="walletBalance"
        value={payload.walletBalance}
        invalidField={invalidField}
        setInvalidField={setInvalidField}
      />
      <div className="flex gap-3">
        <button
          className="px-4 py-2 basis-1/3 rounded-md mb-4 bg-color-float"
          onClick={() => navigate(-1)}
        >
          Huỷ
        </button>
        <button
          className="px-4 py-2 basis-2/3 rounded-md mb-4 bg-gradient-to-l from-main to-purple-600"
          onClick={() => handleSubmit()}
        >
          {id === 'new-user' ? 'Thêm tài khoản' : 'Cập nhật'}
        </button>
      </div>
    </div>
  );
};

export default UpdateUser;
