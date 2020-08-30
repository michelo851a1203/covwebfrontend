<template>
  <component :class="{ 'active': active }" class="w-8 h-16" :is="type"></component>
</template>

<script>
import qrcode from "@/components/svg/Qrcode.vue";
import scan from "@/components/svg/Scan.vue";
export default {
  name: "svgcomponent",
  props: ["type", "active"],
  components: {
    qrcode,
    scan,
  },
};
</script>

<style scoped lang="postcss">
.active {
  @apply fill-current text-green-500;
}
</style>