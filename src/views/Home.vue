<template>
  <div class="home bg-green-600">
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
};
</script>

<style scoped lang="postcss">
.home {
  min-height: 100vh;
  padding-top: 10vh;
  @apply pb-4;
}
@media only screen and (min-width: 1400px) {
  .home {
    padding-top: 20vh;
  }
}
</style>
