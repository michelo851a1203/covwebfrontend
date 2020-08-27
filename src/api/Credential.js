import { ref, computed } from "vue"
import config from "./request/config.js"
import CredentialModule from "./request/Credential.js"
import report from "./global/report.js"
import credentialData from "./global/credentialData.js"

export default function Credential() {
    const currentCredStatus = ref({
        title: "",
        status: "",
    });

    const attr = computed(() => {
        if (credentialData.attributes.length === 0) {
            return [];
        }
        const oData = credentialData.attributes.map((item) => {
            return {
                id: config.uuid(),
                title: item,
            };
        });
        return oData;
    })

    const issueData = ref({})
    const sendToUserEmail = ref("")
    const lock = ref(false)
    const getCredDefinition = async () => {
        if (credentialData.name !== "" && credentialData.attributes.length > 0) {
            console.error("no credentialData.attributes or credentialData.name");
            return false
        }
        const response = await CredentialModule.getCredentialDetail()
        if (!response || !response.success) {
            console.error("getCredentialDetail error");
            return false
        }
        const defData = response.data

        credentialData.name = defData.name
        credentialData.version = defData.version
        credentialData.definitionId = defData.definitionId
        credentialData.schemaId = defData.schemaId
        credentialData.supportsRevocation = defData.supportsRevocation
        credentialData.attributes = defData.attributes
        return true
    }

    const refillRecord = () => {
        Object.keys(issueData.value).forEach(item => {
            issueData.value[item] = ""
        })
    }

    const sendIssue = async () => {
        if (sendToUserEmail.value === "") {
            console.error("sendToUserEmails is empty");
            return {
                success: false,
                msg: "請填寫使用者信箱"
            }
        }
        if (credentialData.definitionId === "") {
            console.error("definitionId is empty");
            return {
                success: false,
                msg: "尚未取得 definitionId"
            }
        }
        if (Object.keys(issueData.value).length === 0) {
            console.error("issueData is empty");
            return {
                success: false,
                msg: "沒有填寫檢測內容"
            }
        }
        if (!config.validateEmail(sendToUserEmail.value)) {
            console.error("sendEmail is error");
            return {
                success: false,
                msg: "錯誤的信箱格式"
            }
        }
        if (!lock.value) {
            console.error("not accept to send");
            return {
                success: false,
                msg: "請勾選<確認以上資料皆無誤>"
            }
        }

        credentialData.attributes.forEach(item => {
            if (!issueData.value[item]) {
                issueData.value[item] = ""
            }
        })

        currentCredStatus.value.title = "Loading..."
        currentCredStatus.value.status = "loading"

        const response = await CredentialModule.sendCredential(sendToUserEmail.value, credentialData.definitionId, issueData.value)
        if (!response || !response.success) {
            console.error("getCredentialDetail error");
            return {
                success: false,
                msg: "請求返回失敗"
            }
        }
        const responseData = response.data

        report.displayName = responseData.displayName
        report.role = responseData.role
        report.updatedAt = responseData.updatedAt
        report.username = responseData.username
        report.wallet = responseData.wallet
        report._id = responseData._id
        report.credential = responseData.credential
        return {
            success: true,
            msg: "請求返回失敗"
        }
    }

    const sendMailApi = async () => {
        const response = await CredentialModule.sendMail(report.credential._id)
        if (!response || !response.success) {
            console.error("sendMail error");
            return { success: false }
        }
        return { success: true }
    }

    const getUserDetail = async () => {
        const response = await CredentialModule.getUserCredential()
        if (!response || !response.success) {
            console.error("getUserDetail error");
            return false
        }
        const detailData = response.data
        report.updatedAt = detailData.updatedAt
        report._id = detailData._id
        report.credential.values = detailData.values
    }

    const closeCredentialAlert = () => {
        currentCredStatus.value.title = ""
        currentCredStatus.value.status = ""
    }

    const normalCredentialAlert = ({ title, status }) => {
        currentCredStatus.value.title = title
        currentCredStatus.value.status = status
        setTimeout(() => {
            currentCredStatus.value.title = ""
            currentCredStatus.value.status = ""
        }, 1500);
    }
    return { currentCredStatus, report, credentialData, attr, issueData, sendToUserEmail, lock, getCredDefinition, sendIssue, refillRecord, sendMailApi, getUserDetail, closeCredentialAlert, normalCredentialAlert }
}