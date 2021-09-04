import axios from "axios";
import { ILoginRequest, IRegisterRequest, IRegisterResponse, IUser } from "../interfaces/api";

export const auth = {
    async postUserRegister(request_data: IRegisterRequest) {
        try {
            const res = await axios.post<IRegisterResponse>(
                'http://0.0.0.0:8000/register', request_data
            );
            return res.data;
        } catch {
            console.error("api error")
        }
    },

    async postUserLogin(request_data: ILoginRequest) {
        try {
            const res = await axios.post<ILoginRequest>(
                'http://0.0.0.0:8000/token', request_data
            );
            return res.data;
        } catch {
            console.error("api error")
        }
    },

    async getUserMe() {
        try {
            const res = await axios.get<IUser>(
                'http://0.0.0.0:8000/users/me'
            )
            return res.data;
        } catch {
            console.error("api error")
        }
    }
}