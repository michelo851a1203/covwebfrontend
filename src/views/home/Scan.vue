<template>
  <div class="scanContent py-12 mt-10 shadow-2xl rounded mx-auto bg-white">
  </div>
</template>

<script>
export default {
  name: "Scan",
  components: {
  },
  setup() {
  },
};
</script>

<style scoped lang="postcss">
.scanContent {
  min-height: 30vh;
  width: 30%;
}
@media only screen and (min-width: theme(screens.ultra)) {
  .scanContent {
    width: 20%;
  }
}
</style>