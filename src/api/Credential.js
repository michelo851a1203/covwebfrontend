import { ref, reactive, computed, } from "vue"
import config from "./request/config.js"
import CredentialModule from "./request/Credential.js"
import reportData from "./global/global.js"

export default function Credential() {
    const credDefinition = reactive({
        name: "",
        version: "",
        definitionId: "",
        schemaId: "",
        supportsRevocation: false,
        attributes: [],
        attr: computed(() => {
            if (credDefinition.attributes.length === 0) {
                return [];
            }
            const oData = credDefinition.attributes.map((item) => {
                return {
                    id: config.uuid(),
                    title: item,
                };
            });
            return oData;
        })
    })

    const issueData = ref({})
    const sendToUserEmail = ref("")
    const lock = ref(false)
    const getCredDefinition = async () => {
        const response = await CredentialModule.getCredentialDetail()
        if (response.success !== true) {
            console.error("getCredentialDetail error");
            return
        }
        const defData = response.data

        credDefinition.name = defData.name
        credDefinition.version = defData.version
        credDefinition.definitionId = defData.definitionId
        credDefinition.schemaId = defData.schemaId
        credDefinition.supportsRevocation = defData.supportsRevocation
        credDefinition.attributes = defData.attributes
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
        if (credDefinition.definitionId === "") {
            console.error("definitionId is empty");
            return false
        }
        if (Object.keys(issueData.value).length === 0) {
            console.error("issueData is empty");
            return false
        }
        if (!config.validateEmail(sendToUserEmail)) {
            console.error("sendEmail is error");
            return false
        }
        if (!lock.value) {
            console.error("not accept to send");
            return false
        }

        credDefinition.attributes.forEach(item => {
            if (!issueData.value[item]) {
                issueData.value[item] = ""
            }
        })

        const response = await CredentialModule.sendCredential(sendToUserEmail.value, credDefinition.definitionId, issueData.value)
        if (response.success !== true) {
            console.error("getCredentialDetail error");
            return false
        }
        const responseData = response.data

        reportData.displayName = responseData.displayName
        reportData.role = responseData.role
        reportData.updatedAt = responseData.updatedAt
        reportData.username = responseData.username
        reportData.wallet = responseData.wallet
        reportData._id = responseData._id
        reportData.credential = responseData.credential
        return true
    }

    const sendMailApi = () => {
        console.log("OKOK wait for send Mail");
    }
    return { reportData, credDefinition, issueData, sendToUserEmail, lock, getCredDefinition, sendIssue, refillRecord, sendMailApi }
}