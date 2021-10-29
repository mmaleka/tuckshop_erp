<template>
  <div>
      <p>
          This is the about page
      </p>
  </div>
</template>

<script>
export default {
    name: "About",

    mounted(){
    console.log("login component mounted");
    this.$store.dispatch('viewTrackerCount', 'laundry homepage')
  },
}
</script>

<style>

</style>