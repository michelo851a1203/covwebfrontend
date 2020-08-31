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
        @click="triggerEnableCredential"
        :class="{ 'ml-auto sm:ml-0': getnavRole === 2 }"
        v-if="getnavRole === 1"
        class="flex mr-4 hover:sm:bg-blue-300 h-full items-center"
      >
        <button
          class="hidden sm:inline text-black focus:outline-none hover:underline text-lg font-medium py-1 px-2"
        >
          <label for>{{ credStatusName }}</label>
        </button>
        <label class="switch inline-block sm:hidden">
          <input
            type="checkbox"
            true-value="Disable Credential"
            false-value="Enable Credential"
            v-model="credStatusName"
          />
          <span class="slider round"></span>
        </label>
      </div>
      <div :class="{'ml-auto' : getnavRole === 3,'ml-auto sm:ml-0':getnavRole === 2}" class="mr-10">
        <button @click="logout" class="text-black hover:underline text-lg font-medium py-1 px-2">
          <label class="hidden sm:inline">LogOut</label>
          <svg class="block sm:hidden" width="20" height="20" viewBox="0 0 20 20">
            <path d="M3 3h8V1H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8v-2H3z" />
            <path d="M19 10l-6-5v4H5v2h8v4l6-5z" />
          </svg>
        </button>
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

<style scoped lang="postcss">
.switch {
  position: relative;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>