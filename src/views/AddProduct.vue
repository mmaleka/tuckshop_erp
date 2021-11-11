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
    console.log("login component mounted");
  },
}
</script>


