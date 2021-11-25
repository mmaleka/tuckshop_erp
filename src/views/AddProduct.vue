<template>
  <div class="home">
    <MyNav />
    <MyHeaderAdd />
    <Camera />
    <BarcodeImage />
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
 
export default {
  name: 'Home',
  components: {
    MyHeaderAdd,
    MyNav,
    Camera,
    BarcodeImage,
    AddProductForm,
  },
  methods: {

  },

  mounted(){
    console.log("add product component mounted");
    this.$store.commit('updatebarcode_data_type', 'add')
    this.$store.dispatch('viewTrackerCount', 'tuckshop addproduct')
  },
}
</script>


