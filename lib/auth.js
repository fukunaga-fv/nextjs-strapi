import axios from "axios";
import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"; //デプロイ用

//新しいユーザの登録
export const registerUser = async (username, email, password) => {
  await axios
    .post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password,
    })
    .then((res) => {
      Cookie.set("token", res.data.jwt, { expires: 7 });
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = async (identifier, password) => {
  await axios
    .post(`${API_URL}/auth/local/`, {
      identifier,
      password,
    })
    .then((res) => {
      Cookie.set("token", res.data.jwt, { expires: 7 });
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
    });
};
