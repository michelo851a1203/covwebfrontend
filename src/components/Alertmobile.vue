<template>
  <div @click="cancelaction" class="absolute top-0 left-0 w-full h-full overlay">
    <transition name="translatetop">
      <div v-if="showani" class="fixed rounded w-full left-0 bottom-0 z-20 w-4/5 px-1">
        <div class="flex flex-col items-center rounded border px-3 py-2 bg-white shadow-lg">
          <div class="w-full pb-2 text-center border-b-2 border-gray-300">Status</div>
          <div class="py-1">{{ currentstatus.title }}</div>
          <div>
            <!-- loading -->
            <svg
              v-if="currentstatus.status === 'loading'"
              class="loadings stroke-current text-green-500"
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
            <!-- ok animation -->
            <svg
              v-if="currentstatus.status === 'ok'"
              width="100"
              class="okstatus stroke-current text-green-500"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="25"
                transform="rotate(-90 50 50)"
                stroke-dasharray="157.079"
                stroke-dashoffset="157.079"
                stroke-linecap="round"
                stroke-width="10"
                fill="transparent"
              />
              <polyline
                points="40,48 48,58 61,44"
                stroke-dashoffset="31.911221649408496"
                stroke-dasharray="31.911221649408496"
                stroke-width="5"
                fill="transparent"
                stroke-linejoin="round"
                stroke-linecap="round"
              />
            </svg>

            <!-- fail animation -->
            <svg
              v-if="currentstatus.status === 'fail'"
              width="100"
              class="failstatus stroke-current text-red-500"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="25"
                transform="rotate(-90 50 50)"
                stroke-dasharray="157.079"
                stroke-dashoffset="157.079"
                stroke-linecap="round"
                stroke-width="10"
                fill="transparent"
              />
              <line
                x1="42"
                y1="42"
                x2="58"
                y2="58"
                stroke-dasharray="22.63"
                stroke-dashoffset="22.63"
                stroke-linecap="round"
                stroke-width="5"
              />
              <line
                x1="58"
                y1="42"
                x2="42"
                y2="58"
                stroke-dasharray="22.63"
                stroke-dashoffset="22.63"
                stroke-linecap="round"
                stroke-width="5"
              />
            </svg>
          </div>
          <div class="w-full">
            <button
              @click="cancelaction"
              class="overlay w-full bg-gray-500 focus:outline-none hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-full"
            >Cancel</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
export default {
  name: "alertmobile",
  props: ["currentstatus", "blockcancel"],
  setup(props, { emit }) {
    const showani = ref(false);
    const cancelblock = computed(() => {
      if (props.blockcancel || props.blockcancel === true) {
        return true;
      }
      return false;
    });

    const cancelaction = (e) => {
      const list = [...e.target.classList];
      if (!list.includes("overlay")) {
        return;
      }
      if (props.blockcancel) {
        return;
      }
      emit("close");
    };

    onMounted(() => {
      showani.value = true;
    });
    return { showani, cancelblock, cancelaction };
  },
};
// ============================================================================
// 使用方法 :
// currentstatus:{
//   title: "整理中", // 當前狀態名稱
//   status: "OK", // 有分為 loading/ok/fail，這三個做顯示
// }
// blockcancel : no matter if block is true or false there's block all cancel
// 實作方法 : close 可以實作 auto close 製作自動關閉。
// ============================================================================
</script>

<style scoped lang="postcss">
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  @apply z-10;
}
/* transition */
.translatetop-enter {
  transform: translateY(10rem);
}
.translatetop-enter-active,
.translatetop-leave-active {
  transition: all 0.3s linear;
}
.translatetop-leave-to {
  transform: translateY(10rem);
}

/* this is loading animation */
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

.loadings {
  animation: rotate 0.6s linear infinite;
}

.loadings circle {
  animation: Loading 2.4s linear infinite;
}

/* this is okay animation */
@keyframes circle {
  0% {
    stroke-dashoffset: 157.079;
  }

  100% {
    stroke-dashoffset: 314.158;
  }
}

@keyframes tick {
  0% {
    stroke-dashoffset: 31.911221649408496;
  }

  100% {
    stroke-dashoffset: 0;
  }
}

.okstatus circle {
  animation: circle 1s ease-in-out;
  animation-fill-mode: forwards;
}

.okstatus polyline {
  animation: tick 0.5s ease-in-out;
  animation-delay: 1.15s;
  animation-fill-mode: forwards;
}
/* this is fail animation */
.failstatus circle {
  animation: circle 1s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes lineset {
  0% {
    stroke-dashoffset: 22.63;
  }

  100% {
    stroke-dashoffset: 0;
  }
}

.failstatus line {
  animation: lineset 0.5s ease-in-out;
  animation-delay: 1.15s;
  animation-fill-mode: forwards;
}
</style>