<template>
  <div class="signin sm:bg-green-600">
    <component
      v-if="currentStatus.title !== '' && currentStatus.status !== ''"
      @close="closeAlert"
      :currentstatus="currentStatus"
      :is="alertComponent"
    ></component>
    <div
      class="signcontent flex items-center flex-col py-12 sm:shadow-2xl rounded mx-auto bg-white"
    >
      <section class="sm:hidden leading-loose text-lg text-center mb-4">
        <p>COVID-19</p>
        <p>Verifiable Credential</p>
        <p>Check in</p>
      </section>
      <div class="mb-4">
        <input
          v-model.lazy.trim="user"
          class="w-full bg-gray-300 px-4 py-2 py-1 focus:outline-none rounded"
          placeholder="User"
          type="text"
        />
      </div>
      <div class="mb-4">
        <input
          v-model.lazy.trim="password"
          class="w-full bg-gray-300 px-4 py-2 focus:outline-none rounded"
          placeholder="password"
          type="password"
        />
      </div>
      <div class="w-4/5 mb-2">
        <button
          @click="loginFunc"
          class="w-full bg-green-700 focus:outline-none hover:bg-green-900 text-white font-medium py-2 px-4 rounded"
        >LOGIN</button>
      </div>
      <div class="text-xs">
        <label for>Not Register?</label>
        <router-link class="text-green-600" to="/register">Create an account</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/api/Login.js";
import router from "@/router";
import alert from "@/components/Alert.vue";
import alertmobile from "@/components/Alertmobile.vue";
import config from "@/api/request/config.js";
import { onMounted, ref } from "vue";
export default {
  name: "Signin",
  components: {
    alert,
    alertmobile,
  },
  setup() {
    const alertComponent = ref("alert");
    if (config.mobileCheck()) {
      alertComponent.value = "alertmobile";
    }

    const loginModule = Login();
    onMounted(() => {
      loginModule.clearToken();
    });
    const loginFunc = async () => {
      if (loginModule.user.value === "") {
        loginModule.normalAlert({
          title: "請輸入帳號",
          status: "fail",
        });
        return;
      }
      if (loginModule.password.value === "") {
        loginModule.normalAlert({
          title: "請輸入密碼",
          status: "fail",
        });
        return;
      }
      const oResult = await loginModule.login();
      if (!oResult) {
        return;
      }
      const cluster = localStorage.getItem("covWebItem");
      const token = localStorage.getItem(cluster);
      if (!token || token === "" || loginModule.storageToken === "") {
        console.error("not get this token");
        loginModule.normalAlert({
          title: "登入失敗尚未取得token",
          status: "fail",
        });
        return;
      }
      if (loginModule.userData.role === -1) {
        console.error("login in success but not get role");
        loginModule.normalAlert({
          title: "登入成功但尚未取得角色",
          status: "fail",
        });
        return;
      }
      switch (loginModule.userData.role) {
        case 1:
          router.push("/report");
          break;
        case 2:
          router.push("/scan")
          break;
        case 3:
          router.push("/");
          break;
        default:
          break;
      }
    };
    return {
      ...loginModule,
      loginFunc,
      alertComponent,
    };
  },
};
</script>

<style scoped lang="postcss">
.signin {
  min-height: 100vh;
  padding-top: 10vh;
}

.signcontent {
  min-height: 30vh;
  width: 100%;
}
@media only screen and (min-width: theme(screens.sm)) {
  .signin {
    padding-top: 20vh;
  }
  .signcontent {
    width: 30%;
  }
}

@media only screen and (min-width: theme(screens.ultra)) {
  .signcontent {
    width: 20%;
  }
}
</style>