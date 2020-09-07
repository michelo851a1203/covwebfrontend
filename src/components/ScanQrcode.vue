<template>
  <div class="h-full sm:mx-auto">
    <component
      v-if="currentVerifyStatus.title !== '' && currentVerifyStatus.status !== ''"
      @close="closeVerifyAlert"
      :currentstatus="currentVerifyStatus"
      :is="alertComponent"
    ></component>
    <div class="w-4/5 mx-auto mb-10 sm:mb-1">
      <button
        @click="cameraClick"
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      >scanQrcode(or file)</button>
    </div>
    <video class="w-full h-full" ref="video"></video>
    <input
      ref="inputRef"
      class="hidden"
      type="file"
      @change="getCameraChange"
      accept="image/*;capture=camera"
    />
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

    const inputRef = ref(null);
    const scanRole = LoginModule.userData.role;
    const codeReader = new BrowserQRCodeReader();
    const cameraRef = ref("");
    const video = ref(null);
    navTag.value = "scanQrcode";

    const filereaderToVideo = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (event) => {
          const buffer = event.target.result;
          const videoBlob = new Blob([new Uint8Array(buffer)], {
            type: "video/mp4",
          });
          const url = window.URL.createObjectURL(videoBlob);
          video.value.src = url;
          resolve(video.value);
        };
        reader.onerror = () => {
          reject(`fileReader error`);
        };
      });
    };

    const getCameraChange = async (event) => {
      const mainFileList = event.target.files;
      if (mainFileList.length === 0) {
        return;
      }
      filereaderToVideo(mainFileList[0])
        .then((video) => {
          return codeReader.decodeFromVideo(video);
        })
        .then((qrcodeObject) => {
          if (!qrcodeObject || qrcodeObject.text === "") {
            return new Promise((resolve, reject) => {
              reject("qrcodeObject and qrcodeObject.text is empty");
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
          console.log(err);
        });
    };

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
    const cameraClick = () => {
      inputRef.value.click();
    };

    onUnmounted(() => {
      codeReader.reset();
    });
    return {
      ...verificationModule,
      inputRef,
      cameraClick,
      getCameraChange,
      alertComponent,
      video,
    };
  },
};
</script>