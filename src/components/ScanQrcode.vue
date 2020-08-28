<template>
  <div>
    <component
      v-if="currentVerifyStatus.title !== '' && currentVerifyStatus.status !== ''"
      @close="closeVerifyAlert"
      :currentstatus="currentVerifyStatus"
      :is="alertComponent"
    ></component>
    <iframe
      class="mx-auto overflow-hidden"
      ref="mainFrame"
      src="https://michelo851a1203.github.io/qrcodetool/"
      frameborder="0"
    ></iframe>
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
    const mainFrame = ref(null);
    const alertComponent = ref("alert");
    if (config.mobileCheck()) {
      alertComponent.value = "alertmobile";
    }
    onMounted(() => {
      const frameSrc = `https://michelo851a1203.github.io/qrcodetool?w=${
        window.innerWidth - 20
      }`;
      mainFrame.value.src = frameSrc;
      window.onmessage = async function (e) {
        if (e.data && typeof(e.data) === "string" && e.data !== "") {
          verificationModule.verifyCredentialId.value = e.data;
          const oResult = await verificationModule.sendVerify();
          if (!oResult.success) {
            verificationModule.normalVerifyAlert({
              title: oResult.msg,
              status: "fail",
            });
            return;
          }
          router.push("/verifyreport");
        }
      };
    });

    return { ...verificationModule, alertComponent, mainFrame };
  },
};
</script>

<style scoped lang="postcss">
</style>