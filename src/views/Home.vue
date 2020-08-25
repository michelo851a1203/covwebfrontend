<template>
  <div class="home bg-green-600">
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/api/Login.js";
import Credential from "@/api/Credential.js";
import router from "@/router";
export default {
  name: "Home",
  setup() {
    const loginModule = Login();
    const credentialModule = Credential();
    if (!loginModule.regainLoginUser()) {
      router.push({
        name: "signIn",
      });
    }

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
  },
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
