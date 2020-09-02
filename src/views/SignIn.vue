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
      <div class="w-4/5 mb-4">
        <input
          v-model.lazy.trim="user"
          class="w-full bg-gray-300 px-4 py-2 py-1 focus:outline-none rounded"
          placeholder="User"
          type="text"
        />
      </div>
      <div class="w-4/5 mb-4 bg-gray-300 rounded flex items-center">
        <div class="w-full">
          <input
            v-model.lazy.trim="password"
            class="w-full bg-gray-300 px-4 py-2 focus:outline-none rounded"
            placeholder="password"
            :type="showpassType"
          />
        </div>
        <div @click="triggerShowpass" class="mx-2">
          <svg v-if="showPass" width="24" height="24" fill-rule="evenodd" clip-rule="evenodd">
            <path
              d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z"
            />
          </svg>
          <svg v-else width="24" height="24" fill-rule="evenodd" clip-rule="evenodd">
            <path
              d="M8.137 15.147c-.71-.857-1.146-1.947-1.146-3.147 0-2.76 2.241-5 5-5 1.201 0 2.291.435 3.148 1.145l1.897-1.897c-1.441-.738-3.122-1.248-5.035-1.248-6.115 0-10.025 5.355-10.842 6.584.529.834 2.379 3.527 5.113 5.428l1.865-1.865zm6.294-6.294c-.673-.53-1.515-.853-2.44-.853-2.207 0-4 1.792-4 4 0 .923.324 1.765.854 2.439l5.586-5.586zm7.56-6.146l-19.292 19.293-.708-.707 3.548-3.548c-2.298-1.612-4.234-3.885-5.548-6.169 2.418-4.103 6.943-7.576 12.01-7.576 2.065 0 4.021.566 5.782 1.501l3.501-3.501.707.707zm-2.465 3.879l-.734.734c2.236 1.619 3.628 3.604 4.061 4.274-.739 1.303-4.546 7.406-10.852 7.406-1.425 0-2.749-.368-3.951-.938l-.748.748c1.475.742 3.057 1.19 4.699 1.19 5.274 0 9.758-4.006 11.999-8.436-1.087-1.891-2.63-3.637-4.474-4.978zm-3.535 5.414c0-.554-.113-1.082-.317-1.562l.734-.734c.361.69.583 1.464.583 2.296 0 2.759-2.24 5-5 5-.832 0-1.604-.223-2.295-.583l.734-.735c.48.204 1.007.318 1.561.318 2.208 0 4-1.792 4-4z"
            />
          </svg>
        </div>
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
import { onMounted, ref, computed } from "vue";
export default {
  name: "Signin",
  components: {
    alert,
    alertmobile,
  },
  setup() {
    const alertComponent = ref("alert");
    const showPass = ref(false);

    const triggerShowpass = () => {
      showPass.value = !showPass.value;
    };

    const showpassType = computed(() => {
      return showPass.value ? "text" : "password";
    });

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
          router.push("/scan");
          break;
        case 3:
          router.push("/");
          break;
        default:
          break;
      }
    };
    return {
      showPass,
      triggerShowpass,
      showpassType,
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