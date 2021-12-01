<template>
  <div class="home">
    <MyNav />
    <OrderList />
    <!-- <Camera />
    <BarcodeImage /> -->
    
  </div>
</template>

<script>
// @ is an alias to /src
import MyNav from '@/components/MyNav.vue';
import OrderList from '@/components/OrderList.vue'
// import Camera from '@/components/Camera.vue';
// import BarcodeImage from '@/components/BarcodeImage.vue';
 
export default {
  name: 'Home',
  components: {
    MyNav,
    OrderList,
    // Camera,
    // BarcodeImage,
  },
  methods: {

  },

  mounted(){
    console.log("login component mounted");
    this.$store.dispatch('viewTrackerCount', 'tuckshop sellproducthome')
  },
}
</script>


