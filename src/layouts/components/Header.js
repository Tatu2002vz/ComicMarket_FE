/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo, useRef } from "react";
import logo_desktop from "../../assets/logo.png";
import logo_mobile from "../../assets/logo-mobile.png";
import { Button, Login, Notification, SearchResult } from "../../components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout, clearMessage } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../utils/icons";
import Swal from "sweetalert2";
import { getCurrent } from "../../store/user/asyncAction";
import { apiGetComicWithTitle } from "../../apis";
import { toast } from "react-toastify";
const {
  IoNotifications,
  IoPersonOutline,
  CgLogOut,
  RiMoneyDollarCircleFill,
  FiSearch,
  IoClose,
  LuSwords,
  GiMoneyStack
} = icons;
const Header = () => {
  const inputSearch = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logo, setLogo] = useState(logo_desktop);
  const [isShow, setIsShow] = useState(false);
  const [active, setActive] = useState();
  const [isShowOption, setIsShowOption] = useState(false);
  const [search, setSearch] = useState("");
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggingIn, userData, errorMessage } = useSelector(
    (state) => state.user
  );
  const [showInputMobile, setShowInputMobile] = useState(false);
  const showForm = () => {
    setIsShow(true);
  };
  const fetchComic = async () => {
    try {
      const response = await apiGetComicWithTitle(search);
      setComics(response?.mes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (errorMessage) {
    toast.error(errorMessage);
    dispatch(clearMessage());
  }
  useEffect(() => {
    if (isLoggingIn) {
      dispatch(getCurrent());
    }
    if (window.innerWidth < 1024) setLogo(logo_mobile);
    else setLogo(logo_desktop);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("reset", handleResize);
    };
  }, []);
  useEffect(() => {
    if (search !== "") {
      setIsLoading(true);
      const handler = setTimeout(() => {
        fetchComic();
      }, 500);
      return () => clearTimeout(handler);
    } else {
      setIsLoading(false);
    }
  }, [search]);
  const handleResize = () => {
    if (window.innerWidth < 1024) setLogo(logo_mobile);
    else setLogo(logo_desktop);
  };
  return (
    <header className="bg-headerBg h-[70px] text-[15px] fixed left-0 right-0 top-0 z-50 w-full px-[10px] min-[1300px]:p-0 ">
      {isShow && (
        <Login setIsShow={setIsShow} active={active} setActive={setActive} />
      )}
      <div className=" flex items-center h-full justify-between max-w-main mx-auto">
        <div
          className={`flex justify-center items-center ${
            showInputMobile ? "w-full" : ""
          }`}
        >
          <Link to={"/"}>
            <img
              src={logo}
              alt=""
              className={`h-[30px] w-auto ${showInputMobile ? "hidden" : ""}`}
            />
          </Link>
          <div
            className={`rounded-full relative ml-5 min-w-6 min-h-6 border lg:p-0 lg:border-none ${
              showInputMobile ? "border-none p-0 w-full mr-5" : "p-5"
            }`}
          >
            <input
              type="text"
              ref={inputSearch}
              placeholder="Bạn muốn tìm truyện gì"
              className={`rounded-full w-[400px] h-[44px] bg-inputBg pl-5 focus:outline-none lg:block ${
                showInputMobile ? "block w-full" : "hidden"
              }`}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            {isLoading ? (
              <div
                className={`text-main-text-color w-6 h-6 absolute top-1/2 right-1/2 lg:right-3 lg:top-1/2 -translate-y-1/2 translate-x-1/2 lg:translate-x-0 cursor-pointer ${
                  showInputMobile ? "right-5 translate-x-0" : ""
                }`}
              >
                <span className="loader-search"></span>
              </div>
            ) : (
              <FiSearch
                size={24}
                className={`text-main-text-color absolute top-1/2 right-1/2 lg:right-3 lg:top-1/2 -translate-y-1/2 translate-x-1/2 lg:translate-x-0 cursor-pointer ${
                  showInputMobile ? "right-5 translate-x-0" : ""
                }`}
                onClick={() => {
                  const width = window.innerWidth;
                  if (width < 1024) {
                    setShowInputMobile(true);
                  }
                }}
              />
            )}
            {search !== "" && <SearchResult data={comics} />}
          </div>
          {showInputMobile ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowInputMobile(false);
                setSearch("");
                inputSearch.current.focus();
              }}
            >
              <IoClose size={30} />
            </div>
          ) : null}
        </div>

        {!isLoggingIn ? (
          <div
            className={`flex items-center ${showInputMobile ? "hidden" : ""}`}
          >
            <Button
              text={"Đăng ký"}
              css={"border-main hidden sm:block"}
              onClick={() => {
                showForm();
                setActive(true);
              }}
            ></Button>
            <Button
              text={"Đăng nhập"}
              css={"bg-main border-main ml-5"}
              onClick={() => {
                showForm();
                setActive(false);
              }}
            ></Button>
          </div>
        ) : (
          <div
            className={`flex items-center h-full ${
              showInputMobile ? "hidden" : ""
            }`}
          >
            <div className="relative">
              <IoNotifications
                className="mx-5 cursor-pointer"
                size={26}
                onClick={() => {
                  setIsShowNotification(!isShowNotification);
                }}
              />
              {isShowNotification && <Notification />}
            </div>
            <div
              className="h-full w-auto py-3 flex items-center relative"
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
                <p className="cursor-pointer font-semibold">
                  {userData?.fullname}
                </p>
                <p className="text-xs flex items-center ml-1">
                  {userData?.walletBalance}{" "}
                  <RiMoneyDollarCircleFill color="yellow" className="ml-1" />
                </p>
              </div>
              {isShowOption && (
                <div
                  className="absolute top-full right-0 py-2 bg-chapter-border-color flex flex-col justify-center translate-y-2 rounded-lg w-[250px] p-[10px]"
                  onClick={() => {}}
                >
                  <NavLink to={'/payment'} className="flex px-4 py-2 items-center cursor-pointer rounded-full hover:bg-main">
                    <GiMoneyStack className="mr-2" />
                    Nạp tiền
                  </NavLink>

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
        )}
      </div>
    </header>
  );
};

export default memo(Header);
