import navTag from "@/api/global/navTag.js"
export default function navbar() {
    const changeTag = (reName) => {
        navTag.value = reName
    }

    return { navTag, changeTag }
}