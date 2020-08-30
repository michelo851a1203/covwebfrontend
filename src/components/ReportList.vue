<template>
  <div>
    <section class="flex flex-col sm:flex-row items-center sm:justify-around">
      <div class="order-2 sm:order-1 my-10 sm:py-2">
        <table class="text-sm">
          <tr v-for="item in Object.keys(report.credential.values)" :key="item">
            <th class="text-left px-3 py-1">{{ item }}</th>
            <td class="text-left text-blue-400 px-3 py-1">{{ report.credential.values[item] }}</td>
          </tr>
        </table>
      </div>
      <div class="order-1 sm:order-2">
        <genqrcode v-if="report._id !== ''" :qrStr="report._id" width="200" height="200"></genqrcode>
      </div>
    </section>
    <section v-if="reportRole === 3" class="text-center">
      <label for>VC test report will be sent to</label>
      <label class="text-blue-400">{{ report.displayName }}</label>
    </section>
    <section v-if="reportRole === 3" class="w-full mt-10 mb-2 flex justify-around">
      <button
        @click="backtoRecord"
        class="w-1/3 bg-gray-700 focus:outline-none hover:bg-gray-900 text-white font-medium py-2 px-4 rounded"
      >Back</button>
      <button
        @click="sendMailFunc"
        class="w-1/3 bg-green-700 focus:outline-none hover:bg-green-900 text-white font-medium py-2 px-4 rounded"
      >Confirm</button>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import Login from "@/api/Login.js";
import genqrcode from "@/components/GenQrcode.vue";
import Credential from "@/api/Credential.js";
import router from "@/router";
export default {
  name: "components",
  components: {
    genqrcode,
  },
  async setup() {
    const loginModule = Login();
    const credentialModule = Credential();
    if (!loginModule.regainLoginUser()) {
      router.push({
        name: "signIn",
      });
    }

    const reportRole = ref(-1);
    reportRole.value = loginModule.userData.role;

    const keys = Object.keys(credentialModule.report.credential.values);
    if (keys.length === 0 && reportRole.value === 3) {
      router.push("/");
    }

    if (reportRole.value === 1) {
      await credentialModule.getUserDetail();
    }

    const backtoRecord = () => {
      router.push("/");
    };

    const sendMailFunc = async () => {
      const { success } = await credentialModule.sendMailApi();
      if (success) {
        router.push("/");
      }
    };
    return { ...credentialModule, backtoRecord, reportRole, sendMailFunc };
  },
};
</script>

<style scoped lang="postcss">
</style>