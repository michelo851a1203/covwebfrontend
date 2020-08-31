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
import Login from "@/api/Login.js";
import svgcomponent from "@/components/SvgComponent.vue";
import Navbar from "@/api/Navbar.js";
export default {
  name: "BelowList",
  components: {
    svgcomponent,
  },
  setup() {
    const loginModule = Login();
    loginModule.regainLoginUser();
    let NavbarModule = null;
    switch (loginModule.userData.role) {
      case 1:
        NavbarModule = Navbar({
          initial: "reportlist",
          role: 1,
        });
        break;
      case 2:
        NavbarModule = Navbar({
          initial: "scanqrcode",
          role: 2,
        });
        break;
      case 3:
        console.error("get wrong role error");
        break;
      default:
        break;
    }
    return { ...NavbarModule };
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