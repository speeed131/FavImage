import axios from "axios";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  IUser,
} from "../interfaces/api";
import { utils } from "utils";

export const auth = {
  async postUserRegister(request_data: IRegisterRequest) {
    try {
      const res = await axios.post<IRegisterResponse>(
        "http://0.0.0.0:8000/register",
        request_data
      );
      utils.saveLocalToken(res.data.access_token);
      return res.data;
    } catch {
      console.error("api error");
    }
  },

  async postUserLogin(request_data: ILoginRequest) {
    try {
      const res = await axios.post<ILoginResponse>(
        "http://0.0.0.0:8000/token",
        request_data
      );
      utils.saveLocalToken(res.data.access_token);
      return res.data;
    } catch {
      console.error("api error");
    }
  },

  async getUserMe() {
    try {
      const token: string | null = utils.getLocalToken();
      const res = await axios.get<IUser>("http://0.0.0.0:8000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch {
      console.error("api error");
    }
  },
};
