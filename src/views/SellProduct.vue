<template>
  <div class="home">
    <MyNav />
    <MyHeaderSell />
    <Camera />
    <BarcodeImage />
  </div>
</template>

<script>
// @ is an alias to /src
import MyHeaderSell from '@/components/MyHeaderSell.vue';
import MyNav from '@/components/MyNav.vue';
import Camera from '@/components/Camera.vue';
import BarcodeImage from '@/components/BarcodeImage.vue';
 
export default {
  name: 'Home',
  components: {
    MyHeaderSell,
    MyNav,
    Camera,
    BarcodeImage,
  },
  methods: {

  },

  mounted(){
    console.log("login component mounted");
  },
}
</script>


