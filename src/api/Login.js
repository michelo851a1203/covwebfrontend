import { reactive, toRefs } from "vue"
import config from "./request/config.js"
import LoginModules from "./request/Login.js"

export default function Login() {
    const loginList = reactive({
        user: "",
        password: "",
        storageToken: "",
    })

    const registerList = reactive({
        registerUser: "",
        registerPassword: "",
        registerEmail: "",
        registerDisplayName: ""
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

    const register = async () => {
        const response = await LoginModules.register(registerList.user, registerList.password, registerList.registerEmail, registerList.registerDisplayName)
        if (response.success !== true) {
            console.error("register error");
            return false
        }
        refill()
        return true
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

    const refill = () => {
        registerList.registerUser = ""
        registerList.registerPassword = ""
        registerList.registerEmail = ""
        registerList.registerDisplayName = ""
    }

    return { ...toRefs(loginList), ...toRefs(registerList), login, clearToken, refill, register }
}