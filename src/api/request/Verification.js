import config from "./config.js"
import axios from "axios"

export default {
    // TODO :驗證者使用： 取得驗證列表
    getVerificationList: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = "/api/v1/verification"
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
        }
    },

}