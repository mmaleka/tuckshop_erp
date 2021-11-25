<template>
  <div class="home">
    <MyNav />
    <MyHeaderAdd />
    <Camera />
    <BarcodeImage />
    <!-- <ScanBarcode /> -->
    <AddProductForm />
  </div>
</template>

<script>
// @ is an alias to /src
import MyHeaderAdd from '@/components/MyHeaderAdd.vue';
import MyNav from '@/components/MyNav.vue';
import Camera from '@/components/Camera.vue';
import BarcodeImage from '@/components/BarcodeImage.vue';
import AddProductForm from '@/components/AddProductForm.vue';
// import ScanBarcode from '@/components/ScanBarcode';
 
export default {
  name: 'Home',
  components: {
    MyHeaderAdd,
    MyNav,
    Camera,
    BarcodeImage,
    AddProductForm,
    // ScanBarcode,
  },
  methods: {

  },

  mounted(){
    this.$store.commit('updatebarcode_data_type', 'add')
    this.$store.dispatch('viewTrackerCount', 'tuckshop addproduct')
  },
}
</script>


