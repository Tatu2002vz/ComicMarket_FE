import { useEffect, useState } from "react";
import { InputField } from "../../components";
import { apiCreateNewComic, apiGetComic, apiUpdateComic } from "../../apis";
import validate from "../../utils/validate";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const UpdateComic = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [invalidField, setInvalidField] = useState([]);
  const allGenres = useSelector((state) => state.app.genres);
  const [showImg, setShowImg] = useState(false);
  const [payload, setPayload] = useState({
    title: "",
    coverImage: null,
    genres: [],
    description: "",
  });
  const fetchUser = async () => {
    const comic = await apiGetComic(id);
    if (comic.success) {
      setPayload((prev) => ({
        ...prev,
        title: comic?.mes?.title,
        coverImage: comic?.mes?.coverImage,
        // password: comic?.mes?.password,
        genres: comic?.mes?.genre.map(item => item?._id),
        description: comic?.mes?.description,
      }));
    }
  };
  const handleCheckbox = (id) => {
    const check = payload.genres.some((item) => item === id);
    if (!check) {
      setPayload((prev) => ({
        ...prev,
        genres: [...prev.genres, id],
      }));
    } else {
      setPayload((prev) => ({
        ...prev,
        genres: prev.genres.filter((item) => item !== id),
      }));
    }
  };
  const handleChangeImage = (event) => {
    const coverImage = event.target.files[0];
    setPayload((prev) => ({ ...prev, coverImage: coverImage }));
  };
  useEffect(() => {
    if (id !== "new-comic") {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (payload.coverImage !== null) {
      setShowImg(true);
    }
  }, [payload.coverImage]);
  const handleSubmit = async () => {
    let invalid = 0;
    if (id === "new-comic") {
      invalid = validate(payload, setInvalidField);
      if (invalid === 0) {
        const fetchCreateComic = await apiCreateNewComic(payload);
        if (fetchCreateComic?.success) {
          toast.success("Thêm truyện thành công", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setPayload({
            title: "",
            coverImage: null,
            genres: [],
            description: "",
          });
          setShowImg(false);
        } else {
          toast.error(fetchCreateComic?.mes, {
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
    } else {
      const fetchUpdate = await apiUpdateComic({ payload, id: id });
      if (fetchUpdate.success) {
        toast.success("Cập nhật thành công", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(fetchUpdate?.mes, {
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
  };
  return (
    <div className="w-[400px] mx-auto my-8">
      <InputField
        label={"Tên truyện"}
        placeholder="Nhập tên truyện"
        payload={payload}
        setPayload={setPayload}
        namekey="title"
        value={payload.title}
        invalidField={invalidField}
        setInvalidField={setInvalidField}
      />

      <div className="mb-5">
        <div className="mb-[10px]">Ảnh bìa</div>
        {showImg ? (
          <label htmlFor="image">
            <img
              src={
                payload.coverImage
                  ? typeof(payload.coverImage) === 'string'
                    ? payload.coverImage
                    : URL.createObjectURL(payload.coverImage)
                  : null
              }
              className="w-[400px] h-[400px] object-cover"
              alt=""
            />
          </label>
        ) : (
          <label
            htmlFor="image"
            className="border-dashed border-[2px] rounded-md w-full flex justify-center items-center text-[40px] h-[400px]"
          >
            +
          </label>
        )}
        <input
          type="file"
          id="image"
          onChange={(event) => handleChangeImage(event)}
          hidden
        />
      </div>
      <div className="mb-5">
        <div className="mb-[10px]">Thể loại</div>
        <div className="grid grid-cols-2 mb-2 px-[15px]">
          {allGenres?.map((item, index) => {
            return (
              <div key={index} className="flex items-center py-1">
                <input
                  type="checkbox"
                  value={item?._id}
                  id={item.name}
                  name={item.name}
                  className="w-4 h-4 before:bg-color-float"
                  onChange={(e) => {
                    handleCheckbox(e.target.value);
                  }}
                  checked={payload.genres.some((el) => el === item?._id)}
                />
                <label htmlFor={item.name}>{item.name}</label>
              </div>
            );
          })}
        </div>
      </div>
      <InputField
        label={"Mô tả truyện"}
        payload={payload}
        setPayload={setPayload}
        namekey="description"
        value={payload.description}
        invalidField={invalidField}
        setInvalidField={setInvalidField}
      />
      <div className="flex gap-3">
        <button
          className="px-4 py-2 basis-1/3 rounded-md mb-4 bg-color-float"
          onClick={() => navigate(-1)}
        >
          Huỷ
        </button>
        <button
          className="px-4 py-2 basis-2/3 rounded-md mb-4 bg-gradient-to-l from-main to-purple-600"
          onClick={() => handleSubmit()}
        >
          {id === "new-comic" ? "Thêm truyện" : "Cập nhật"}
        </button>
      </div>
    </div>
  );
};

export default UpdateComic;
