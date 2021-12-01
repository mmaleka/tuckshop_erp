<template>
<div>

  <div class="scanner_wrapper">
    <v-row
      align="center"
      justify="space-around"
      class="pa-4"
    >
      <v-btn
        depressed
        color="primary"
        @click="startScanner"
      >
        Start
      </v-btn>
      <v-btn
        depressed
        color="error"
        @click="stop"
      >
        Stop
      </v-btn>
    </v-row>
    <!-- <BR/> <span>{{resultcode}}</span> -->

    <loading :active.sync="isLoading" 
    :can-cancel="true" 
    :on-cancel="onCancel"
    :is-full-page="fullPage"></loading>
    
    <div ref="quagga" class="camera" />
  </div>


</div> 
</template>

<script>

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import { mapGetters } from 'vuex';

import Quagga from 'quagga';
import axios from 'axios';
export default {
  data: () => ({ 
    data: null, 
    resultcode: "-",
    resultCodeInfo: "-",
    foundCodes: new Map(),
    fullPage: true
    }),

  components: {
      Loading
  },
 
  mounted () {
    // this.$nextTick(() => {
    //   Quagga.init({
    //       inputStream : {
    //       name : "Live",
    //       type : "LiveStream",
    //       target: this.$refs.quagga,
    //        constraints: {
    //         width: {min: 640}, //640
    //         height: {min: 480}, //1200

    //         // width: {
    //         //     min: 1500,
    //         //     ideal: 3600,
    //         //     max: 3600,
    //         // },
    //         // height: {
    //         //     min: 2000,
    //         //     ideal: 2600,
    //         //     max: 2600,
    //         // },

    //         aspectRatio: {min: 1, max: 2},
    //         deviceId: 0,
    //         facingMode: "environment",
    //         },
    //         area: {
    //             top: "0%",
    //             right: "0%",
    //             left: "0%",
    //             bottom: "0%",
    //         },
         
    //     },
    //     debug: true,
    //     locator: {
    //       halfSample: true,
    //       patchSize: "medium", // x-small, small, medium, large, x-large
    //       debug: {
    //         showCanvas: true,
    //         showPatches: true,
    //         showFoundPatches: true,
    //         showSkeleton: true,
    //         showLabels: true,
    //         showPatchLabels: true,
    //         showRemainingPatchLabels: true,
    //         boxFromPatches: {
    //           showTransformed: true,
    //           showTransformedBox: true,
    //           showBB: true
    //         }
    //       }
    //     },
  
    //         locate: true,

    //     decoder : {
    //       readers : ["ean_reader"],
          
    //     },
         
    //   },
    //   () => this.start())
    // })
  },
  methods: {
    start() {
      Quagga.onDetected(this.onDetected)
      Quagga.start() 
      console.log('Quagga started!')
      //this.getCodeInfo('46020480032')
    },

    onCancel() {
      console.log('User cancelled the loader.')
    },

    startScanner() {
      this.$store.dispatch('ResetBarcodedata');
      Quagga.init({
          inputStream : {
          name : "Live",
          type : "LiveStream",
          target: this.$refs.quagga,
           constraints: {
            // width: {min: 640}, //640
            // height: {min: 480}, //1200

            width: {min: 640}, //640
            height: {min: 1200}, //1200

            // width: {
            //     min: 640,
            //     ideal: 1000,
            //     max: 1000,
            // },
            // height: {
            //     min: 1200,
            //     ideal: 1500,
            //     max: 1500,
            // },

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
              showBB: true
            }
          }
        },
  
            locate: true,

        decoder : {
          readers: ["ean_reader"]
          
        },
         
      },
      () => this.start())
    },

    onDetected(data) {
          this.data = data
          this.resultcode = data.codeResult.code + ' - ' + data.codeResult.startInfo.error
          console.log("data.codeResult.startInfo.error: ", data.codeResult.startInfo.error);
          if (data.codeResult.startInfo.error <= 10) {
            const barcode_result = data.codeResult.code
            this.$store.commit('updateBarcode', barcode_result)
            this.$store.dispatch('CheckBarcodedata', { barcode_result })
          }
          
          if (this.foundCodes.has(data.codeResult.code)) {
            var val = this.foundCodes.get(data.codeResult.code);
            val++;
            this.foundCodes.set(data.codeResult.code, val);
          } else this.foundCodes.set(data.codeResult.code, 1);
          this.getCodeInfo(data.codeResult.code)
    },
    stop() {
      console.log('Quagga stopped!')
      // this.getfoundCodes();
      Quagga.offDetected(this.onDetected)
      Quagga.stop()
      // this.$refs.quagga.querySelector('video').remove()
      // this.$refs.quagga.querySelector('canvas').remove()
      },
    getCodeInfo(code) {
        var getinfoflag = false;       
        for (let [key, value] of this.foundCodes) {     // get data sorted
            if (value > 10) {getinfoflag = true}
            console.log(key);
        } 
        //console.log('getinfoflag='+ getinfoflag + 'resultCodeInfo=' + this.resultCodeInfo);
        if (getinfoflag && this.resultCodeInfo=='-')
          {
              console.log('get info...');
              this.resultCodeInfo = 'Поиск: '+code;
              axios.get(`http://barcode-list.ru/barcode/RU/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA.htm?barcode=`+code)
                    .then(response => {
                      // JSON responses are automatically parsed.
                    //console.log( response.data );
                    //var re = '/<h1 class="pageTitle" style="text-align: center ">(.*)</h1>/';
                    var str = response.data;
                    var html_start = 'pageTitle" style="text-align: center " >';
                    var html_end = '</h2>'; 
                    var startpos = response.data.indexOf(html_start);
                    if (startpos!=-1) {
                        console.log('startpos='+startpos); 
                        var str2 = str.substring(startpos, str.length);
                        //console.log('zzz='+str2);
                        var endpos = str2.indexOf(html_end);
                        var result_str = str2.substring(html_start.length, endpos);
                        this.resultCodeInfo = result_str;   
                        //console.log( 'result='+result_str);
                      } else this.resultCodeInfo = 'Не найден код: '+code; 
                    })
                    .catch(e => {
                      console.log('error=' + e); 
                      //this.errors.push(e)
                    })
          }
      },
      getfoundCodes() {
       this.foundCodes.forEach( function(value, key, map) {
          console.log("m[" + key + "] = " + value);
          console.log(map);
       })
                
      },

  },
  computed: {
      ...mapGetters(['isLoading'])
  },

}
</script>

<style lang="scss" scoped>
.scanner-wrapper {
  width: 600px;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
}
.camera {
  border: 1px solid red;
  
  width: 100%;
  display: none;

}

</style>
