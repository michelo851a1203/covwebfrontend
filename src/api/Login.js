import { reactive, toRefs } from "vue"
import config from "./request/config.js"
import LoginModules from "./request/Login.js"

export default function Login() {
    const loginList = reactive({
        user: "",
        password: "",
    })

    const registerList = reactive({
        registerUser: "",
        registerPassword: "",
        registerEmail: "",
        registerDisplayName: ""
    })

    const rootUser = reactive({
        username: "",
        accessToken: "",
        expiredAt: -1,
    })
    const userData = reactive({
        role: -1,
        username: "",
        _id: "",
        displayName: "",
        createdAt: -1,
        updatedAt: -1
    })

    const login = async () => {
        const response = await LoginModules.login(loginList.user, loginList.password)
        if (response.success !== true) {
            console.error("login error");
            return
        }
        const mainData = response.data
        const token = mainData.accessToken
        const cluster = config.uuid()
        localStorage.setItem("covWebItem", cluster)
        localStorage.setItem(cluster, token)

        rootUser.username = mainData.username
        rootUser.accessToken = token
        rootUser.expiredAt = mainData.expiredAt

        const mainUserData = mainData.user

        userData.role = mainUserData.role
        userData.username = mainUserData.username
        userData._id = mainUserData._id
        userData.displayName = mainUserData.displayName
        userData.createdAt = mainUserData.createdAt
        userData.updatedAt = mainUserData.updatedAt
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
        rootUser.username = ""
        rootUser.accessToken = ""
        rootUser.expiredAt = -1
        rootUser.role = -1
        rootUser.username = ""
        rootUser._id = ""
        rootUser.displayName = ""
        rootUser.createdAt = -1
        rootUser.updatedAt = -1
    }

    const refill = () => {
        registerList.registerUser = ""
        registerList.registerPassword = ""
        registerList.registerEmail = ""
        registerList.registerDisplayName = ""
    }

    return { rootUser, userData, ...toRefs(loginList), ...toRefs(registerList), login, clearToken, refill, register }
}