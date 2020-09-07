
import VerificationModules from "./request/Verification.js"
import verifyResult from "./global/verifyResult.js"
import { ref, computed, onUnmounted } from "vue"
export default function Verification() {

    const tmpInterval = ref(null)
    const currentVerifyStatus = ref({
        title: "",
        status: "",
    });

    const verifyCredentialId = ref("")
    const verifyQrcodeForUser = ref("")
    const sendVerify = async () => {
        if (verifyCredentialId.value === "") {
            return {
                success: false,
                msg: "Not Acquire CredentialId",
            }
        }
        currentVerifyStatus.value.title = "Loading..."
        currentVerifyStatus.value.status = "loading"
        const response = await VerificationModules.createVerification(verifyCredentialId.value)
        if (!response || !response.success) {
            console.error("createVerification error");
            return {
                success: false,
                msg: "Request fail",
            }
        }
        const verData = response.data

        verifyResult._id = verData._id
        verifyResult.verificationId = verData.verificationId
        verifyResult.definitionId = verData.definitionId
        verifyResult.state = verData.state
        verifyResult.createdAt = verData.createdAt
        verifyResult.updatedAt = verData.updatedAt
        verifyResult.policy = verData.policy
        verifyResult.proof = verData.proof

        return {
            success: true,
            msg: "Success",
        }
    }

    const mainThemeResult = computed(() => {
        const keys = Object.keys(verifyResult).filter(item => item !== "policy" && item !== "proof")
        const oResult = {}
        keys.forEach(item => {
            oResult[item] = verifyResult[item]
        })
        return oResult
    })

    const proofAttribute = computed(() => {
        if (!verifyResult["policy"]
            || !verifyResult["policy"].attributes
            || !verifyResult["policy"].attributes.length === 0
            || !verifyResult["policy"].attributes[0]
            || !verifyResult["policy"].attributes[0].policyName
        ) {
            return []
        }
        const mainKey = verifyResult["policy"].attributes[0].policyName
        return verifyResult["proof"][mainKey].attributes
    })

    const closeVerifyAlert = () => {
        currentVerifyStatus.value.title = ""
        currentVerifyStatus.value.status = ""
    }

    const normalVerifyAlert = ({ title, status }) => {
        currentVerifyStatus.value.title = title
        currentVerifyStatus.value.status = status
        setTimeout(() => {
            currentVerifyStatus.value.title = ""
            currentVerifyStatus.value.status = ""
        }, 1500);
    }

    const genQrcodeForUser = async () => {
        const response = await VerificationModules.createVerifyQrcodeForUser()
        if (!response || !response.success) {
            console.error("createVerification error");
            return {
                success: false,
                msg: "Request fail",
            }
        }
        verifyQrcodeForUser.value = response.data.verificationId

        return {
            success: true,
            msg: "Success",
        }
    }

    const keepGetQrcodeInfo = async (verificationQrcodeId) => {
        const response = await VerificationModules.getVerifyQrcodeInfo(verificationQrcodeId)
        if (!response || !response.success) {
            console.error("keepGetQrcodeInfo error");
            return {
                success: false,
                data: "Request fail",
            }
        }

        return {
            success: true,
            data: response.data,
        }
    }

    const userScanQrcode = async () => {
        if (verifyCredentialId.value === "") {
            return {
                success: false,
                msg: "Not Acquire CredentialId",
            }
        }
        currentVerifyStatus.value.title = "Loading..."
        currentVerifyStatus.value.status = "loading"
        console.group(`%c verifyCredentialId.value`, 'color:yellow');
        console.log(verifyCredentialId.value);
        console.groupEnd();
        const response = await VerificationModules.UserVerification(verifyCredentialId.value)
        if (!response || !response.success) {
            console.error("userScanQrcode error");
            return {
                success: false,
                msg: "Request fail",
            }
        }
        return {
            success: true,
        }
    }
    onUnmounted(() => {
        if (tmpInterval.value) {
            clearInterval(tmpInterval.value)
            tmpInterval.value = null
        }
    })

    return { tmpInterval, verifyResult, mainThemeResult, proofAttribute, currentVerifyStatus, verifyCredentialId, verifyQrcodeForUser, sendVerify, closeVerifyAlert, normalVerifyAlert, genQrcodeForUser, keepGetQrcodeInfo, userScanQrcode }
}