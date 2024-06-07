import axios from "../axios";

export const apiGetAllComic = () =>
  axios({
    url: "comic",
    method: "GET",
  });

export const apiGetComicFilter = (filter) =>
  axios({
    url: "comic",
    method: "GET",
    params: filter,
  });

export const apiGetComic = (id) =>
  axios({
    url: `comic/${id}`,
    method: "GET",
  });

export const apiGetComicWithTitle = (title) =>
  axios({
    url: `comic/comicwithtitle`,
    method: "POST",
    data: {
      title,
    },
  });

export const apiCreateNewComic = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if(key=== 'genre') formData.append(key, JSON.stringify(data[key]));
    formData.append(key, data[key]);
  });
  return axios({
    method: "POST",
    url: "comic",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const apiUpdateComic = ({payload, id}) => {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => {
    if(key=== 'genre') formData.append(key, JSON.stringify(payload[key]));
    formData.append(key, payload[key]);
  });
  return axios({
    method: "PUT",
    url: `comic/${id}`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const apiDeleteComic = (id) => axios({
  method: "DELETE",
  url: `comic/${id}`,
})