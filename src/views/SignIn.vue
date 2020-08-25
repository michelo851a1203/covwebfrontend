<template>
  <div class="signin bg-green-600">
    <div class="signcontent flex items-center flex-col py-12 shadow-2xl rounded mx-auto bg-white">
      <div class="mb-4">
        <input
          v-model.lazy.trim="user"
          class="bg-gray-300 px-4 py-2 py-1 focus:outline-none rounded"
          placeholder="輸入帳號..."
          type="text"
        />
      </div>
      <div class="mb-4">
        <input
          v-model.lazy.trim="password"
          class="bg-gray-300 px-4 py-2 focus:outline-none rounded"
          placeholder="輸入密碼..."
          type="password"
        />
      </div>
      <div class="w-4/5 mb-2">
        <button
          @click="loginFunc"
          class="w-full bg-green-700 focus:outline-none hover:bg-green-900 text-white font-medium py-2 px-4 rounded"
        >登入</button>
      </div>
      <div class="text-xs">
        <label for>沒有註冊?</label>
        <router-link class="text-green-600" to="/register">創建帳號</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/api/Login.js";
import router from "@/router";
import { onMounted } from "vue";
export default {
  name: "Signin",
  setup() {
    const loginModule = Login();
    onMounted(() => {
      loginModule.clearToken();
    });
    const loginFunc = async () => {
      await loginModule.login();
      const cluster = localStorage.getItem("covWebItem");
      const token = localStorage.getItem(cluster);
      if (!token || token === "" || loginModule.storageToken === "") {
        console.error("not get this token");
        return;
      }
      if (loginModule.userData.role === -1) {
        console.error("login in success but not get role");
        return;
      }
      switch (loginModule.userData.role) {
        case 1:
          router.push("/report");
          break;
        case 2:
          break;
        case 3:
          router.push("/");
          break;
        default:
          break;
      }
    };
    return { ...loginModule, loginFunc };
  },
};
</script>

<style scoped lang="postcss">
.signin {
  min-height: 100vh;
  padding-top: 20vh;
}

.signcontent {
  min-height: 30vh;
  width: 30%;
}
@media only screen and (min-width: 1400px) {
  .signcontent {
    width: 20%;
  }
}
</style>