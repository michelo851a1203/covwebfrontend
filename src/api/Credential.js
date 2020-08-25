import { ref, reactive, toRefs } from "vue"
// import config from "./request/config.js"
import CredentialModule from "./request/Credential.js"

export default function Credential() {
    const credDefinition = reactive({
        name: "",
        version: "",
        definitionId: "",
        schemaId: "",
        supportsRevocation: false,
        attributes: [],
    })
    const issueData = ref({})
    const sendToUserEmail = ref("")

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
        credDefinition.attributes.value = defData.attributes
        console.log("hello");
    }

    const refillRecord = () => {
        Object.keys(issueData.value).forEach(item => {
            issueData.value[item] = ""
        })
    }

    const sendIssue = async () => {
        if (sendToUserEmail.value === "") {
            console.error("sendToUserEmails is empty");
            return
        }
        if (credDefinition.definitionId === "") {
            console.error("definitionId is empty");
            return
        }
        if (Object.keys(issueData.value).length === 0) {
            console.error("issueData is empty");
            return
        }

        credDefinition.attributes.forEach(item => {
            if (!issueData.value[item]) {
                issueData.value[item] = ""
            }
        })

        const response = await CredentialModule.sendCredential(sendToUserEmail.value, credDefinition.definitionId, issueData.value)
        if (response.success !== true) {
            console.error("getCredentialDetail error");
            return
        }
        response.data
    }

    return { ...toRefs(credDefinition), issueData, sendToUserEmail, getCredDefinition, sendIssue, refillRecord }

}