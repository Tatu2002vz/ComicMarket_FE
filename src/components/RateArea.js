import { useState } from "react";
import icons from "../utils/icons";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiCreateComment } from "../apis";
import { toast } from "react-toastify";

const { IoChatbubblesSharp, BsFillSendFill } = icons;

const RateArea = ({ amount, isComic, id, socket }) => {
  const { isLoggingIn } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (!isLoggingIn) {
      Swal.fire({
        title: "Bạn cần đăng nhập để thực hiện chức năng này!",
        icon: "info",
      });
    } else {
      console.log(comment);
      if(comment.match(/^(?=.*[a-zA-Z])|(?=.*\d)|(?=.*\W).\S*$/)) {
        const resp = await apiCreateComment({ content: comment, isComic, id });
        if (resp?.success) {
          socket.emit("submit", { id: id });
          toast.success("Bình luận thành công", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setComment("")
        }
      }
    }
  };
  return (
    <div className="relative mb-4">
      <div className="mb-3 flex items-center text-[19px]">
        <IoChatbubblesSharp className="mr-2" />
        {amount}
        <span className="ml-2">Bình luận</span>
      </div>
      <form>
        <textarea
          className="w-full px-4 py-3 bg-[#303956] h-24 border-0 rounded-md outline-none resize-none relative"
          placeholder="Nội dung bình luận..."
          value={comment}
          onChange={(event) => handleChange(event)}
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              e.preventDefault();
              handleSubmit()
            }
          }}
        ></textarea>
        <button
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <BsFillSendFill size={20} className="absolute bottom-3 right-3" />
        </button>
      </form>
    </div>
  );
};

export default RateArea;
