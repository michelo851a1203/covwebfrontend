<template>
  <div>
    <component
      v-if="currentVerifyStatus.title !== '' && currentVerifyStatus.status !== ''"
      @close="closeVerifyAlert"
      :currentstatus="currentVerifyStatus"
      :is="alertComponent"
    ></component>
    <iframe src="https://michelo851a1203.github.io/qrcodetool/" frameborder="0"></iframe>
  </div>
</template>

<script>
import Verification from "@/api/Verification.js";
import router from "@/router";
import alert from "@/components/Alert.vue";
import alertmobile from "@/components/Alertmobile.vue";
import config from "@/api/request/config.js";
import { onMounted, ref } from "vue";
export default {
  name: "scanQrcode",
  components: {
    alert,
    alertmobile,
  },
  setup() {
    const verificationModule = Verification();
    const alertComponent = ref("alert");
    if (config.mobileCheck()) {
      alertComponent.value = "alertmobile";
    }
    onMounted(() => {
      window.onmessage = async function (e) {
        if (e.Data !== "") {
          const oResult = await verificationModule.sendVerify();
          if (!oResult.success) {
            verificationModule.normalVerifyAlert({
              title: oResult.msg,
              status: "fail",
            });
            return;
          }
          router.push("/report");
        }
      };
    });

    return { ...verificationModule, alertComponent };
    // const scanner = ref(null);
    // const scanning = ref(false);
    // const video = document.createElement("video");

    // qrcodePack.callback = (res) => {
    //   if (res) {
    //     scanning.value = false;
    //     console.log(res);
    //     // video.srcObject.getTracks().forEach((track) => {
    //     //   track.stop();
    //     // });
    //   }
    // };

    // const tick = () => {
    //   scanner.value.width = video.videoWidth;
    //   scanner.value.height = video.videoHeight;
    //   const ctx = scanner.value.getContext("2d");
    //   ctx.drawImage(video, 0, 0, scanner.value.width, scanner.value.height);
    //   scanning.value && requestAnimationFrame(tick);
    // };

    // const scan = () => {
    //   try {
    //     qrcodePack.decode();
    //   } catch (error) {
    //     console.error(error);
    //     setTimeout(scan, 300);
    //   }
    // };

    // onMounted(async () => {
    //   const stream = await navigator.mediaDevices.getUserMedia({
    //     video: { facingMode: "environment" },
    //   });
    //   scanning.value = true;
    //   video.setAttribute("playsinline", true);
    //   video.srcObjec = stream;
    //   video.play();
    //   // tick();
    //   // scan();
    // });
    // tick();
    // scan();

    // return { scanner };
  },
};
</script>

<style scoped lang="postcss">
</style>