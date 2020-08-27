<template>
  <div class="flex flex-col items-center">
    <component
      v-if="currentCredStatus.title !== '' && currentCredStatus.status !== ''"
      @close="closeCredentialAlert"
      :currentstatus="currentCredStatus"
      :is="alertComponent"
    ></component>
    <div class="self-start ml-10 mb-4">
      <label>填寫紀錄</label>
    </div>
    <div v-for="item in attr" :key="item.id" class="mb-4">
      <input
        v-model.lazy.trim="issueData[item.title]"
        class="border-b-2 border-gray-400 px-4 pt-1 focus:outline-none"
        :placeholder="item.title"
        type="text"
      />
    </div>
    <div class="mt-6 mb-4">
      <input
        v-model="sendToUserEmail"
        class="border-b-2 border-gray-600 placeholder-gray-600 px-4 pt-1 focus:outline-none"
        placeholder="寄送信箱..."
        type="text"
      />
    </div>
    <div class="mb-4 flex items-center self-start ml-10">
      <input v-model="lock" id="confirm" type="checkbox" />
      <label class="cursor-pointer text-xs ml-2" for="confirm">確認以上資料皆無誤</label>
    </div>
    <div class="w-4/5 mb-2 flex justify-around">
      <button
        @click="refillRecord"
        class="bg-gray-700 focus:outline-none hover:bg-gray-900 text-white font-medium py-2 px-4 rounded"
      >重填</button>
      <button
        @click="sendIssueFunc"
        class="bg-green-700 focus:outline-none hover:bg-green-900 text-white font-medium py-2 px-4 rounded"
      >送出</button>
    </div>
  </div>
</template>

<script>
import Credential from "@/api/Credential.js";
import router from "@/router";
import alert from "@/components/Alert.vue";
import alertmobile from "@/components/Alertmobile.vue";
import config from "@/api/request/config.js";
import { ref } from "vue";
export default {
  name: "RecordList",
  components: {
    alert,
    alertmobile,
  },
  async setup() {
    const alertComponent = ref("alert");
    if (config.mobileCheck()) {
      alertComponent.value = "alertmobile";
    }

    const credentialModule = Credential();
    const credentialData = credentialModule.credentialData;
    if (credentialData.name !== "" && credentialData.attributes.length > 0) {
      return { ...credentialModule, sendIssueFunc, alertComponent };
    }

    const oResult = await credentialModule.getCredDefinition();
    if (!oResult) {
      return;
    }

    const sendIssueFunc = async () => {
      const oResult = await credentialModule.sendIssue();
      if (!oResult.success) {
        credentialModule.normalCredentialAlert({
          title: oResult.msg,
          status: "fail",
        });
        return;
      }
      router.push("/report");
    };
    return { ...credentialModule, sendIssueFunc, alertComponent };
  },
};
</script>

<style scoped lang="postcss">
</style>