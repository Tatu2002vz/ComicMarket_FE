import { apiDeleteComic, apiGetChapters, apiGetComicFilter } from "../../apis";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icons from "../../utils/icons";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Pagination } from "../../components";
const { MdDelete, FaUserEdit } = icons;
const ChapterManger = () => {
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
  const [listChapter, setListChapter] = useState(null);
  const fetchComic = async () => {
    const getComics = await apiGetComicFilter({
      ...filterFinal,
      sort: "-releaseDate",
    });
    if (getComics?.success) {
      totalPage.current = Math.ceil(
        getComics?.counts / process.env.REACT_APP_LIMIT_COMIC || 24
      );
      setComics(getComics?.mes);
      let getListComicPromise = [];
      getComics?.mes.forEach((item) => {
        getListComicPromise.push(apiGetChapters(item._id));
      });
      const listChapters = await Promise.all(getListComicPromise);
      setListChapter(listChapters);
    }
  };
  useEffect(() => {
    fetchComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Xác nhận xoá chapter này?",
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
  return (
    <div className="p-5">
      {comics?.map((item, index) => {
        return (
          <div key={index} className="py-10 border-b">
            <div className="mx-auto flex items-center flex-col">
              <img src={item?.coverImage} alt="" />
              <p className="py-2">{item?.title}</p>
            </div>
            <table className="w-auto mx-auto mt-5">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Các chapter</th>
                  <th>Giá</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {listChapter &&
                  listChapter[index]?.mes.map((el, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>Chapter {el?.chapNumber}</td>
                        <td>{el?.price}</td>
                        <td>
                          <button
                            className="px-2 mr-3"
                            onClick={() => {
                              navigate(
                                `/admin/manage-chapter/${item?.slug}/` + el._id
                              );
                            }}
                          >
                            <FaUserEdit className="text-main" />
                          </button>
                          <button
                            className="px-2"
                            onClick={() => handleDelete(el?._id)}
                          >
                            <MdDelete className="text-red-500" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot></tfoot>
            </table>
            <div className="flex justify-center pt-5">
              <button
                className="px-4 py-2 border rounded-md mb-4 bg-gradient-to-l from-main to-purple-600"
                onClick={() => {
                  navigate(`/admin/manage-chapter/${item?.slug}/new-chapter`);
                }}
              >
                + Thêm mới
              </button>
            </div>
          </div>
        );
      })}
      <div className="py-4">
        <Pagination total={totalPage.current} />
      </div>
    </div>
  );
};

export default ChapterManger;
