import axios from "../axios";

export const apiLogin = ({ email, password }) =>
  axios({
    url: "user/login",
    method: "POST",
    data: {
      email: email,
      password: password,
    },
  });

export const apiRegister = (payload) =>
  axios({
    url: "user/register",
    method: "POST",
    data: payload,
  });
export const apiForgotPassword = ({ email }) =>
  axios({
    url: "user/forgotpassword",
    method: "POST",
    data: {
      email: email,
    },
  });
export const apiGetCurrent = () =>
  axios({
    url: "user/current",
    method: "GET",
  });

export const apiResetPassword = ({ password, tokenPassword }) =>
  axios({
    method: "PUT",
    url: `user/reset-password/${tokenPassword}`,
    data: {
      password: password,
    },
  });
export const apiGetAllUser = () =>
  axios({
    method: "GET",
    url: "user",
  });
export const apiGetUser = (id) =>
  axios({
    method: "GET",
    url: `user/${id}`,
  });

export const apiUpdateUser = ({ payload, id }) =>
  axios({
    method: "PUT",
    url: `user/${id}`,
    data: {
      ...payload,
    },
  });

export const apiDeleteUser = (id) =>
  axios({
    method: "DELETE",
    url: `user/delete/${id}`,
  });
export const apiChangePassword = ({payload}) => {
  return axios({
    method: "PUT",
    url: 'user/change-password',
    data: {
      ...payload
    }
  })
}
export const apiDeposit = ({payload}) => axios({
  method: "PUT",
  url: 'user/deposit',
  data: {
    ...payload
  }
})