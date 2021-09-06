import axios from "axios";
import { IImage } from "../interfaces/api";

export const image = {
  async getImagesAtRandom() {
    try {
      const res = await axios.get<IImage[]>("http://0.0.0.0:8000/images");
      return res.data;
    } catch {
      console.error("api error");
    }
  },
};
