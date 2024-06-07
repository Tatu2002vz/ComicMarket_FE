import { useContext, useEffect, useMemo, useState } from "react";
import {
  apiGetComicFilter,
  apiGetCommentWithChapter,
} from "../apis";
import {  useParams } from "react-router-dom";
import { Breadcrumbs, Comment, Image, RateArea } from "../components";
import io from "socket.io-client";
import { apiCreateHistory } from "../apis/history";
import { useSelector } from "react-redux";
import { chapterContext } from "../layouts/FullLayout";

// const socket = io(process.env.REACT_APP_URL_SERVER, {
//   query: { isComic: false },
// }); // khởi tạo 1 lần
const Chapter = () => {
  // const [chapter, setChapter] = useState(null);
  const [comments, setComments] = useState("");
  const [comic, setComic] = useState(null);
  const { id, slug } = useParams();
  const { isLoggingIn } = useSelector((state) => state.user);
  const {chapter} = useContext(chapterContext)
  const fetchChapter = async () => {
    
    const getComments = await apiGetCommentWithChapter(id);
    if (getComments?.success) {
      setComments(getComments?.mes);
    }
    const getComic = await apiGetComicFilter({ slug: slug });
    if (getComic?.success) setComic(getComic?.mes);
    // Lưu lịch sử xem
    const historyData = {
      comicID: getComic?.mes[0]._id,
      chapterID: id,
    };
    if (isLoggingIn) {
      await apiCreateHistory(historyData);
    }
  };
  const socket = useMemo(() => {
    return io(process.env.REACT_APP_URL_SERVER, {
      query: { isComic: false },
    });
  }, []); // Chỉ khởi tạo socket một lần

  useEffect(() => {
    fetchChapter();
    socket.on("refreshCmt", (data) => {
      setComments(data?.mes);
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative pb-16">
      <div className="flex mt-5">
        <Breadcrumbs
          comic={comic && comic[0]}
          chapNumber={chapter?.chapNumber}
        />
      </div>
      <h1 className="text-center text-xl py-[30px]">
        {chapter?.comic?.title} - Chapter {chapter?.chapNumber}
      </h1>
      {chapter?.images.map((item, index) => {
      return <Image key={index} item={item} index={index} />
        // return loading === false ? <div className="px-1 md:max-w-3xl relative mx-auto w-full h-[400px] object-cover skeleton mb-1 last:mb-0"><div className="loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div></div> : <img
        //     key={index}
        //     // src={`${process.env.REACT_APP_API_IMAGE}${item}`}
        //     src={
        //       item.includes("http")
        //         ? item
        //         : `${process.env.REACT_APP_API_IMAGE}${item}`
        //     }
        //     onError={(e) => {
        //       console.log(e);
        //       setLoading(false)
        //     }}
        //     alt=""
        //     className="px-1 md:max-w-3xl mx-auto w-full object-cover"
        //   />
      //   return <img
      //   key={index}
      //   // src={`${process.env.REACT_APP_API_IMAGE}${item}`}
      //   src={
      //     item.includes("http")
      //       ? item
      //       : `${process.env.REACT_APP_API_IMAGE}${item}`
      //   }
      //   onError={() => setLoading(false)}
      //   alt=""
      //   className="px-1 md:max-w-3xl mx-auto w-full object-cover"
      // />
      })}
      <div className="p-4 px-[10px] min-[1300px]:px-0">
        <RateArea
          data={comments.length}
          isComic={false}
          id={id}
          socket={socket}
        />
      </div>
      {comments.length > 0 && (
        <div className="py-4 px-[10px] min-[1300px]:px-0">
          {comments?.map((item, index) => {
            return <Comment key={index} data={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Chapter;
