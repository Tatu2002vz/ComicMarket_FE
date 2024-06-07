import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  apiGetComic,
  apiGetComicWithTitle,
  apiGetCommentWithComic,
} from "../apis";
import { useEffect, useMemo, useState } from "react";
import icons from "../utils/icons";
import { apiGetChapters } from "../apis/chapter";
import {
  RateArea,
  ChapterList,
  Report,
  Comment,
  Breadcrumbs,
} from "../components";
import { comicError } from "../enum/listError";
import calculateTime from "../utils/calculateTime";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { apiFollow, apiGetFollow, apiUnfollow } from "../apis/follow";
import { toast } from "react-toastify";
const {
  HiStatusOnline,
  GrUpdate,
  IoEye,
  IoBookmark,
  BiSolidBook,
  IoMdWarning,
  IoLogoFacebook,
  RiInformationFill,
  TfiMenuAlt,
  RiMoneyDollarCircleFill,
} = icons;
// const socket = io(process.env.REACT_APP_URL_SERVER, {
//   query: { isComic: true },
// }); // khởi tạo 1 lần

const ComicDetail = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [showReport, setShowReport] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const { isLoggingIn } = useSelector((state) => state.user);
  const {pathname} = useLocation()
  const [data, setData] = useState({
    comic: null,
    chapters: null,
    comments: null,
  });
  const fetchComic = async () => {
    if (slug === "chapter") navigate(`/comic/${id}`);
    let comicID = null;
    if (!id) {
      const comicApi = await apiGetComicWithTitle(slug);
      if (comicApi?.success) {
        comicID = comicApi?.mes[0]._id;
        navigate(`${pathname}/${comicID}`)
      }
    }

    const idFinal = id ? id : comicID;
    const comicApi = await apiGetComic(idFinal);
    const chaptersApi = await apiGetChapters(idFinal);
    const getComments = await apiGetCommentWithComic(idFinal);
    if (isLoggingIn) {
      const follow = await apiGetFollow(idFinal);
      if (follow.success) {
        if (follow.mes.length > 0) setIsFollow(true);
      }
    }
    if (comicApi?.success && chaptersApi?.success && getComments?.success) {
      setData((prev) => ({
        ...prev,
        comic: comicApi?.mes,
        chapters: chaptersApi?.mes,
        comments: getComments?.mes,
      }));
    } else {
      console.log(comicApi);
      console.log(chaptersApi);
      console.log(getComments);
    }
  };

  const handleFollow = async () => {
    if (!isLoggingIn) {
      toast.info(`Vui lòng đăng nhập để thực hiện chức năng này!`);
    } else {
      if (!isFollow) {
        const follow = await apiFollow({ comicID: id });
        if (follow.success) {
          setIsFollow(true);
          toast.success("Theo dõi thành công!");
        } else {
          toast.error("Có lỗi xảy ra! Vui lòng thử lại sau!");
        }
      } else {
        const unfollow = await apiUnfollow({ comicID: id });
        if (unfollow.success) {
          setIsFollow(false);
          toast.success("Bỏ theo dõi thành công!");
        } else {
          toast.error("Có lỗi xảy ra! Vui lòng thử lại sau!");
        }
      }
    }
  };
  const socket = useMemo(() => {
    return io(process.env.REACT_APP_URL_SERVER, {
      query: { isComic: true },
    });
  }, []); // Chỉ khởi tạo socket một lần
  const { comic, chapters, comments } = data;
  useEffect(() => {
    fetchComic();
    socket.on("refreshCmt", (data) => {
      setData((prev) => ({
        ...prev,
        comments: data?.mes,
      }));
    });
    return () => {
      socket.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, slug]);

  return (
    <div className="bg-mainBg relative pb-6">
      <div className="h-[350px] overflow-hidden absolute top-0 left-0 w-full z-0">
        <img
          src={comic?.coverImage}
          alt=""
          className="w-full object-cover blur-xl opacity-50"
        />
      </div>
      <p className="text-ellipsis md:pt-[24px] md:mb-5 max-w-main mx-auto text-white z-10 p-[10px] min-[1300px]:p-0 min-[1300px]:pt-[24px] relative flex">
        <Breadcrumbs comic={data.comic} />
      </p>
      <div className="p-[25px] bg-color-float max-w-main mx-auto z-1 relative text-sm rounded-b-md">
        <div className="flex mb-10 flex-col md:flex-row gap-4 items-center md:items-start">
          <img
            src={comic?.coverImage}
            alt="avatar"
            className="w-[190px] mr-[25px]"
          />
          <div className="w-full">
            <h1 className="text-2xl text-center md:text-left">
              {comic?.title}
            </h1>
            <div className="my-3 flex flex-wrap">
              {comic?.genre?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className="px-2 py-1 my-1 bg-[#4A5693] mr-2"
                  >
                    {item?.name}
                  </span>
                );
              })}
            </div>
            <div className="flex my-3 flex-row w-full">
              <p className="mr-6 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex items-center">
                <HiStatusOnline className="mr-1" size={18} />
                Tình trạng
              </p>
              <p className="flex-1">Đang cập nhật</p>
            </div>
            <div className="flex my-3 flex-row w-full">
              <p className="mr-6 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex items-center">
                <GrUpdate className="mr-1" size={18} />
                Cập nhật
              </p>
              <p className="">
                {chapters &&
                  (chapters[0]?.createdAt ? (
                    calculateTime(chapters[0]?.createdAt)
                  ) : (
                    <span>0 phút trước</span>
                  ))}
              </p>
            </div>
            <div className="flex my-3 flex-row w-full">
              <p className="mr-6 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex items-center">
                <IoEye className="mr-1" size={18} />
                Lượt xem
              </p>
              <p className="flex-1">{comic?.viewCount}</p>
            </div>
            <div className="flex my-3 flex-row w-full">
              <p className="mr-6 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex items-center">
                <IoBookmark className="mr-1" size={18} />
                Lượt theo dõi
              </p>
              <p className="flex-1">178</p>
            </div>
            <div className="grid my-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:w-full lg:w-3/4">
              <NavLink
                to={
                  comic
                    ? `/comic/chapter/${slug}/${
                        chapters[chapters.length - 1]?._id
                      }`
                    : ""
                }
                className="bg-main rounded-full px-5 flex items-center justify-center"
              >
                <BiSolidBook className="mr-1" />
                Đọc từ đầu
              </NavLink>
              <div
                className="rounded-full px-5 py-2 bg-[#222F5C] flex items-center justify-center cursor-pointer"
                onClick={() => handleFollow()}
              >
                <IoBookmark className="mr-1 whitespace-nowrap text-ellipsis overflow-hidden" />
                {!isFollow ? <p className="whitespace-nowrap overflow-hidden text-ellipsis">Theo dõi</p> : <p className="whitespace-nowrap overflow-hidden text-ellipsis">Đang theo dõi</p>}
              </div>
              <div
                className=" rounded-full px-5 py-2 bg-[#222F5C] flex cursor-pointer items-center justify-center"
                onClick={() => {
                  setShowReport(true);
                }}
              >
                <IoMdWarning className="mr-1" />
                Báo lỗi
              </div>
              <div className=" rounded-full px-5 py-2 bg-[#222F5C] items-center justify-center hidden md:flex">
                <IoLogoFacebook className="mr-1" />
                Share
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <div className="mt-5 mb-3 text-[19px] flex items-center cursor-pointer">
            <RiInformationFill className="mr-2" />
            Giới thiệu
          </div>
          <p className="text-sm">{comic?.description}</p>
        </div>
        <div className="mb-10">
          <h2 className="text-[19px] flex items-center mb-3">
            <TfiMenuAlt className="mr-2" />
            Danh sách chương
          </h2>
          <div className="h-[500px] w-full overflow-auto border border-chapter-border-color rounded-md">
            <div className="grid grid-cols-5 border-b border-chapter-border-color">
              <div className="col-span-2 font-bold py-3 pl-2">Chapter</div>
              <div className="col-span-1 font-bold py-3 pl-2">Cập nhật</div>
              <div className="col-span-1 font-bold py-3 pl-2">
                <IoEye />
              </div>
              <div className="col-span-1 font-bold py-3 pl-2">
                <RiMoneyDollarCircleFill />
              </div>
            </div>
            {chapters?.map((item, index) => (
              <ChapterList
                key={index}
                slug={slug}
                data={item}
                coverImage={comic?.coverImage}
              />
            ))}
          </div>
        </div>
        <RateArea
          amount={comments?.length}
          isComic={true}
          id={id}
          socket={socket}
        />
        <div className="py-4 px-[10px] min-[1300px]:px-0">
          {comments?.map((item, index) => {
            return <Comment key={index} data={item} />;
          })}
        </div>
      </div>
      {showReport && (
        <Report
          setShowReport={setShowReport}
          errorComic={comic?.title}
          errorReport={comicError}
          isComic={true}
        />
      )}
    </div>
  );
};

export default ComicDetail;
