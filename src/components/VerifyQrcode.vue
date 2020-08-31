<template>
  <div>
    <div class="qrcodepos"
      v-if="verifyReturnData.verificationId === '' && verifyReturnData.policy.attributes.length === 0"
    >
      <genqrcode class="qrcodeContent"
        v-if="verifyQrcodeForUser !== ''"
        :qrStr="verifyQrcodeForUser"
        width="200"
        height="200"
      ></genqrcode>
      <div v-else class="failinfo">Qrcode generated fail</div>
    </div>
    <div v-else>
      <table class="text-sm">
        <tr v-for="item in Object.keys(mainVerifyResult)" :key="item">
          <th class="text-left px-3 py-1">{{ item }}</th>
          <td class="text-left text-blue-400 px-3 py-1">{{ mainVerifyResult[item] }}</td>
        </tr>
        <tr v-if="verifyReturnData.policy.attributes.length > 0">
          <th colspan="2" class="text-center px-3 py-1">attributes</th>
        </tr>
        <tr v-for="item in verifyReturnData.policy.attributes[0].attributeNames" :key="item">
          <th class="text-left px-3 py-1">{{ item }}</th>
          <td
            class="text-left text-blue-400 px-3 py-1"
          >{{ verifyReturnData.proof[verifyReturnData.policy.attributes[0].policyName].attributes[item] }}</td>
        </tr>
        <tr>
          <td class="text-center px-3 py-1" colspan="2">
            <button
              @click="printVerify"
              class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >Print</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import genqrcode from "@/components/GenQrcode.vue";
import Verification from "@/api/Verification.js";
import { reactive, computed } from "vue";
export default {
  name: "VerifyQrcode",
  components: {
    genqrcode,
  },
  async setup() {
    const {
      tmpInterval,
      verifyQrcodeForUser,
      genQrcodeForUser,
      keepGetQrcodeInfo,
    } = Verification();

    const verifyReturnData = reactive({
      _id: "",
      verificationId: "",
      definitionId: "",
      state: "",
      createdAt: -1,
      updatedAt: -1,
      policy: {
        name: "",
        version: "",
        attributes: [],
      },
      proof: {},
    });

    const mainVerifyResult = computed(() => {
      const oDatta = {};
      Object.keys(verifyReturnData).forEach((item) => {
        if (item !== "policy" && item !== "proof") {
          oDatta[item] = verifyReturnData[item];
        }
      });
      return oDatta;
    });

    const response = await genQrcodeForUser();
    if (response.success) {
      tmpInterval.value = setInterval(async () => {
        const keepResponse = await keepGetQrcodeInfo(verifyQrcodeForUser.value);
        if (keepResponse.success === true && keepResponse.data) {
          // step 2 : all is okay
          if (
            keepResponse.data.step &&
            keepResponse.data.step === 2 &&
            keepResponse.data.verification
          ) {
            const returnVerData = keepResponse.data.verification;

            verifyReturnData._id = returnVerData._id;
            verifyReturnData.verificationId = returnVerData.verificationId;
            verifyReturnData.definitionId = returnVerData.definitionId;
            verifyReturnData.state = returnVerData.state;
            verifyReturnData.createdAt = returnVerData.createdAt;
            verifyReturnData.updatedAt = returnVerData.updatedAt;
            verifyReturnData.policy = returnVerData.policy;
            verifyReturnData.proof = returnVerData.proof;
            
            clearInterval(tmpInterval.value);
            tmpInterval.value = null;
          }
        }
      }, 800);
    }

    const printVerify = () => {
      if (verifyReturnData._id && verifyReturnData._id !== "") {
        const cluster = localStorage.getItem("covWebItem");
        const token = localStorage.getItem(cluster);
        window.location = `raygate://a910/printer?verificationId=${verifyReturnData._id}&token=${token}`;
      }
    };
    return {
      verifyReturnData,
      mainVerifyResult,
      verifyQrcodeForUser,
      genQrcodeForUser,
      keepGetQrcodeInfo,
      printVerify,
    };
  },
};
</script>

<style scoped lang="postcss">
.qrcodepos{
  padding-left: 50%;
}
.qrcodepos div{
  transform: translateX(-50%);
}
.failinfo {
  @apply rounded bg-blue-300;
  width: 200px;
  height: 200px;
}

</style>