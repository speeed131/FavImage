import axios from "axios";
import { IFavoriteImage, IFavoriteImageResponse } from "../interfaces/api";

export const fav = {
    async postFavoriteImage(request_data: IFavoriteImage) {
        try {
            const res = await axios.post<IFavoriteImageResponse>(
                'http://0.0.0.0:8000/fav/images', request_data
            );
            return res.data;
        } catch {
            console.error("api error")
        }
    },
    
    async getFavoriteImages() {
        try {
            const res = await axios.get<IFavoriteImage[]>(
                'http://0.0.0.0:8000/fav/images'
                )
                return res.data;
        } catch {
            console.error("api error")
        }
    }
}