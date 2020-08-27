
import VerificationModules from "./request/Verification.js"
import verifyResult from "./global/verifyResult.js"
import { ref, computed } from "vue"
export default function Verification() {

    const currentVerifyStatus = ref({
        title: "",
        status: "",
    });

    const verifyCredentialId = ref("")
    const sendVerify = async () => {
        if (verifyCredentialId.value === "") {
            return {
                success: false,
                msg: "未拿到驗證的 CredentialId",
            }
        }
        currentVerifyStatus.value.title = "讀取中..."
        currentVerifyStatus.value.status = "loading"
        const response = await VerificationModules.createVerification(verifyCredentialId.value)
        if (!response || !response.success) {
            console.error("createVerification error");
            return {
                success: false,
                msg: "請求返回失敗",
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
            msg: "成功",
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

    return { verifyResult, mainThemeResult, proofAttribute, currentVerifyStatus, verifyCredentialId, sendVerify, closeVerifyAlert, normalVerifyAlert }
}