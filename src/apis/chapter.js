import axios from "../axios";
export const apiGetChapters = (id) =>
  axios({
    url: `chapter/${id}`,
    method: "GET",
  });

export const apiGetChapter = (id) =>
  axios({
    url: `chapter/chap/${id}`,
    method: "GET",
  });

export const apiGetChapterWithSlug = (slug) =>
  axios({
    url: `chapter/chapwithslug/${slug}`,
    method: "GET",
  });

export const apiGetAllChapter = () =>
  axios({
    method: "GET",
    url: "chapter",
  });

export const apiCreateNewChapter = ({ payload }) => {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => {
    if (key !== "files") formData.append(key, payload[key]);
  });
  // Phải đẩy req.body lên trước file để nhận trong middleware
  payload.files.forEach((file) => {
    formData.append("files", file);
  });
  console.log(formData);
  return axios({
    method: "POST",
    url: `chapter`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const apiUpdateChapter = ({ payload, id }) => {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => {
    if (key !== "files") formData.append(key, payload[key]);
  });
  // Phải đẩy req.body lên trước file để nhận trong middleware
  payload.files.forEach((file) => {
    formData.append("files", file);
  });
  console.log(formData);
  return axios({
    method: "PUT",
    url: `chapter/${id}`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const apiDeleteChapter = (id) => {};
