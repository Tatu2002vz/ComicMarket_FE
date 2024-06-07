import { useEffect, useState } from "react";
import {
  apiCreateNewChapter,
  apiGetChapter,
  apiGetChapterWithSlug,
  apiGetComicWithTitle,
  apiUpdateChapter,
} from "../../apis";
import { useParams } from "react-router-dom";
import icons from "../../utils/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InputField } from "../../components";
import validate from "../../utils/validate";
const { IoClose } = icons;
const UpdateChapter = () => {
  const [payload, setPayload] = useState({
    chapNumber: 0,
    comic: "",
    price: 0,
    files: [],
  });
  const [comic, setComic] = useState(null);
  const [inputArr, setInputArr] = useState([{ image: null }]); // array Image
  const [invalidField, setInvalidField] = useState([]);

  const navigate = useNavigate();
  const { slug, id } = useParams();
  const fetchComic = async () => {
    const response = await apiGetComicWithTitle(slug);
    if (response.success) {
      setComic(response?.mes[0]);
    }
    const chapters = await apiGetChapterWithSlug(slug);
    if (chapters.success) {
      setPayload((prev) => ({
        ...prev,
        chapNumber:
          chapters?.mes[0]?.chapNumber !== undefined &&
          chapters?.mes[0]?.chapNumber !== null
            ? +chapters?.mes[0]?.chapNumber + 1
            : 0,
      }));
    }

    if (id !== "new-chapter") {
      const chapter = await apiGetChapter(id);
      setPayload((prev) => ({ ...prev, chapNumber: chapter.mes.chapNumber }));
      setInputArr((prev) => {
        const updatedItem = [...prev];
        const newItem = chapter?.mes?.images?.map((item) => {
          return { image: item };
        });
        console.log(newItem);
        return [...newItem, ...updatedItem];
      });

      if (!chapter?.success) {
        toast.error(chapter.mes, {
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
  const handleChangeImage = (event) => {
    let index = event.target.dataset.index;
    const image = event.target.files[0];
    setInputArr((prev) => {
      const updatedItems = [...prev];
      if (updatedItems[index]?.image === null) {
        updatedItems.push({ image: null });
      }
      updatedItems[index] = { image: image };

      return updatedItems;
    });
  };
  const handleRemoveImage = (event) => {
    let index = event.target.dataset.index;
    setInputArr((prev) => {
      const removeItems = [...prev];
      removeItems.splice(index, 1);
      return removeItems;
    });
  };
  const handleSubmit = async () => {
    console.log(inputArr);
    const invalid = validate({ price: payload.price }, setInvalidField);
    if (invalid === 0) {
      if (id === "new-chapter") {
        const response = await apiCreateNewChapter({ payload });
        if (response?.success) {
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
      } else {
        const response = await apiUpdateChapter({ payload, id });
        if (response?.success) {
          toast.success("Sửa truyện thành công", {
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
    }
  };
  useEffect(() => {
    const listImages = inputArr.filter((item) => {
      return item.image !== null;
    });
    const images = listImages?.map((item) => item.image);
    setPayload((prev) => ({
      ...prev,
      comic: comic?._id,
      files: images,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputArr]);
  useEffect(() => {
    fetchComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-[400px] mx-auto my-8">
      <div className="mb-5">
        <div className="mb-[10px]">Tên truyện</div>
        <div className="relative mb-2">
          <p className="h-[44px] leading-[44px] w-full px-[15px] rounded-md bg-inputBg">
            {comic?.title}
          </p>
        </div>
      </div>
      <div className="mb-5">
        <div className="mb-[10px]">Chater</div>
        <div className="relative mb-2">
          <p className="h-[44px] leading-[44px] w-full px-[15px] rounded-md bg-inputBg">
            {payload.chapNumber}
          </p>
        </div>
      </div>

      <InputField
        label={"Giá"}
        payload={payload}
        setPayload={setPayload}
        namekey="price"
        value={payload.price}
        invalidField={invalidField}
        setInvalidField={setInvalidField}
      />

      <div className="mb-5">
        <div className="mb-[10px]">Thêm các ảnh</div>
        {inputArr?.map((item, index) => {
          return (
            <div key={index} className="my-5">
              {item.image !== null && item.image !== undefined ? (
                <div className="relative">
                  <label htmlFor={`image-${index}`}>
                    <img
                      src={
                        typeof item.image === "object"
                          ? URL.createObjectURL(item.image)
                          : item.image.startsWith("\\")
                          ? `${process.env.REACT_APP_API_IMAGE}${item.image}`
                          : item.image
                      }
                      className="w-[400px] h-[400px] object-cover"
                      alt=""
                    />
                    <p
                      className="absolute top-0 right-0 z-10 text-white translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      title="Xoá ảnh"
                      onClick={(event) => {
                        handleRemoveImage(event);
                      }}
                    >
                      <IoClose className="bg-main rounded-full" size={30} />
                    </p>
                  </label>
                </div>
              ) : (
                <label
                  htmlFor={`image-${index}`}
                  className="border-dashed border-[2px] rounded-md w-full flex justify-center items-center text-[40px] h-[400px] cursor-pointer"
                >
                  +
                </label>
              )}

              <input
                type="file"
                id={`image-${index}`}
                data-index={index}
                onChange={(event) => {
                  handleChangeImage(event);
                }}
                hidden
              />
            </div>
          );
        })}
      </div>
      <div className="mb-5 flex gap-3">
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
          {id === "new-chapter" ? "Thêm chapter" : "Cập nhật"}
        </button>
      </div>
    </div>
  );
};

export default UpdateChapter;
