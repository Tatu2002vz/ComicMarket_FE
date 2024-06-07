import { useEffect, useState } from "react";
import icons from "../utils/icons";
import { ListFilter } from "../components";
import { useSelector } from "react-redux";
import { comicContext } from "../pages/Home";
import { useContext } from "react";
import { apiGetComicFilter } from "../apis";

const { FaCaretDown } = icons;
const FilterTag = () => {
  const [tabActive, setTabActive] = useState();
  const genres = useSelector((state) => state.app.genres);
  const [genreFilter, setGenreFilter] = useState("Tất cả");
  const [sortFilter, setSortFilter] = useState("Tất cả");
  const { setComics } = useContext(comicContext);
  const [filter, setFilter] = useState({
    genre: null,
    sort: "-releaseDate",
  });
  const fetchComicFilter = async () => {
    let check;
    if (filter.genre === "") {
      check = filter.check;
    } else {
      check = filter;
    }
    const comicApi = await apiGetComicFilter(check);
    setComics(comicApi?.mes);
  };
  useEffect(() => {
    fetchComicFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  const sortBy = [
    {
      id: 1,
      name: "Lượt xem",
    },
    {
      id: 2,
      name: "Theo tên A-Z",
    },
    {
      id: 3,
      name: "Theo dõi",
    },
  ];
  // const test = [
  //   {
  //     name: "test",
  //   },
  //   {
  //     name: "test",
  //   },
  //   {
  //     name: "test",
  //   },
  //   {
  //     name: "test",
  //   },
  // ];
  const listTag = [
    {
      id: 1,
      label: "Thể loại",
      value: genreFilter,
      setValue: setGenreFilter,
      options: [{ name: "Tất cả" }, ...genres],
    },
    {
      id: 2,
      label: "Sắp xếp theo",
      value: sortFilter,
      setValue: setSortFilter,
      options: [...sortBy],
    },
    // {
    //   id: 3,
    //   label: "Chapter tối thiểu",
    //   value: chapFilter,
    //   setValue: setChapFilter,
    //   options: [
    //     ...test
    //   ]
    // },
    // {
    //   id: 4,
    //   label: "Truyện hot",
    //   value: "Tất cả",
    //   setValue: setGenreFilter,
    //   options: [
    //     ...genres
    //   ]
    // },
  ];

  return (
    <div className="p-4 bg-color-float w-full flex gap-16 my-10 relative">
      {listTag.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => {
              if (tabActive === item.id) setTabActive("");
              else setTabActive(item.id);
            }}
          >
            <label className="text-xs text-main-text-color mb-[10px] block">
              {item.label}
            </label>
            <p className="cursor-pointer flex items-center">
              {item.value}
              <FaCaretDown className="ml-1" />
            </p>
            {tabActive === item.id && (
              <ListFilter
                list={item.options}
                setValue={item.setValue}
                id={item.id}
                setFilter={setFilter}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterTag;
