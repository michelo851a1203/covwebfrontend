import navTag from "@/api/global/navTag.js"
import { ref, watch } from "vue"
export default function navbar(initialValue) {
    const showTypeRef = ref(initialValue);
    const credStatusName = ref("Disable Credential")
    const list = ref([
        {
            id: 1,
            active: showTypeRef.value === "scanQrcode".toLowerCase(),
            type: "scan",
            role: [1, 2],
        },
        {
            id: 2,
            active: showTypeRef.value === "reportList".toLowerCase(),
            type: "qrcode",
            role: [1, 2],
        },
    ]);
    const changeTag = (reName) => {
        navTag.value = reName
    }
    const clickBelow = (id) => {
        const listIndex = list.value.findIndex((item) => item.id === id);
        if (listIndex === -1) {
            return;
        }
        list.value[listIndex].active = true;
        list.value.forEach((item) => {
            if (item.id !== id) {
                item.active = false;
            }
        });
        switch (list.value[listIndex].type) {
            case "scan":
                navTag.value = "scanQrcode"
                break;
            case "qrcode":
                navTag.value = "genQrcode"
                break;
            default:
                break;
        }
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

    const triggerEnableCredential = () => {
        if (window.innerWidth <= 640) {
            return
        }
        const statusA = "Disable Credential"
        const statusB = "Enable Credential"
        credStatusName.value = credStatusName.value === statusA ? statusB : statusA
    }

    return { list, showTypeRef, navTag, credStatusName, changeTag, clickBelow, triggerEnableCredential }
}