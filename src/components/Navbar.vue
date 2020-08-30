<template>
  <div class="fixed top-0 bg-gray-300 shadow-2xl w-full h-16">
    <div class="flex items-center h-full">
      <div class="ml-10">COV-19 TEST</div>
      <div
        @click="changeTag('scanQrcode')"
        v-if="getnavRole !== 3 && !isMobileRef"
        :class="{'bg-blue-300':navTag === 'scanQrcode'}"
        class="hidden sm:flex ml-auto mr-4 hover:bg-gray-500 h-full items-center"
      >
        <button
          class="text-black focus:outline-none hover:underline text-lg font-medium py-1 px-2"
        >Scan Qrcode</button>
      </div>
      <div
        v-if="getnavRole !== 3 && !isMobileRef"
        @click="changeTag('genQrcode')"
        :class="{'bg-blue-300':navTag === 'genQrcode'}"
        class="hidden sm:flex mr-4 hover:bg-gray-500 h-full items-center"
      >
        <button
          class="text-black focus:outline-none hover:underline text-lg font-medium py-1 px-2"
        >Generate Qrcode</button>
      </div>
      <div
        v-if="getnavRole === 1 && !isMobileRef"
        class="hidden sm:flex mr-4 hover:bg-blue-300 h-full items-center"
      >
        <button
          class="text-black focus:outline-none hover:underline text-lg font-medium py-1 px-2"
        >Disable Credential</button>
      </div>
      <div :class="{'ml-auto' : getnavRole === 3,'ml-auto sm:ml-0':getnavRole !== 3}" class="mr-10">
        <button
          @click="logout"
          class="text-black hover:underline text-lg font-medium py-1 px-2"
        >LogOut</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import router from "@/router";
import Login from "@/api/Login.js";
import Navbar from "@/api/Navbar.js";
import config from "@/api/request/config.js";
export default {
  name: "Navbar",
  setup() {
    const isMobileRef = ref(config.mobileCheck());
    const loginModule = Login();
    loginModule.regainLoginUser();
    const getnavRole = ref(-1);
    getnavRole.value = loginModule.userData.role;
    const logout = () => {
      router.push({
        name: "signIn",
      });
    };
    return { ...Navbar(), logout, getnavRole, isMobileRef };
  },
};
</script>