<template>
  <div class="home bg-green-200 sm:bg-green-600">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from "@/components/Navbar.vue";
export default {
  name: "Home",
  components: {
    navbar,
  },
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
