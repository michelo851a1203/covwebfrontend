import { ref, computed } from "vue"
import config from "./request/config.js"
import CredentialModule from "./request/Credential.js"
import report from "./global/report.js"
import credentialData from "./global/credentialData.js"
import navTag from "@/api/global/navTag.js"

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

    const issueData = ref({
        "Test Result": ""
    })
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
        issueData.value["Test Result"] = ""
    }

    const sendIssue = async () => {
        if (sendToUserEmail.value === "") {
            console.error("sendToUserEmails is empty");
            return {
                success: false,
                msg: "User email required"
            }
        }
        if (credentialData.definitionId === "") {
            console.error("definitionId is empty");
            return {
                success: false,
                msg: "Not acquire definitionId"
            }
        }
        if (!issueData.value["Test Result"] || issueData.value["Test Result"] === "") {
            return {
                success: false,
                msg: "Pease choose Test Result"
            }
        }
        if (Object.keys(issueData.value).length === 0) {
            console.error("issueData is empty");
            return {
                success: false,
                msg: "Not fill content"
            }
        }
        if (!config.validateEmail(sendToUserEmail.value)) {
            console.error("sendEmail is error");
            return {
                success: false,
                msg: "Error email format"
            }
        }
        if (!lock.value) {
            console.error("not accept to send");
            return {
                success: false,
                msg: "Please check <Above Information is correct>"
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
            msg: "Request failure"
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
        navTag.value = "genQrcode"
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

    const clearCredentialReport = () => {
        report.displayName = ""
        report.role = ""
        report.updatedAt = ""
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
    }
    return { navTag, currentCredStatus, report, credentialData, attr, issueData, sendToUserEmail, lock, getCredDefinition, sendIssue, refillRecord, sendMailApi, getUserDetail, closeCredentialAlert, normalCredentialAlert, clearCredentialReport }
}