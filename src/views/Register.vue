<template>
  <div class="register bg-green-600">
    <div
      class="registercontent flex items-center flex-col py-12 shadow-2xl rounded mx-auto bg-white"
    >
      <div class="registertitle self-start mb-4">
        <label>Test Center Register</label>
      </div>
      <div class="mb-4">
        <input
          v-model.lazy.trim="registerUser"
          class="border-b-2 border-gray-400 px-4 pt-1 focus:outline-none"
          placeholder="User"
          type="text"
        />
      </div>
      <div class="mb-4">
        <input
          v-model.lazy.trim="registerPassword"
          class="border-b-2 border-gray-400 px-4 pt-1 focus:outline-none"
          placeholder="Password"
          type="password"
        />
      </div>
      <div class="mb-4">
        <input
          v-model.lazy.trim="registerEmail"
          class="border-b-2 border-gray-400 px-4 pt-1 focus:outline-none"
          placeholder="Email"
          type="text"
        />
      </div>
      <div class="mb-4">
        <input
          v-model.lazy.trim="registerDisplayName"
          class="border-b-2 border-gray-400 px-4 pt-1 focus:outline-none"
          placeholder="DisplayName"
          type="text"
        />
      </div>
      <div class="w-4/5 mb-2 flex justify-around">
        <button
          @click="refill"
          class="bg-gray-700 focus:outline-none hover:bg-gray-900 text-white font-medium py-2 px-4 rounded"
        >Reset</button>
        <button
          @click="registerFunc"
          class="bg-green-700 focus:outline-none hover:bg-green-900 text-white font-medium py-2 px-4 rounded"
        >Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/api/Login.js";
import router from "@/router";
import { onMounted } from "vue";
export default {
  name: "register",
  setup() {
    const loginModule = Login();
    onMounted(() => {
      loginModule.clearToken();
    });

    const registerFunc = async () => {
      const registerResult = await loginModule.register();
      if (registerResult === true) {
        router.push("/signin");
      }
    };

    return { ...loginModule, registerFunc };
  },
};
</script>

<style scoped lang="postcss">
.register {
  min-height: 100vh;
  padding-top: 20vh;
}
.registertitle {
  margin-left: 10%;
}
.registercontent {
  min-height: 30vh;
  width: 30%;
}
@media only screen and (min-width: 1400px) {
  .registercontent {
    width: 20%;
  }
}
</style>