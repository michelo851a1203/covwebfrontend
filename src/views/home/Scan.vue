<template>
  <div class="scanContent sm:h-screen py-12 mt-10 sm:shadow-2xl sm:rounded mx-auto sm:bg-white">
    <scanqrcode></scanqrcode>
  </div>
</template>

<script>
import scanqrcode from "@/components/ScanQrcode.vue";
export default {
  name: "Scan",
  components: {
    scanqrcode,
  },
  setup() {},
};
</script>

<style scoped lang="postcss">
.scanContent {
  min-height: 30vh;
  width: 100%;
}

@media only screen and (min-width: theme(screens.sm)) {
  .scanContent {
    width: 90%;
  }
}
@media only screen and (min-width: theme(screens.ultra)) {
  .scanContent {
    width: 90%;
  }
}
</style>