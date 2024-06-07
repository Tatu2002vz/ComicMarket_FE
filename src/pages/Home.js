import slider from "../assets/slider.png";
import { Link, useLocation } from "react-router-dom";
import { FilterTag, Comic, Pagination } from "../components";
import { createContext, useEffect, useRef, useState } from "react";
import { apiGetComicFilter } from "../apis";
import Loading from "../components/Loading";
export const comicContext = createContext();
const Home = () => {
  const [comics, setComics] = useState(null);
  let totalPage = useRef();

  const {search} = useLocation()
  const filter = search.replace('?','').split('&').map((item) => {
    return item.split('=')
  })
  const filterFinal = filter.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  const fetchComic = async () => {
    const response = await apiGetComicFilter({...filterFinal, sort: '-releaseDate'})
    if (response?.success) {
      totalPage.current = response?.counts / process.env.REACT_APP_LIMIT_COMIC;
      setComics(response?.mes);
    }
  };
  useEffect(() => {
    fetchComic();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <comicContext.Provider value={{ comics, setComics }}>
      {comics ? '' : <Loading/>}
      <div className="p-[10px] min-[1300px]:p-0">
        <Link to={"https://www.facebook.com/vantu2002"} target="_blank">
          <img src={slider} alt="" className="w-full object-cover" />
        </Link>
        <FilterTag />
        <div className="my-10">
          <div className="mt-2 border-l-[6px] border-main text-xl flex items-center p-4">
            <svg
              className="h-6 w-6 mr-2 pb-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="stars"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg=""
            >
              <path
                fill="currentColor"
                d="M325.8 152.3c1.3 4.6 5.5 7.7 10.2 7.7s8.9-3.1 10.2-7.7L360 104l48.3-13.8c4.6-1.3 7.7-5.5 7.7-10.2s-3.1-8.9-7.7-10.2L360 56 346.2 7.7C344.9 3.1 340.7 0 336 0s-8.9 3.1-10.2 7.7L312 56 263.7 69.8c-4.6 1.3-7.7 5.5-7.7 10.2s3.1 8.9 7.7 10.2L312 104l13.8 48.3zm-112.4 5.1c-8.8-17.9-34.3-17.9-43.1 0l-46.3 94L20.5 266.5C.9 269.3-7 293.5 7.2 307.4l74.9 73.2L64.5 483.9c-3.4 19.6 17.2 34.6 34.8 25.3l92.6-48.8 92.6 48.8c17.6 9.3 38.2-5.7 34.8-25.3L301.6 380.6l74.9-73.2c14.2-13.9 6.4-38.1-13.3-40.9L259.7 251.4l-46.3-94zm215.4 85.8l11 38.6c1 3.6 4.4 6.2 8.2 6.2s7.1-2.5 8.2-6.2l11-38.6 38.6-11c3.6-1 6.2-4.4 6.2-8.2s-2.5-7.1-6.2-8.2l-38.6-11-11-38.6c-1-3.6-4.4-6.2-8.2-6.2s-7.1 2.5-8.2 6.2l-11 38.6-38.6 11c-3.6 1-6.2 4.4-6.2 8.2s2.5 7.1 6.2 8.2l38.6 11z"
              ></path>
            </svg>
            Gợi ý thông minh
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {comics?.map((item, index) => {
            return <Comic key={index} comic={item} />;
          })}
        </div>
        <Pagination total={Math.ceil(totalPage.current)} />
      </div>
    </comicContext.Provider>
  );
};

export default Home;
