import { useSelector } from "react-redux";
import { Header, Sidebar, Footer } from "./components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { Toast } from "../../components";
const DefaultLayoutAdmin = ({ children }) => {
  const navigate = useNavigate()
  const {isLoggingIn} = useSelector(state => state.user)
  const [isShowMenu, setIsShowMenu] = useState(false)
  useEffect(() => {
    if(!isLoggingIn){
      navigate('/')
   }
  })
  return (
    <div className="md:grid md:grid-cols-7 text-white bg-mainBg relative">
      <div className={`w-2/3 md:w-full md:col-span-1 absolute z-10 md:relative ${!isShowMenu ? '-translate-x-full' : 'translate-x-0'} duration-200 md:translate-x-0`}>
        <Sidebar setIsShowMenu={setIsShowMenu} />
      </div>
      <div className="col-span-6 flex flex-col">
        <div className="h-[65px]">
          <Header setIsShowMenu={setIsShowMenu} />
        </div>
        <div className="flex-grow">{children}</div>
        <div className="">
          <Footer />
        </div>
        {/* <div className="fixed top-8 right-8 toast">
          <Toast
            status={"success"}
            message={"Anyone with access can view your invited visitors."}
          />
          <Toast
            status={"error"}
            message={"Anyone with access can view your invited visitors."}
          />
        </div> */}
      </div>
    </div>
  );
};

export default DefaultLayoutAdmin;
