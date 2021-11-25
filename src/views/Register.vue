<template>
  <div>
      <RegisterComp />
  </div>
</template>

<script>
import RegisterComp from '@/components/RegisterComp';


export default {
  name: 'Register',
  components: {
    RegisterComp,
  },

  mounted(){
    this.$store.dispatch('viewTrackerCount', 'tuckshop register')
  },
}
</script>

<style>

</style>