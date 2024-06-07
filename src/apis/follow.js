import axios from "../axios";
export const apiFollow = (payload) =>
  axios({
    method: "POST",
    url: `favorite`,
    data: {
      ...payload,
    },
  });

export const apiGetFollow = (comicID) =>
  axios({
    method: "GET",
    url: `favorite/${comicID}`,
  });

export const apiGetAllFollow = () =>
  axios({
    method: "GET",
    url: `favorite`,
  });

export const apiUnfollow = (payload) =>
  axios({
    method: "DELETE",
    url: `favorite`,
    data: {
      ...payload,
    },
  });
