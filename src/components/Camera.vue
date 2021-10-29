<template>
    <div class="camera">
        <video autoplay class="feed"></video>
        <button class="snap" v-on:click="$emit('takePicture')">SNAP</button>
    </div>
</template>


<script>
export default {
    name: "camera",
    methods: {
        init () {
            if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {

                let constraints = {
                    video: {
                        width: {
                            min: 640,
                            ideal: 1280,
                            max: 1920,
                        },
                        height: {
                            min: 360,
                            ideal: 360,
                            max: 360,
                        },
                        // facingMode: {
                        //     exact: 'environment'
                        // },
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
        }
    },
    beforeMount (){
        this.init();
    }
}
</script>

<style lang="scss" scoped>
.camera {
    width: 100vw;
    height: 100vh;
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
