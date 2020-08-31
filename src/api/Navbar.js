import navTag from "@/api/global/navTag.js"
import { ref, watch } from "vue"
export default function navbar() {
    const showTypeRef = ref("reportList".toLowerCase());
    const changeTag = (reName) => {
        navTag.value = reName
    }

    watch(navTag, () => {
        switch (navTag.value) {
            case "scanQrcode":
                showTypeRef.value = "scanQrcode".toLowerCase()
                break;
            case "genQrcode":
                showTypeRef.value = "reportList".toLowerCase()
                break;
            default:
                break;
        }
    })

    return { showTypeRef, navTag, changeTag }
}