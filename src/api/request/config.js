export default {
    baseURL: "https://check.snowbridge.tw",
    uuid: () => {
        return Math.random().toString(16).slice(2)
    }
}