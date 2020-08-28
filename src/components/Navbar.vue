<template>
  <div class="fixed top-0 bg-gray-300 shadow-2xl w-full h-16">
    <div class="flex items-center h-full">
      <div class="ml-10">COV-19 TEST</div>
      <div class="ml-auto mr-10">
        <button @click="logout" class="text-black hover:underline text-lg font-medium py-1 px-2">Log out</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: "Navbar",
  setup() {
    const logout = () => {
      router.push({
        name: "signIn",
      });
    };
    return { logout }
  },
};
</script>