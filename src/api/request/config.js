export default {
    baseURL: "https://check.snowbridge.tw",
    uuid: () => {
        return Math.random().toString(16).slice(2)
    },
    tryParseJSON: (jsonString) => {
        try {
            const o = JSON.parse(jsonString);
            if (o && typeof o === "object") {
                return o;
            }
        }
        catch (e) { 
            console.error(e);
        }
        return false;
    }
}