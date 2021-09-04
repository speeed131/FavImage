import axios from "axios";
import { IRegisterRequest, IRegisterResponse } from "../interfaces/api";

export const fav = {
    async postUserRegister(request_data: IRegisterRequest) {
        try {
            const res = await axios.post<IRegisterResponse>(
                'http://0.0.0.0:8000/register', request_data
            );
            return res.data;
        } catch {
            console.error("api error")
        }
    }
}