<template>
  <div class="belowlist sm:hidden">
    <div
      @click="clickBelow(item.id)"
      :class="{ 'belowitemActive' : item.active }"
      class="border-t-2 h-16 w-full flex justify-center"
      v-for="item in list"
      :key="item.id"
    >
      <svgcomponent :active="item.active" :type="item.type"></svgcomponent>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import svgcomponent from "@/components/SvgComponent.vue";
export default {
  name: "BelowList",
  components: {
    svgcomponent,
  },
  setup() {
    const list = ref([
      {
        id: 1,
        active: false,
        type: "Scan",
      },
      {
        id: 2,
        active: false,
        type: "Qrcode",
      },
    ]);

    const clickBelow = (id) => {
      const listIndex = list.value.findIndex((item) => item.id === id);
      if (listIndex === -1) {
        return;
      }
      list.value[listIndex].active = true;
      list.value.forEach((item) => {
        if (item.id !== id) {
          item.active = false;
        }
      });
    };
    return { list, clickBelow };
  },
};
</script>

<style scoped lang="postcss">
.belowlist {
  @apply border fixed w-full h-16 flex justify-around items-center bg-white;
  bottom: 0;
}
.belowitemActive {
  @apply border-green-700;
}
</style>