import { ref, computed } from "vue"
import config from "./request/config.js"
import CredentialModule from "./request/Credential.js"
import report from "./global/report.js"
import credentialData from "./global/credentialData.js"

export default function Credential() {
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
            return
        }
        const response = await CredentialModule.getCredentialDetail()
        if (!response || !response.success) {
            console.error("getCredentialDetail error");
            return
        }
        const defData = response.data

        credentialData.name = defData.name
        credentialData.version = defData.version
        credentialData.definitionId = defData.definitionId
        credentialData.schemaId = defData.schemaId
        credentialData.supportsRevocation = defData.supportsRevocation
        credentialData.attributes = defData.attributes
    }

    const refillRecord = () => {
        Object.keys(issueData.value).forEach(item => {
            issueData.value[item] = ""
        })
    }

    const sendIssue = async () => {
        if (sendToUserEmail.value === "") {
            console.error("sendToUserEmails is empty");
            return false
        }
        if (credentialData.definitionId === "") {
            console.error("definitionId is empty");
            return false
        }
        if (Object.keys(issueData.value).length === 0) {
            console.error("issueData is empty");
            return false
        }
        if (!config.validateEmail(sendToUserEmail.value)) {
            console.error("sendEmail is error");
            return false
        }
        if (!lock.value) {
            console.error("not accept to send");
            return false
        }

        credentialData.attributes.forEach(item => {
            if (!issueData.value[item]) {
                issueData.value[item] = ""
            }
        })

        const response = await CredentialModule.sendCredential(sendToUserEmail.value, credentialData.definitionId, issueData.value)
        if (!response || !response.success) {
            console.error("getCredentialDetail error");
            return false
        }
        const responseData = response.data

        report.displayName = responseData.displayName
        report.role = responseData.role
        report.updatedAt = responseData.updatedAt
        report.username = responseData.username
        report.wallet = responseData.wallet
        report._id = responseData._id
        report.credential = responseData.credential
        return true
    }

    const sendMailApi = async () => {
        const response = await CredentialModule.sendMail(report.credential._id)
        if (!response || !response.success) {
            console.error("sendMail error");
            return false
        }
    }

    const getUserDetail = async () => {
        const response = await CredentialModule.getUserCredential()
        if (!response || !response.success) {
            console.error("getUserDetail error");
            return false
        }

        const detailData = response.data
        // report.displayName = responseData.displayName
        // report.role = responseData.role
        report.updatedAt = detailData.updatedAt
        // report.username = responseData.username
        // report.wallet = responseData.wallet
        report._id = detailData._id
        report.credential = detailData.values

    }
    return { report, credentialData, attr, issueData, sendToUserEmail, lock, getCredDefinition, sendIssue, refillRecord, sendMailApi, getUserDetail }
}