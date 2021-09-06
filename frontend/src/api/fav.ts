import axios from "axios";
import { IFavoriteImage, IFavoriteImageResponse } from "../interfaces/api";
import { utils } from "utils";

export const fav = {
  async postFavoriteImage(request_data: IFavoriteImage) {
    try {
      const token: string | null = utils.getLocalToken();
      const res = await axios.post<IFavoriteImageResponse>(
        "http://0.0.0.0:8000/fav/images",
        request_data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch {
      console.error("api error");
    }
  },

  async getFavoriteImages() {
    try {
      const token: string | null = utils.getLocalToken();
      const res = await axios.get<IFavoriteImage[]>(
        "http://0.0.0.0:8000/fav/images",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch {
      console.error("api error");
    }
  },
};
