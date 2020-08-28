<template>
  <div class="fixed top-0 bg-gray-300 shadow-2xl w-full h-16">
    <div class="flex items-center h-full">
      <div class="ml-10">COV-19 TEST</div>
      <div v-if="getnavRole !== 3" class="ml-auto mr-4 hover:bg-gray-500 h-full flex items-center">
        <button class="text-black hover:underline text-lg font-medium py-1 px-2">Scan Qrcode</button>
      </div>
      <div v-if="getnavRole !== 3" class="mr-4 hover:bg-gray-500 h-full flex items-center">
        <button class="text-black hover:underline text-lg font-medium py-1 px-2">Generate Qrcode</button>
      </div>
      <div v-if="getnavRole === 1" class="mr-4 hover:bg-blue-300 h-full flex items-center">
        <button class="text-black hover:underline text-lg font-medium py-1 px-2">Disable Credential</button>
      </div>
      <div :class="{'ml-auto' : getnavRole === 3}" class="mr-10">
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
export default {
  name: "Navbar",
  setup() {
    const loginModule = Login();
    loginModule.regainLoginUser();
    const getnavRole = ref(-1);
    getnavRole.value = loginModule.userData.role;
    const logout = () => {
      router.push({
        name: "signIn",
      });
    };
    return { logout, getnavRole };
  },
};
</script>