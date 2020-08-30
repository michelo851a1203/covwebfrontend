import { ref, reactive, toRefs } from "vue"
import config from "./request/config.js"
import LoginModules from "./request/Login.js"
import report from "./global/report.js"
import credentialData from "./global/credentialData.js"

export default function Login() {
    const currentStatus = ref({
        title: "",
        status: "",
    });
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

    const regainLoginUser = () => {
        const cluster = localStorage.getItem("covWebItem");
        const token = localStorage.getItem(cluster);
        const userStr = localStorage.getItem("covWebItemUser");
        if (!cluster || !token || !userStr || cluster === "" || token === "" || userStr === "") {
            return false
        }
        const user = config.tryParseJSON(userStr)
        if (!user) {
            return false
        }
        userData.role = user.role
        userData.username = user.username
        userData._id = user._id
        userData.displayName = user.displayName
        userData.createdAt = user.createdAt
        userData.updatedAt = user.updatedAt
        return true
    }

    const login = async () => {
        currentStatus.value.title = "Logging"
        currentStatus.value.status = "loading"
        const response = await LoginModules.login(loginList.user, loginList.password)
        if (!response || !response.success) {
            console.error("login error");
            currentStatus.value.title = "Login failure"
            currentStatus.value.status = "fail"
            return false
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
        localStorage.setItem("covWebItemUser", JSON.stringify(mainUserData))
        return true
    }

    const register = async () => {
        const response = await LoginModules.register(registerList.user, registerList.password, registerList.registerEmail, registerList.registerDisplayName)
        if (!response || !response.success) {
            console.error("register error");
            return false
        }
        refill()
        return true
    }

    // 使用者詳細資訊
    const getUserDetail = async () => {
        const response = await LoginModules.getUserDetail()
        if (!response || !response.success) {
            console.error("register error");
            return response.data
        }
        return response.data
    }

    const clearToken = () => {
        const cluster = localStorage.getItem("covWebItem")
        const token = localStorage.getItem(cluster)
        const mainUserDataStr = localStorage.getItem("covWebItemUser")
        if (token) {
            localStorage.removeItem(cluster)
        }
        if (cluster) {
            localStorage.removeItem("covWebItem")
        }
        if (mainUserDataStr) {
            localStorage.removeItem("covWebItemUser")
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
        // clear Credential
        report.displayName = ""
        report.role = -1
        report.updatedAt = -1
        report.username = ""
        report.wallet = ""
        report._id = ""
        report.credential = {
            createdAt: -1,
            credentialId: "",
            definitionId: "",
            schemaId: "",
            state: "",
            updatedAt: "",
            values: {}
        }
        // clear credentialData
        credentialData.name = ""
        credentialData.version = ""
        credentialData.definitionId = ""
        credentialData.schemaId = ""
        credentialData.supportsRevocation = false
        credentialData.attributes = []
    }

    const refill = () => {
        registerList.registerUser = ""
        registerList.registerPassword = ""
        registerList.registerEmail = ""
        registerList.registerDisplayName = ""
    }

    const closeAlert = () => {
        currentStatus.value.title = ""
        currentStatus.value.status = ""
    }

    const normalAlert = ({ title, status }) => {
        currentStatus.value.title = title
        currentStatus.value.status = status
        setTimeout(() => {
            currentStatus.value.title = ""
            currentStatus.value.status = ""
        }, 1500);
    }

    return { currentStatus, rootUser, userData, ...toRefs(loginList), ...toRefs(registerList), login, regainLoginUser, register, getUserDetail, clearToken, refill, closeAlert, normalAlert }
}