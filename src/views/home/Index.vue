<template>
  <div class="recordContent flex items-center flex-col py-12 shadow-2xl rounded mx-auto bg-white">
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
    <div class="mb-4">
      <input
        class="border-b-2 border-gray-400 px-4 pt-1 focus:outline-none"
        placeholder="Name..."
        type="text"
      />
    </div>
    <div class="mb-4">
      <input
        class="border-b-2 border-gray-400 px-4 pt-1 focus:outline-none"
        placeholder="passport no..."
        type="text"
      />
    </div>
    <div class="mb-4">
      <input
        class="border-b-2 border-gray-400 px-4 pt-1 focus:outline-none"
        placeholder="Test Date..."
        type="text"
      />
    </div>
    <div class="mb-4">
      <input
        class="border-b-2 border-gray-400 px-4 pt-1 focus:outline-none"
        placeholder="Test type..."
        type="text"
      />
    </div>
    <div class="mb-10">
      <input
        class="border-b-2 border-gray-400 px-4 pt-1 focus:outline-none"
        placeholder="Test result..."
        type="text"
      />
    </div>
    <div class="mb-4">
      <input
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
export default {
  name: "homeIndex",
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