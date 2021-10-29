<template>
  <div class="home">
    <MyNav />
    <MyHeader />
    <Camera v-on:takePicture="this.takePicture"/>
    <BarcodeImage />
  </div>
</template>

<script>
// @ is an alias to /src
import MyHeader from '@/components/MyHeader';
import MyNav from '@/components/MyNav';
import Camera from '@/components/Camera.vue';
import BarcodeImage from '@/components/BarcodeImage.vue';
 
export default {
  name: 'Home',
  components: {
    MyHeader,
    MyNav,
    Camera,
    BarcodeImage,
  },
  methods: {
    takePicture(){
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
      console.log(imageFileData);
    },
  },

  mounted(){
    console.log("login component mounted");
    // this.$store.dispatch('viewTrackerCount', 'laundry homepage')
  },
}
</script>


