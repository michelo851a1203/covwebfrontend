<template>
  <div class="reportContent py-12 shadow-2xl rounded mx-auto bg-white">
    <section class="flex items-center justify-around">
      <div class="py-2">
        <table class="text-sm">
          <tr>
            <th class="px-3 py-1">Sample</th>
            <td class="text-blue-400 px-3 py-1">AAAAAA</td>
          </tr>
          <tr>
            <th class="px-3 py-1">Sample</th>
            <td class="text-blue-400 px-3 py-1">AAAAAA</td>
          </tr>
          <tr>
            <th class="px-3 py-1">Sample</th>
            <td class="text-blue-400 px-3 py-1">AAAAAA</td>
          </tr>
          <tr>
            <th class="px-3 py-1">Sample</th>
            <td class="text-blue-400 px-3 py-1">AAAAAA</td>
          </tr>
          <tr>
            <th class="px-3 py-1">Sample</th>
            <td class="text-blue-400 px-3 py-1">AAAAAA</td>
          </tr>
          <tr>
            <th class="px-3 py-1">Sample</th>
            <td class="text-blue-400 px-3 py-1">AAAAAA</td>
          </tr>
          <tr>
            <th class="px-3 py-1">Sample</th>
            <td class="text-blue-400 px-3 py-1">AAAAAA</td>
          </tr>
        </table>
      </div>
      <div>
        <genqrcode v-if="true" qrStr="www.google.com" width="200" height="200"></genqrcode>
      </div>
    </section>
    <section class="mt-10 text-center">
      <label for>VC test report will be sent to</label>
      <label class="text-blue-400">alice.smith@gmail.com</label>
    </section>
    <section class="mt-10 w-full mb-2 flex justify-around">
      <button
        class="w-1/3 bg-gray-700 focus:outline-none hover:bg-gray-900 text-white font-medium py-2 px-4 rounded"
      >重填</button>
      <button
        class="w-1/3 bg-green-700 focus:outline-none hover:bg-green-900 text-white font-medium py-2 px-4 rounded"
      >送出</button>
    </section>
  </div>
</template>

<script>
import genqrcode from "@/components/GenQrcode.vue";
export default {
  name: "report",
  components: {
    genqrcode,
  },
  setup() {},
};
</script>

<style scoped lang="postcss">
.reportContent {
  min-height: 30vh;
  width: 50%;
}
@media only screen and (min-width: 1400px) {
  .reportContent {
    width: 40%;
  }
}
</style>

