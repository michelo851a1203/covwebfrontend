<template>
  <div class="alert">
    <div
      class="alertContent border border-black flex items-center px-6 py-4 rounded shadow-xl bg-gray-300"
      :class="{ 
        'bg-red-300 border-red-600':currentstatus.status === 'fail',
        'bg-green-300 border-green-600':currentstatus.status === 'ok',
        'bg-gray-300 border-gray-600':currentstatus.status === 'loading',
      }"
    >
      <div class="break-all">{{ currentstatus.title }}</div>
      <div v-if="!blockcancel" class="ml-auto">
        <button class="font-bold px-2 rounded-full">&times;</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "alert",
  props: ["currentstatus", "blockcancel"],
  setup(props, { emit }) {
    const cancelaction = () => {
      if (props.blockcancel) {
        return;
      }
      emit("close");
    };
    return { cancelaction };
  },
};
// ============================================================================
// 使用方法 :
// currentstatus:{
//   title: "整理中", // 當前狀態名稱
//   status: "OK", // 有分為 loading/ok/fail，這三個做顯示
// }
// blockcancel : no matter if block is true or false there's block all cancel
// 實作方法 : close 可以實作 auto close 製作自動關閉。
// ============================================================================
</script>

<style scoped lang="postcss">
.alert {
  @apply fixed;
  top: 2rem;
  right: 5rem;
}
.alertContent {
  min-height: 4rem;
  max-width: calc(100vw - 10rem);
}
</style>