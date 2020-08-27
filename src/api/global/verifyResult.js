import { reactive } from "vue"
export default reactive({
    _id: "",
    verificationId: "",
    definitionId: "",
    state: "",
    createdAt: -1,
    updatedAt: -1,
    policy: {
        name: "",
        version: "",
        attributes: [],
    },
    proof:{}
})