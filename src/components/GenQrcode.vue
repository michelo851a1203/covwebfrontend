<template>
  <div class="border">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import QRCode from "qrcode";
import { ref, onMounted, watch } from "vue";
export default {
  name: "genQrcode",
  props: ["qrStr", "width", "height"],
  setup(props) {
    if (!props.qrStr || props.qrStr === "") {
      console.error("no qrcode input");
      return;
    }
    const canvas = ref(null);
    onMounted(() => {
      QRCode.toCanvas(
        canvas.value,
        props.qrStr,
        {
          margin: 0,
          width: props.width ? props.width : 200,
          height: props.height ? props.height : 200,
        },
        (error) => {
          if (error) {
            console.error(error);
          }
        }
      );
    });
    watch(
      () => props.qrStr,
      (val) => {
        if (!val || val === "") {
          return;
        }
        QRCode.toCanvas(canvas.value, props.qrStr, (error) => {
          if (error) {
            console.error(error);
          }
        });
      }
    );

    return { canvas };
  },
};
</script>