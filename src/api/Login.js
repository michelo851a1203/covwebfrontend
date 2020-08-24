import { reactive, toRefs } from "vue"
import config from "./request/config.js"
import LoginModules from "./request/Login.js"

export default function Login() {
    const loginList = reactive({
        user: "",
        password: "",
        storageToken: "",
    })
    const login = async () => {
        const response = await LoginModules.login(loginList.user, loginList.password)
        if (response.success !== true) {
            console.error("login error");
            return
        }
        const token = response.data.accessToken
        const cluster = config.uuid()
        localStorage.setItem("covWebItem", cluster)
        localStorage.setItem(cluster, token)
        loginList.storageToken = token
    }
    const clearToken = () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        if (token) {
            localStorage.removeItem(cluster)
        }
        if (cluster) {
            localStorage.removeItem("covWebItem")
        }
        if (loginList.storageToken !== "") {
            loginList.storageToken = ""
        }
    }
    return { ...toRefs(loginList), login, clearToken }
}