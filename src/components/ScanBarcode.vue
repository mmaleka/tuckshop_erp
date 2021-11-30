<template>
  <div class="scanner_wrapper">
    <BR /><BR /> <span>{{ resultCodeInfo }}</span> <BR />
    <span>{{ resultcode }}</span>

    <div ref="quagga" class="camera" />

  </div>
</template>

<script>
import Quagga from "quagga";
import axios from "axios";


export default {
    name: "ScanBarcode",
    components: {

    },
    data: () => ({
      data: null,
      resultcode: "-",
      resultCodeInfo: "-",
      foundCodes: new Map(),
    }),

    methods: {
      start() {
        Quagga.onDetected(this.onDetected);
        Quagga.start();
        console.log("Quagga started!");
        //this.getCodeInfo('46020480032')
      },
      onDetected(data) {
        this.data = data;
        this.resultcode =
          data.codeResult.code + " - " + data.codeResult.startInfo.error;
        if (this.foundCodes.has(data.codeResult.code)) {
          var val = this.foundCodes.get(data.codeResult.code);
          val++;
          this.foundCodes.set(data.codeResult.code, val);
        } else this.foundCodes.set(data.codeResult.code, 1);
        this.getCodeInfo(data.codeResult.code);
      },
      stop() {
        this.getfoundCodes();
        Quagga.offDetected(this.onDetected);
        Quagga.stop();
        this.$refs.quagga.querySelector("video").remove();
        this.$refs.quagga.querySelector("canvas").remove();
      },
      getCodeInfo(code) {
        var getinfoflag = false;
        for (let [key, value] of this.foundCodes) {
          // get data sorted
          console.log(key);
          if (value > 10) {
            getinfoflag = true;
          }
        }
        //console.log('getinfoflag='+ getinfoflag + 'resultCodeInfo=' + this.resultCodeInfo);
        if (getinfoflag && this.resultCodeInfo == "-") {
          console.log("get info...");
          this.resultCodeInfo = "Поиск: " + code;
          axios
            .get(
              `http://barcode-list.ru/barcode/RU/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA.htm?barcode=` +
                code
            )
            .then((response) => {
              // JSON responses are automatically parsed.
              //console.log( response.data );
              //var re = '/<h1 class="pageTitle" style="text-align: center ">(.*)</h1>/';
              var str = response.data;
              var html_start = 'pageTitle" style="text-align: center " >';
              var html_end = "</h2>";
              var startpos = response.data.indexOf(html_start);
              if (startpos != -1) {
                console.log("startpos=" + startpos);
                var str2 = str.substring(startpos, str.length);
                //console.log('zzz='+str2);
                var endpos = str2.indexOf(html_end);
                var result_str = str2.substring(html_start.length, endpos);
                this.resultCodeInfo = result_str;
                //console.log( 'result='+result_str);
              } else this.resultCodeInfo = "Не найден код: " + code;
            })
            .catch((e) => {
              console.log("error=" + e);
              //this.errors.push(e)
            });
        }
      },
      getfoundCodes() {
        this.foundCodes.forEach(function (value, key, map) {
          console.log(map);
          console.log("m[" + key + "] = " + value);
        });
      },

      onLoaded() {
        console.log("load");
      },
    },

    mounted(){
      this.$nextTick(() => {
          Quagga.init(
            {
              inputStream: {
                name: "Live",
                type: "LiveStream",
                target: this.$refs.quagga,
                constraints: {
                  width: {min: 1280},
                  height: {min: 720}, //1200
                  aspectRatio: {min: 1, max: 2},
                  deviceId: 0,
                  facingMode: "environment",
                },
                area: {
                  top: "0%",
                  right: "0%",
                  left: "0%",
                  bottom: "0%",
                },
              },
              debug: true,
              locator: {
                halfSample: true,
                patchSize: "medium", // x-small, small, medium, large, x-large
                debug: {
                  showCanvas: true,
                  showPatches: true,
                  showFoundPatches: true,
                  showSkeleton: true,
                  showLabels: true,
                  showPatchLabels: true,
                  showRemainingPatchLabels: true,
                  boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true,
                  },
                },
              },

              locate: true,

              decoder: {
                readers: ["ean_reader"],
              },
            },
            () => this.start()
          );
        });
      this.$store.dispatch('viewTrackerCount', 'scanbarcode')
  },
}
</script>

<style>
.scanner-wrapper {
  width: 600px;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
}
.camera {
  border: 1px solid red;

  max-width: 640px;
  max-height: 480px;
  display: block;
}
</style>