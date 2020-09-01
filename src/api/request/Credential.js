import config from "./config.js"
import axios from "axios"

export default {
    // 檢驗中心使用： 取得檢驗中心可以發放的憑證詳細資訊
    getCredentialDetail: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = "/api/v1/credential"
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
    // 檢驗中心使用：建立 憑證 與 Wallet 後進行連線並取得憑證發送至檢測者信箱
    sendCredential: async (email, definitionId, data) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }
        try {
            const url = "/api/v1/credential"
            const instance = axios.create({
                baseURL: config.baseURL,
                headers: {
                    Authorization: token
                }
            })
            const { data: response } = await instance.post(url, {
                email,
                definitionId,
                data
            })
            return response
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 使者使用： 取得憑證詳細資訊
    getUserCredential: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = "/api/v1/wallet/credential"
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
    sendMail: async (_id) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }
        try {
            const url = "/api/v1/email"
            const instance = axios.create({
                baseURL: config.baseURL,
                headers: {
                    Authorization: token
                }
            })
            const { data } = await instance.post(url, {
                credentialId: _id
            })
            return data
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // TODO 使者使用： 變更憑證讀取的狀態，當 lock 是 true 時無法被進行讀取 false 時候將無限制。
    lockCredential: async (lock) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }
        try {
            const url = "/api/v1/wallet/credential/lock"
            const instance = axios.create({
                baseURL: config.baseURL,
                headers: {
                    Authorization: token
                }
            })
            const { data } = await instance.get(url, {
                lock
            })
            console.group(`%c lockCredential`, 'color:yellow');
            console.log(data);
            console.groupEnd();
            return data
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    }
}