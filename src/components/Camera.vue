<template>
    <div class="camera">

        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
        
        <video autoplay class="feed"></video>
        <button class="snap" @click="takePicture">SCAN</button>
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
            fullPage: true
        }
    },
    components: {
        Loading
    },
    methods: {
        init () {
            if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {

                let constraints = {

                    video: {
                        width: {
                            min: 1500,
                            ideal: 3600,
                            max: 3600,
                        },
                        height: {
                            min: 2000,
                            ideal: 2600,
                            max: 2600,
                        },
                        facingMode: {
                            exact: 'environment'
                        },
                    },
                    
                }

                navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                    const videoPlayer = document.querySelector("video");
                    videoPlayer.srcObject = stream;
                    videoPlayer.play();
                })
            } else {
                alert("cannot get media Devices")
            }
        },
        takePicture(){
            console.log("taking pic here");
            console.log("take picture");
            let ratio = (window.innerHeight < window.innerWidth) ? 16 / 11 : 11 / 16;  
            const picture = document.querySelector("canvas");
            picture.width = (window.innerWidth < 1280) ? window.innerWidth : 1280;
            picture.height = window.innerWidth / ratio;
            const ctx = picture.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(document.querySelector("video"), 0, 0, picture.width, picture.height)

            const imageFileData = picture.toDataURL('image/jpeg', 1);
            this.$store.dispatch('SendBarcodeImage', { imageFileData })
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
