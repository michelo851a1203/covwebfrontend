<template>
  <div class="home bg-green-200 sm:bg-green-600">
    <navbar></navbar>
    <router-view></router-view>
    <belowlist v-if="isMobileRef"></belowlist>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from "vue";
import navbar from "@/components/Navbar.vue";
import belowlist from "@/components/BelowList.vue";
import config from "@/api/request/config.js";
export default {
  name: "Home",
  components: {
    navbar,
    belowlist,
  },
  setup() {
    const isMobileRef = ref(config.mobileCheck());
    return { isMobileRef };
  },
};
</script>

<style scoped lang="postcss">
.home {
  min-height: 100vh;
  padding-top: 10vh;
  @apply pb-4;
}
@media only screen and (min-width: theme(screens.ultra)) {
  .home {
    padding-top: 20vh;
  }
}
</style>
