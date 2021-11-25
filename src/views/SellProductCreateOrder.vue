<template>
  <div class="home">
    <MyNav />
    <Camera />
    <BarcodeImage />
    <SellProductForm />
  </div>
</template>

<script>
// @ is an alias to /src
import MyNav from '@/components/MyNav.vue';
import Camera from '@/components/Camera.vue';
import BarcodeImage from '@/components/BarcodeImage.vue';
import SellProductForm from '@/components/SellProductForm.vue';

import { mapGetters } from 'vuex';
 
export default {
  name: 'Home',
  components: {
    MyNav,
    Camera,
    BarcodeImage,
    SellProductForm,
  },
  methods: {

  },

  mounted(){
    console.log("sell product create order component mounted");
    let order_id = this.$route.params.id
    console.log("order_id: ", order_id);
    this.$store.commit('updatebarcode_data_type', 'sell');
    this.$store.dispatch('viewTrackerCount', 'tuckshop sellproductcreateorder')
  },

  computed: {
      ...mapGetters(['barcode_data_type']),
  }, 
}
</script>


