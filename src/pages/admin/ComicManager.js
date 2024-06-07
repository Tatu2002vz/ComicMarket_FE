import { apiDeleteComic, apiGetComicFilter } from "../../apis";
import { useEffect, useRef, useState } from "react";
import getTime from "../../utils/getTime";
import { useLocation, useNavigate } from "react-router-dom";
import icons from "../../utils/icons";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Pagination } from "../../components";
const { MdDelete, FaUserEdit, MdArrowDropDown, MdArrowDropUp } = icons;
const ComicManager = () => {
  const { search } = useLocation();
  const filter = search
    .replace("?", "")
    .split("&")
    .map((item) => {
      return item.split("=");
    });
  const filterFinal = filter.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  const totalPage = useRef();
  const navigate = useNavigate();
  const [comics, setComics] = useState(null);
  const [sortBy, setSortBy] = useState("-releaseDate");
  const fetchComic = async () => {
    const getComics = await apiGetComicFilter({
      ...filterFinal,
      sort: sortBy,
    });
    if (getComics.success) {
      totalPage.current = Math.ceil(
        getComics?.counts / process.env.REACT_APP_LIMIT_COMIC || 24
      );
      setComics(getComics.mes);
    }
  };
  useEffect(() => {
    fetchComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortBy]);
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Xác nhận xoá truyện này?",
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteComic(id);
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
          fetchComic();
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
  const handleSort = (keySort) => {
    if (keySort === "") {
    } else if (keySort === `${sortBy}`) setSortBy(`-${keySort}`);
    else if (keySort === `-${sortBy}`) setSortBy((prev) => () => prev.slice(1));
    else {
      setSortBy(keySort);
    }
  };
  console.log(sortBy);
  return (
    <div className="p-5">
      <button
        className="px-4 py-2 border rounded-md mb-4 bg-gradient-to-l from-main to-purple-600"
        onClick={() => {
          navigate("/admin/manage-comic/new-comic");
        }}
      >
        + Thêm mới
      </button>
      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr>
              {[
                {
                  name: "STT",
                  key: "",
                },
                {
                  name: "Tên truyện",
                  key: "title",
                },
                {
                  name: "Ảnh bìa",
                  key: "",
                },
                {
                  name: "View",
                  key: "viewCount",
                },
                {
                  name: "Follow",
                  key: "follow",
                },
                {
                  name: "Ngày phát hành",
                  key: "releaseDate",
                },
                {
                  name: "Trạng thái",
                  key: "",
                },
                {
                  name: "Hành động",
                  key: "",
                },
              ].map((item, index) => {
                return (
                  <th
                    key={index}
                    className={`${
                      item.key !== "" ? "cursor-pointer min-w-20" : ""
                    } relative min-w-20 text-ellipsis overflow-hidden whitespace-nowrap`}
                    onClick={() => {
                      console.log(sortBy !== `-${item.key}`);
                      handleSort(item.key);
                    }}
                  >
                    <div className="flex justify-center items-center">
                      {item.name}
                      {item.key !== "" &&
                      sortBy !== `${item.key}` &&
                      sortBy !== `-${item.key}` ? (
                        <div className="flex flex-col relative justify-center items-center bottom-1">
                          <MdArrowDropUp className="" size={24} />
                          <MdArrowDropDown
                            className="absolute top-2"
                            size={24}
                          />
                        </div>
                      ) : null}
                      {sortBy === `${item.key}` ? (
                        <MdArrowDropDown className="inline text-3xl" />
                      ) : sortBy === `-${item.key}` ? (
                        <MdArrowDropUp className="inline text-3xl" />
                      ) : null}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {comics?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="text-ellipsis overflow-hidden whitespace-nowrap">
                    {item?.title}
                  </td>
                  <td>
                    <img
                      src={item?.coverImage}
                      alt=""
                      className="h-10 mx-auto"
                    />
                  </td>
                  <td>{item?.viewCount}</td>
                  <td>{item?.follow}</td>
                  <td>{getTime(item?.releaseDate)}</td>
                  <td>{item?.status ? item?.status : "Active"}</td>
                  <td className="">
                    <div className="flex">
                      <button
                        className="px-2 mr-3"
                        onClick={() => {
                          navigate("/admin/manage-comic/" + item._id);
                        }}
                      >
                        <FaUserEdit className="text-main" />
                      </button>
                      <button
                        className="px-2"
                        onClick={() => handleDelete(item?._id)}
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
      <div className="py-4">
        <Pagination total={totalPage.current} />
      </div>
    </div>
  );
};

export default ComicManager;
