<template>
  <div class="recordContent flex items-center flex-col py-12 shadow-2xl rounded mx-auto bg-white">
    <div class="self-start ml-10 mb-4">
      <label>填寫紀錄</label>
    </div>
    <div v-for="item in credDefinition.attr" :key="item.id" class="mb-4">
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
import Login from "@/api/Login.js";
import Credential from "@/api/Credential.js";
import router from "@/router";
export default {
  name: "homeIndex",
  setup() {
    const loginModule = Login();
    if (!loginModule.regainLoginUser()) {
      router.push({
        name: "signIn",
      });
    }
    const credentialModule = Credential();
    if (loginModule.userData.role === -1) {
      console.error("login in success but not get role");
      return;
    }
    switch (loginModule.userData.role) {
      case 1:
        // user
        break;
      case 2:
        // verify person
        break;
      case 3:
        // check center
        credentialModule.getCredDefinition();
        break;
      default:
        break;
    }
    return { ...credentialModule };
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