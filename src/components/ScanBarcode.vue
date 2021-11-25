<template>
  <div class="hello">
    <StreamBarcodeReader
      @decode="(a, b, c) => onDecode(a, b, c)"
      @loaded="() => onLoaded()"
    ></StreamBarcodeReader>
    Input Value: {{ text || "Nothing" }}
  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";


export default {
    name: "ScanBarcode",
    components: {
      StreamBarcodeReader,
    },
    data() {
      return {
        text: "",
        id: null,
      };
    },
    props: {
      msg: String,
    },
    methods: {
      onDecode(a, b, c) {
        console.log(a, b, c);
        this.text = a;
        if (this.id) clearTimeout(this.id);
        this.id = setTimeout(() => {
          if (this.text === a) {
            this.text = "";
          }
        }, 5000);
      },
      onLoaded() {
        console.log("load");
      },
    },

    mounted(){
    // this.$store.dispatch('viewTrackerCount', 'scanbarcode')
  },
}
</script>

<style>

</style>