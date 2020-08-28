<template>
  <div class="recordContent py-12 sm:mt-10 sm:shadow-2xl sm:rounded mx-auto sm:bg-white">
    <suspense v-if="getRole === 3">
      <template #default>
        <recordlist></recordlist>
      </template>
      <template #fallback>
        <div class="flex items-center px-6 py-4">
          <div>
            <svg
              class="boardloading stroke-current text-green-600"
              width="100"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="25"
                stroke-dasharray="157"
                stroke-dashoffset="0"
                stroke-linecap="round"
                stroke-width="10"
                fill="transparent"
              />
            </svg>
          </div>
          <div class="ml-10">loading...</div>
        </div>
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
    credentialModule.clearCredentialReport();
    const getRole = ref(-1);
    if (!loginModule.regainLoginUser()) {
      router.push({
        name: "signIn",
      });
    }
    getRole.value = loginModule.userData.role;
    return { getRole };
  },
};
</script>

<style scoped lang="postcss">
.recordContent {
  min-height: 30vh;
  width: 100%;
}

@media only screen and (min-width: theme(screens.sm)) {
  .recordContent {
    width: 30%;
  }
}

@media only screen and (min-width: theme(screens.ultra)) {
  .recordContent {
    width: 20%;
  }
}

@keyframes Loading {
  0% {
    stroke-dashoffset: 0;
  }

  75% {
    stroke-dashoffset: 250;
  }

  100% {
    stroke-dashoffset: 314;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.boardloading {
  animation: rotate 0.6s linear infinite;
}

.boardloading circle {
  animation: Loading 2.4s linear infinite;
}
</style>