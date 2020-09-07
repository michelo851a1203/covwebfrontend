<template>
  <div class="verifyContent py-12 sm:mt-12 sm:shadow-2xl sm:rounded mx-auto sm:bg-white">
    <div
      v-if="proofAttribute['Test Result'] && (proofAttribute['Test Result'] === 'DETECTED' || proofAttribute['Test Result'] === 'NONDETECTED')"
      class="flex items-center justify-center mb-12"
    >
      <div>
        <h2 class="text-xl font-bold">Test Result</h2>
        <p
          v-if="proofAttribute['Test Result'] === 'NONDETECTED'"
          class="text-lg text-green-600 font-bold"
        >
          NEGATIVE
          <br />Vaild
        </p>
        <p v-else class="text-lg text-red-600 font-bold">
          POSITIVE
          <br />Outdate
        </p>
      </div>
      <div class="ml-12 sm:ml-20">
        <svg
          v-if="proofAttribute['Test Result'] === 'NONDETECTED'"
          viewBox="0 0 100 100"
          class="w-16 stroke-current text-green-600"
        >
          <polyline
            stroke-width="6"
            stroke-linejoin="round"
            fill="transparent"
            points="10,10 90,10 90,90 10,90 10,10"
          />
          <polyline
            points="25,50 40,75 75,25"
            stroke-width="6"
            stroke-linejoin="round"
            stroke-linecap="round"
            fill="transparent"
          />
        </svg>
        <svg v-else viewBox="0 0 100 100" class="w-16 stroke-current text-red-600">
          <polyline
            stroke-width="6"
            stroke-linejoin="round"
            fill="transparent"
            points="10,10 90,10 90,90 10,90 10,10"
          />
          <line stroke-width="6" stroke-linecap="round" x1="30" y1="30" x2="70" y2="70" />
          <line stroke-width="6" stroke-linecap="round" x1="30" y1="70" x2="70" y2="30" />
        </svg>
      </div>
    </div>
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

    if (verificationModule.verifyResult._id === "") {
      router.push("/scan");
    }

    if (Object.keys(verificationModule.verifyResult.proof).length === 0) {
      router.push("/scan");
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

