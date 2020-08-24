import config from "./config.js"
import axios from "axios"

export default {
    login: async (username, password) => {
        try {
            const url = "/api/v1/auth/login"
            const instance = axios.create({
                baseURL: config.baseURL,
            })
            const { data } = await instance.post(url, {
                username,
                password
            })
            return data
        } catch (error) {
            console.error(`error : ${error}`);
        }
    },
    register: async (username, password, email, displayName) => {
        try {
            const url = "/api/v1/auth/signup"
            const instance = axios.create({
                baseURL: config.baseURL,
            })
            const { data } = await instance.post(url, {
                username,
                password,
                email,
                displayName
            })
            return data
        } catch (error) {
            console.error(`error : ${error}`);
        }
    }
}