import axios from "axios";
import { IImage } from "../interfaces/api";
import { utils } from "utils";

export const image = {
  async getImagesAtRandom() {
    try {
      const token: string | null = utils.getLocalToken();
      const res = await axios.get<IImage[]>("http://0.0.0.0:8000/images", {
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
