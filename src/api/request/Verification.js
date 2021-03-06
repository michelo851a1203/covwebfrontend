import config from "./config.js"
import axios from "axios"

export default {
    // (postpone) 驗證者使用： 取得驗證列表
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
            return { success: false }
        }
    },
    // 驗證者使用： 掃描 Qrcode 取得憑證 id， 進行驗證並返回驗證資訊
    createVerification: async (credentialId) => {
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
            const { data } = await instance.post(url, {
                credentialId
            })
            return data
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // TODO 驗證者使用： 取得驗證 qrcode 目前的狀態資訊
    // this method will get current info and keep request after genQrcode (setInterval)
    getVerifyQrcodeInfo: async (verificationQrcodeId) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = `/api/v1/verification/qrcode?verificationQrcodeId=${verificationQrcodeId}`
            const instance = axios.create({
                baseURL: config.baseURL,
                headers: {
                    Authorization: token
                }
            })
            const { data } = await instance.get(url)
            console.group(`%c getVerifyQrcodeInfo`, 'color:yellow');
            console.log(data);
            console.groupEnd();
            return data
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // TODO 驗證者使用： 產生驗證用 Qrcode 資訊，給使用者做掃描使用。
    createVerifyQrcodeForUser: async () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = "/api/v1/verification/qrcode"
            const instance = axios.create({
                baseURL: config.baseURL,
                headers: {
                    Authorization: token
                }
            })
            const { data } = await instance.post(url)
            console.group(`%c createVerifyQrcodeForUser`, 'color:yellow');
            console.log(data);
            console.groupEnd();
            return data
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // TODO:使者使用： 掃描 Qrcode 取得驗證 id， 發送驗證驗證資訊
    UserVerification: async (verificationId) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = "/api/v1/wallet/verification"
            const instance = axios.create({
                baseURL: config.baseURL,
                headers: {
                    Authorization: token
                }
            })
            const { data } = await instance.post(url, {
                verificationId
            })
            console.group(`%c UserVerification`, 'color:yellow');
            console.log(data);
            console.groupEnd();
            return data
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    },
    // 取得列印的驗證資料 (print) no need to use
    PrintVerification: async (verificationId) => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (!cluster || !token || cluster === "" || token === "") {
            console.error("no Authorization");
            return
        }

        try {
            const url = "/api/v1/print/verification"
            const instance = axios.create({
                baseURL: config.baseURL,
                headers: {
                    Authorization: token
                }
            })
            const { data } = await instance.get(url, {
                verificationId
            })
            return data
        } catch (error) {
            console.error(`error : ${error}`);
            return { success: false }
        }
    }
}