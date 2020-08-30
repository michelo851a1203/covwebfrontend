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
            console.group(`%c login`, 'color:yellow');
            console.log(data);
            console.groupEnd();
            return data
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
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
            return { success: false }
        }
    },
    // 使用者詳細資訊
    getUserDetail: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = "/api/v1/user"
            const instance = axios.create({
                baseURL: config.baseURL,
                headers: {
                    Authorization: token
                }
            })
            const { data } = await instance.get(url)
            return data
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },

}