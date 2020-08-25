<template>
  <div class="recordContent flex items-center flex-col py-12 shadow-2xl rounded mx-auto bg-white">
    <div class="self-start ml-10 mb-4">
      <label>填寫紀錄</label>
    </div>
    <div v-for="item in attrData" :key="item.id" class="mb-4">
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
      <input id="confirm" type="checkbox" />
      <label class="text-xs ml-2" for="confirm">確認以上資料皆無誤</label>
    </div>
    <div class="w-4/5 mb-2 flex justify-around">
      <button
        @click="refillRecord"
        class="bg-gray-700 focus:outline-none hover:bg-gray-900 text-white font-medium py-2 px-4 rounded"
      >重填</button>
      <button
        @click="sendIssue"
        class="bg-green-700 focus:outline-none hover:bg-green-900 text-white font-medium py-2 px-4 rounded"
      >送出</button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import Credential from "@/api/Credential.js";
import config from "@/api/request/config.js";
export default {
  name: "homeIndex",
  setup() {
    const {
      issueData,
      attributes,
      sendToUserEmail,
      sendIssue,
      refillRecord,
    } = Credential();
    const attrData = computed(() => {
      if (attributes.value.length === 0) {
        return [];
      }
      const oData = attributes.value.map((item) => {
        return {
          id: config.uuid(),
          title: item,
        };
      });
      return oData;
    });
    return { issueData, attrData, sendToUserEmail, sendIssue, refillRecord };
  },
};
</script>

<style scoped lang="postcss">
.recordContent {
  min-height: 30vh;
  width: 30%;
}
@media only screen and (min-width: 1400px) {
  .recordContent {
    width: 20%;
  }
}
</style>