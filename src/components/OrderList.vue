<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="8">
                <v-btn block type="submit" @click="createNewOrder" value="Submit" color="teal" dark>start new order</v-btn>
            </v-col>
        </v-row>
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



  export default {

    data () {
      return {
      }
    },
    methods: {
      createNewOrder(){
        this.$store.dispatch('createNewOrder')
      }
    },
    computed: {
        ...mapGetters(['order_list'])
    },

    mounted() {
      this.$store.dispatch('orderList')
    //   this.$store.dispatch('updateRegisterCount', 'laundry register')
    },
  }
</script>