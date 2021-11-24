<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="12">

              <div  v-for="order in order_list" :key="order.id">
                  <h1>order no: {{order.id}}</h1>
                  <ul>
                    <li v-for="post in order.orderItems" :key="post.id">
                      {{ post.quantity }} x {{post.product.itemdescription}}
                    </li>
                  </ul>
              </div>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
// import VueJwtDecode from 'vue-jwt-decode';


export default {

data () {
    return {
    }
},
computed: {
    ...mapGetters(['order_list'])
},

mounted() {
    this.$store.dispatch('orderList')
    // this.$store.dispatch('updateRegisterCount', 'laundry register')
},
created() {
    // let user_id = VueJwtDecode.decode(this.$store.getters.userjwt).user_id
    // console.log("user_id: ", user_id);
    // this.fetchCartDetails(user_id);
},


}
</script>