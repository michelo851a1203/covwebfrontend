<template>
  <div class="h-full sm:mx-auto">
    <component
      v-if="currentVerifyStatus.title !== '' && currentVerifyStatus.status !== ''"
      @close="closeVerifyAlert"
      :currentstatus="currentVerifyStatus"
      :is="alertComponent"
    ></component>
    <video class="w-full h-full" ref="video"></video>
  </div>
</template>

<script>
import Login from "@/api/Login.js";
import Verification from "@/api/Verification.js";
import alert from "@/components/Alert.vue";
import alertmobile from "@/components/Alertmobile.vue";
import router from "@/router";
import config from "@/api/request/config.js";
import navTag from "@/api/global/navTag.js";
import { ref, watch, onUnmounted } from "vue";
import { BrowserQRCodeReader } from "@zxing/library";

export default {
  name: "scanQrcode",
  components: {
    alert,
    alertmobile,
  },
  setup() {
    const LoginModule = Login();
    const verificationModule = Verification();
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
    const codeReader = new BrowserQRCodeReader();
    const cameraRef = ref("");
    const video = ref(null);
    navTag.value = "scanQrcode";
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length === 0) {
          return;
        }
        cameraRef.value = videoInputDevices[0].deviceId;
      })
      .catch((err) => {
        console.error(err);
      });

    watch(cameraRef, (deviceId) => {
      if (deviceId === "") {
        return;
      }
      codeReader
        .decodeOnceFromVideoDevice(deviceId, video.value)
        .then((qrcodeObject) => {
          if (!qrcodeObject || qrcodeObject.text === "") {
            return new Promise((res, err) => {
              err("qrcodeObject and qrcodeObject.text is empty");
            });
          }
          verificationModule.verifyCredentialId.value = qrcodeObject.text;
          if (scanRole === 1) {
            return verificationModule.userScanQrcode();
          }
          if (scanRole === 2) {
            return verificationModule.sendVerify();
          }
          return new Promise((res, err) => {
            err("no role error");
          });
        })
        .then((oResult) => {
          if (!oResult.success) {
            verificationModule.normalVerifyAlert({
              title: oResult.msg,
              status: "fail",
            });
            return;
          }
          switch (scanRole) {
            case 1:
              verificationModule.normalVerifyAlert({
                title: "send success",
                status: "ok",
              });
              break;
            case 2:
              router.push("/verifyreport");
              break;

            default:
              break;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
    onUnmounted(() => {
      codeReader.reset();
    });
    return { ...verificationModule, alertComponent, video };
  },
};
</script>