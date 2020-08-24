<template>
  <div class="reportContent flex items-center flex-col py-12 shadow-2xl rounded mx-auto bg-white">
    <div class="self-start ml-10 mb-4">
      <label>填寫紀錄</label>
    </div>
    <div class="mb-4">
      <input
        class="border-b-2 border-gray-400 px-4 pt-1 focus:outline-none"
        placeholder="ID..."
        type="text"
      />
    </div>
    <genqrcode v-if="false"></genqrcode>
    <div class="w-4/5 mb-2 flex justify-around">
      <button
        @click="registerFunc"
        class="bg-gray-700 focus:outline-none hover:bg-gray-900 text-white font-medium py-2 px-4 rounded"
      >重填</button>
      <button
        @click="refill"
        class="bg-green-700 focus:outline-none hover:bg-green-900 text-white font-medium py-2 px-4 rounded"
      >送出</button>
    </div>
  </div>
</template>

<script>
import genqrcode from "@/components/GenQrcode.vue";
export default {
  name: "report",
  components: {
    genqrcode,
  },
  setup() {},
};
</script>

<style scoped lang="postcss">
.reportContent {
  min-height: 30vh;
  width: 30%;
}
@media only screen and (min-width: 1400px) {
  .reportContent {
    width: 20%;
  }
}
</style>

