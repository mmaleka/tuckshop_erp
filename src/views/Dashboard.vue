<template>
  <div class="Dashboard">
    <Table />
  </div>
</template>

<script>
import Table from '@/components/Table.vue';

export default {
    name: 'Dashboard',
    components: {
        Table,
    },
    mounted(){
        console.log("dashboard app mounted");
        this.$store.dispatch('viewTrackerCount', 'tuckshop dashboard')
    },

}
</script>

<style>

</style>