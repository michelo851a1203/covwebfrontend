<template>
  <div class="home sm:bg-green-600">
    <navbar></navbar>
    <router-view></router-view>
    <belowlist v-if="isMobileRef && getmainRole !== 3"></belowlist>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from "vue";
import navbar from "@/components/Navbar.vue";
import belowlist from "@/components/BelowList.vue";
import config from "@/api/request/config.js";
import Login from "@/api/Login.js";
export default {
  name: "Home",
  components: {
    navbar,
    belowlist,
  },
  setup() {
    const isMobileRef = ref(config.mobileCheck());
    const loginModule = Login();
    loginModule.regainLoginUser();
    const getmainRole = ref(-1);
    getmainRole.value = loginModule.userData.role;
    return { isMobileRef, getmainRole };
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
