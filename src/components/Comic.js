import { NavLink } from "react-router-dom";
import { apiGetChapters } from "../apis";
import { useEffect, useState } from "react";
const Comic = ({ comic, isResult }) => {
  const [numberChap, setNumberChap] = useState();
  const fetchLastChapter = async (id) => {
    const response = await apiGetChapters(id);
    if (response?.success === true) {
      setNumberChap(response?.mes?.length);
    }
  };
  useEffect(() => {
    fetchLastChapter(comic._id);
  }, [comic]);
  return (
    <div>
      {!isResult ? (
        <NavLink
          className="flex flex-col justify-between h-full pb-8"
          to={`/comic/${comic?.slug}/${comic?._id}`}
        >
          <div>
            <div className="w-full h-[330px] rounded-md overflow-hidden">
              <img
                src={comic?.coverImage}
                alt={comic?.title}
                className="rounded-md object-cover hover:scale-110 duration-300 ease-linear w-full h-full"
              />
            </div>
            <p className="text-sm mt-2 truncate">{comic?.title}</p>
          </div>
          <p className="text-[13px] mt-3">Chapter {numberChap}</p>
        </NavLink>
      ) : (
        <NavLink
          className="flex w-full p-[10px] bg-color-float"
          to={`/comic/${comic?.slug}/${comic?._id}`}
        >
          <div>
            <div className="w-[65px] h-[86px] rounded-md overflow-hidden">
              <img
                src={comic?.coverImage}
                alt={comic?.title}
                className="rounded-md object-cover w-full"
              />
            </div>
          </div>
          <div className="pl-[10px]">
            <p className="text-sm mt-2">{comic?.title}</p>
            <p className="text-[13px] mt-3 text-[#999999]">Chapter {numberChap}</p>
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default Comic;
