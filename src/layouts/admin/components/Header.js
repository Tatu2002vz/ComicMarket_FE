import { useEffect, useState } from "react";
import icons from "../../../utils/icons";
import { Breadcrumbs, Notification } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../../store/user/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { getCurrent } from "../../../store/user/asyncAction";
const {
  IoNotifications,
  RiMoneyDollarCircleFill,
  IoPersonOutline,
  CgLogOut,
  LuSwords,
  TfiMenuAlt,
} = icons;

const Header = ({ setIsShowMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggingIn } = useSelector((state) => state.user);

  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isShowOption, setIsShowOption] = useState(false);
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggingIn) {
      dispatch(getCurrent());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <div className="flex px-6 justify-between border-b h-[65px] items-center">
      <p className="leading-[65px] hidden md:flex">
        <Breadcrumbs />
      </p>
      <p
        className="md:hidden"
        onClick={() => {
          setIsShowMenu(true);
        }}
      >
        <TfiMenuAlt className="text-xl" />
      </p>
      <div className="flex items-center relative">
        <IoNotifications
          className="mx-5 cursor-pointer"
          size={26}
          onClick={() => {
            setIsShowNotification(!isShowNotification);
          }}
        />
        {isShowNotification && <Notification className="z-10" />}
        <div
          className="h-[65px] w-auto py-3 flex items-center relative"
          onClick={() => {
            setIsShowOption(!isShowOption);
          }}
        >
          <img
            src={`${process.env.REACT_APP_API_IMAGE}${userData?.avatar}`}
            alt="avatar"
            className="h-full mr-2 cursor-pointer"
          />
          <div>
            <p className="cursor-pointer font-semibold">{userData?.fullname}</p>
            <p className="text-xs flex items-center ml-1">
              {userData?.walletBalance}{" "}
              <RiMoneyDollarCircleFill color="yellow" className="ml-1" />
            </p>
          </div>
          {isShowOption && (
            <div
              className="absolute top-full right-0 py-2 bg-chapter-border-color flex flex-col justify-center translate-y-2 rounded-lg w-[250px] p-[10px] z-10"
              onClick={() => {}}
            >
              {/* <div className="flex px-4 py-2 items-center cursor-pointer rounded-full hover:bg-main">
                    <LuSwords className="mr-2" />
                    Tu luyện
                  </div> */}

              <NavLink
                to={"/profile"}
                className="flex px-4 py-2 items-center cursor-pointer rounded-full hover:bg-main"
              >
                <IoPersonOutline className="mr-2" size={20} />
                Trang cá nhân
              </NavLink>

              {userData?.role === "admin" && (
                <NavLink
                  to={"/admin"}
                  className="flex px-4 py-2 items-center cursor-pointer rounded-full hover:bg-main"
                >
                  <LuSwords className="mr-2" size={20} />
                  Quản lý
                </NavLink>
              )}

              <div
                className="flex px-4 py-2 items-center cursor-pointer rounded-full hover:bg-main"
                onClick={(event) => {
                  Swal.fire({
                    icon: "question",
                    title: "Bạn chắc chắn đăng xuất ?",
                    showCancelButton: true,
                    cancelButtonText: "Không",
                    confirmButtonText: "Đăng xuất",
                    showConfirmButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                  }).then((result) => {
                    console.log(result.isConfirmed);
                    if (result.isConfirmed) {
                      dispatch(logout());
                      navigate(0);
                    }
                  });
                }}
              >
                <CgLogOut className="mr-2" size={20} />
                Đăng xuất
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
