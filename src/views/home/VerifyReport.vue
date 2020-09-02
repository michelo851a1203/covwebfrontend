<template>
  <div class="verifyContent py-12 sm:mt-12 sm:shadow-2xl sm:rounded mx-auto sm:bg-white">
    <section class="flex items-center justify-around">
      <div class="py-2">
        <table class="text-sm">
          <tr v-for="item in Object.keys(mainThemeResult)" :key="item">
            <th class="border text-left px-3 py-1">{{ item }}</th>
            <td class="border text-left text-blue-400 px-3 py-1">{{ verifyResult[item] }}</td>
          </tr>
          <tr v-if="Object.keys(proofAttribute).length > 0">
            <th colspan="2" class="px-3 py-1 text-center border">attributes</th>
          </tr>
          <tr v-for="item in Object.keys(proofAttribute)" :key="item">
            <th class="text-left px-3 py-1 border">{{ item }}</th>
            <td class="text-left text-blue-400 px-3 py-1 border">{{ proofAttribute[item] }}</td>
          </tr>
        </table>
      </div>
    </section>
    <section class="mt-10 w-full mb-2 flex justify-around">
      <button
        @click="backtoScan"
        class="w-1/3 bg-gray-700 focus:outline-none hover:bg-gray-900 text-white font-medium py-2 px-4 rounded"
      >Back</button>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import Login from "@/api/Login.js";
import Verification from "@/api/Verification.js";
import router from "@/router";
export default {
  name: "report",
  components: {},
  setup() {
    const loginModule = Login();
    const verificationModule = Verification();
    if (!loginModule.regainLoginUser()) {
      router.push({
        name: "signIn",
      });
    }
    if (loginModule.userData.role === -1) {
      console.error("login in success but not get role");
    }

    const reportRole = ref(-1);
    reportRole.value = loginModule.userData.role;
    if (reportRole.value !== 2) {
      router.push({
        name: "signIn",
      });
    }

    const backtoScan = () => {
      router.push("/scan");
    };
    return { ...verificationModule, backtoScan, reportRole };
  },
};
</script>

<style scoped lang="postcss">
.verifyContent {
  min-height: 30vh;
  width: 100%;
}

@media only screen and (min-width: theme(screens.sm)) {
  .verifyContent {
    width: 50%;
  }
}
@media only screen and (min-width: theme(screens.ultra)) {
  .verifyContent {
    width: 40%;
  }
}
</style>

