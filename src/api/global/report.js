import { reactive } from "vue"
export default reactive({
    displayName: "", // this is email
    role: -1,
    updatedAt: -1,
    username: "",
    wallet: "",
    _id: "",
    credential: {
        createdAt: -1,
        credentialId: "",
        definitionId: "",
        schemaId: "",
        state: "",
        updatedAt: "",
        values: {}
    }
})