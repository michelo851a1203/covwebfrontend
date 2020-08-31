<template>
  <div class="reportContent py-12 sm:mt-12 sm:shadow-2xl sm:rounded mx-auto sm:bg-white">
    <suspense>
      <template #default>
        <component :is="showTypeRef"></component>
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
import Login from "@/api/Login.js";
import Navbar from "@/api/Navbar.js";
import reportlist from "@/components/ReportList.vue";
import scanqrcode from "@/components/ScanQrcode.vue";
import router from "@/router";
export default {
  name: "report",
  components: {
    reportlist,
    scanqrcode,
  },
  setup() {
    const loginModule = Login();
    const NavbarModule = Navbar({
      initial: "reportlist",
      role: 1,
    });
    if (!loginModule.regainLoginUser()) {
      router.push({
        name: "signIn",
      });
    }
    return { ...NavbarModule };
  },
};
</script>

<style scoped lang="postcss">
.reportContent {
  min-height: 30vh;
  width: 100%;
}

@media only screen and (min-width: theme(screens.sm)) {
  .reportContent {
    width: 50%;
  }
}
@media only screen and (min-width: theme(screens.ultra)) {
  .reportContent {
    width: 40%;
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

