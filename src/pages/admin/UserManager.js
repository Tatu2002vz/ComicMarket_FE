import { apiDeleteUser, apiGetAllUser } from "../../apis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Pagination } from "../../components/";
import icons from "../../utils/icons";
const { MdDelete, FaUserEdit } = icons;
const UserManager = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const fetchUser = async () => {
    const getUsers = await apiGetAllUser();
    if (getUsers.success) {
      setUsers(getUsers.mes);
    }
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Xác nhận xoá tài khoản này?",
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(id);
        if (response.success) {
          toast.success("Xoá thành công", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          fetchUser();
        } else {
          toast.error(response?.mes, {
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
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="p-5">
      <button
        className="px-4 py-2 border rounded-md mb-4 bg-gradient-to-l from-main to-purple-600"
        onClick={() => {
          navigate("/admin/manage-user/new-user");
        }}
      >
        + Thêm mới
      </button>
      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>STT</th>
              <th>Email</th>
              <th>Họ và tên</th>
              <th>Role</th>
              <th>Số dư ví</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.email}</td>
                  <td>{item?.fullname}</td>
                  <td>{item?.role}</td>
                  <td>{item?.walletBalance}</td>
                  <td>{item?.status ? item?.status : "Active"}</td>
                  <td className="text-center">
                    <div className="flex">
                      <button className="px-2 mr-3">
                        <FaUserEdit
                          className="text-white"
                          onClick={() => {
                            navigate("/admin/manage-user/" + item._id);
                          }}
                        />
                      </button>
                      <button
                        className="px-2"
                        data-id={item?._id}
                        onClick={() => {
                          handleDelete(item?._id);
                        }}
                      >
                        <MdDelete className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default UserManager;
