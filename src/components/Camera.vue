<template>
    <div class="camera">

        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
        
        <video autoplay class="feed"></video>
        <button class="snap" @click="startscan">SCAN THIS</button>
    </div>
</template>


<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { mapGetters } from 'vuex';

export default {
    
    name: "camera",
    data() {
        return {
            fullPage: true,
        }
    },
    components: {
        Loading,
    },
    methods: {
        init () {
            if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
                let constraints = {
                    video: {
                        // width: {min: 640}, //640
                        // height: {min: 1200}, //1200
                        width: {
                            min: 1500,
                            ideal: 2500,
                            max: 2500,
                        },
                        height: {
                            min: 2000,
                            ideal: 2600,
                            max: 2600,
                        },
                        facingMode: "environment",
                        // facingMode: {
                        //     exact: 'environment'
                        // },
                    },
                    
                }
                navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                    const videoPlayer = document.querySelector("video");
                    videoPlayer.srcObject = stream;
                    videoPlayer.play();
                    console.log("---****----");
                })
            } else {
                alert("cannot get media Devices")
            }
        },
        startscan(){
            this.$store.dispatch('scanBarcode')
        },

        onCancel() {
            console.log('User cancelled the loader.')
        }

    },
    computed: {
        ...mapGetters(['isLoading'])
    },
    beforeMount (){
        this.init();
    }
}
</script>

<style lang="scss" scoped>
.camera {
    width: 100vw;
    // height: 50vh;
    padding: 25px;
    box-sizing: border-box;
    
    
    .feed {
        display: black;
        width: 100%;
        max-width:1280px;

        margin: 0 auto;

        background-color: #171717;
        box-shadow: 6px 6px 12px 8px rgba(0, 0, 0, 0.35); 
    }

    .snap {
        display: block;
        width: 75px;
        height: 75px;
        border-radius: 50%;

        margin: 25px auto;

        background-color: transparentize($color: #ffce00, $amount: 0.5);
        border: 1px solid #171717;
        outline: none;

        cursor: pointer;

        &:hover {
            background-color: #ffce00;
        }
        &:active {
            background-color: darken($color: #ffce00, $amount: 10);
        }
    }

}
</style>
