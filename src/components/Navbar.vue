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
        :class="{ 'ml-auto sm:ml-0': getnavRole === 1 }"
        v-if="getnavRole === 1"
        class="flex mr-4 hover:sm:bg-blue-300 h-full items-center"
      >
        <button
          class="hidden sm:inline text-black focus:outline-none hover:underline text-lg font-medium py-1 px-2"
        >
          <label for>{{ credStatusName }}</label>
        </button>
        <svg
          v-if="credStatusName === 'Disable Credential'"
          class="w-6 sm:hidden"
          x="0px"
          y="0px"
          viewBox="0 0 1000 1000"
        >
          <g>
            <path
              d="M321.8,455.5h356.4V321.8c0-49.2-17.4-91.2-52.2-126c-34.8-34.8-76.8-52.2-126-52.2c-49.2,0-91.2,17.4-126,52.2c-34.8,34.8-52.2,76.8-52.2,126L321.8,455.5L321.8,455.5z M900.9,522.3v400.9c0,18.6-6.5,34.3-19.5,47.3c-13,13-28.8,19.5-47.3,19.5H165.9c-18.6,0-34.3-6.5-47.3-19.5c-13-13-19.5-28.8-19.5-47.3V522.3c0-18.6,6.5-34.3,19.5-47.3c13-13,28.8-19.5,47.3-19.5h22.3V321.8c0-85.4,30.6-158.7,91.9-219.9C341.3,40.7,414.7,10,500,10c85.3,0,158.7,30.6,219.9,91.9c61.3,61.3,91.9,134.6,91.9,219.9v133.6h22.3c18.6,0,34.3,6.5,47.3,19.5C894.4,488,900.9,503.7,900.9,522.3L900.9,522.3z"
            />
          </g>
        </svg>
        <svg
          v-if="credStatusName === 'Enable Credential'"
          class="w-8 sm:hidden"
          x="0px"
          y="0px"
          viewBox="0 0 24 24"
        >
          <g transform="matrix(1 0 0 -1 0 1638)">
            <path
              d="M16.5,1630.688h-2.484c0,0.734-0.168,1.305-0.504,1.711s-0.848,0.609-1.535,0.609c-1.336,0-2.004-0.777-2.004-2.332v-2.801
            h8.578v-9.07H7.125c-0.461,0-0.855,0.164-1.184,0.492s-0.492,0.727-0.492,1.195v7.383H7.5v2.812c0,1.406,0.43,2.594,1.289,3.562
            s1.93,1.453,3.211,1.453s2.352-0.484,3.211-1.453S16.5,1632.094,16.5,1630.688z"
            />
          </g>
        </svg>
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
    const initial = getnavRole.value === 2 ? "scanqrcode" : "reportlist";
    const NavbarModule = Navbar({
      initial,
      role: getnavRole.value,
    });
    return { ...NavbarModule, logout, getnavRole, isMobileRef };
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