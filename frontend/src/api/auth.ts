import axios from "axios";

export const api = {
    async getImagesAtRandom() {
        try {
            const res = await axios.get<any>('http://0.0.0.0:8000/images');
            console.log(res.data);
            return res.data;
        } catch {
            console.log("api error")
        }
    }
}