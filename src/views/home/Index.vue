<template>
  <div class="recordContent py-12 shadow-2xl rounded mx-auto bg-white">
    <suspense v-if="getRole === 3">
      <template #default>
        <recordlist></recordlist>
      </template>
      <template #fallback>
        <div>loading...</div>
      </template>
    </suspense>
  </div>
</template>

<script>
import { ref } from "vue";
import Login from "@/api/Login.js";
import Credential from "@/api/Credential.js";
import router from "@/router";
import recordlist from "@/components/RecordList.vue";
export default {
  name: "homeIndex",
  components: {
    recordlist,
  },
  setup() {
    const loginModule = Login();
    const credentialModule = Credential();
    const getRole = ref(-1);
    if (!loginModule.regainLoginUser()) {
      router.push({
        name: "signIn",
      });
    }
    getIndexRole.value = loginModule.userData.role;
    if (getRole.value === -1) {
      console.error("login in success but not get role");
    }
    if (getRole.value === 1) {
      router.push("/report");
    }
    return { getRole };
  },
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