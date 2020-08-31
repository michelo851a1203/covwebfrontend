<template>
  <div class="h-full sm:mx-auto">
    <component
      v-if="currentVerifyStatus.title !== '' && currentVerifyStatus.status !== ''"
      @close="closeVerifyAlert"
      :currentstatus="currentVerifyStatus"
      :is="alertComponent"
    ></component>
    <iframe class="ml-2 mx-auto w-full h-full overflow-hidden" :src="frameSrc" frameborder="0"></iframe>
  </div>
</template>

<script>
import Login from "@/api/Login.js";
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
    const LoginModule = Login();
    const verificationModule = Verification();
    const frameSrc = ref("https://michelo851a1203.github.io/qrcodetool");
    const alertComponent = ref("alert");
    if (config.mobileCheck()) {
      alertComponent.value = "alertmobile";
    }
    if (!LoginModule.regainLoginUser()) {
      router.push({
        name: "signIn",
      });
    }

    const scanRole = LoginModule.userData.role;
    onMounted(() => {
      let frameWidth = window.innerWidth;
      if (window.innerWidth > 640) {
        frameWidth *= 0.9;
      }
      frameSrc.value = `${frameSrc.value}?w=${frameWidth - 15}`;
      window.onmessage = async function (e) {
        if (e.data && typeof e.data === "string" && e.data !== "") {
          verificationModule.verifyCredentialId.value = e.data;
          let oResult = null;
          switch (scanRole) {
            case 1:
              oResult = await verificationModule.userScanQrcode();
              if (!oResult.success) {
                verificationModule.normalVerifyAlert({
                  title: oResult.msg,
                  status: "fail",
                });
                return;
              }
              verificationModule.normalVerifyAlert({
                title: "send success",
                status: "ok",
              });
              break;
            case 2:
              oResult = await verificationModule.sendVerify();
              if (!oResult.success) {
                verificationModule.normalVerifyAlert({
                  title: oResult.msg,
                  status: "fail",
                });
                return;
              }
              router.push("/verifyreport");
              break;
            default:
              break;
          }
        }
      };
    });

    return { ...verificationModule, alertComponent, frameSrc };
  },
};
</script>

<style scoped lang="postcss">
</style>