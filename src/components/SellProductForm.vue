<template>
    <v-container fluid>

        <v-row align="center" justify="center">
            <v-col cols="8"><h1>order no: {{order.id}}</h1></v-col>
        </v-row>
        
            

        <div v-for="order_i in order.orderItems" :key="order_i.id">
            <v-row align="center" justify="center">
                <v-col cols="5">
                    {{ order_i.product.itemdescription }}
                </v-col>
                <v-col cols="5">
                    R {{ order_i.product.price }}
                </v-col>
                <v-col cols="2">
                    <v-text-field
                    v-model="order_i.quantity"
                    ></v-text-field>
                </v-col>
            </v-row>
        </div>     
        

  
        <v-row align="center" justify="center">
            <v-col cols="8">
                <v-btn block type="submit" @click="CheckOut" value="Submit" color="warning" dark>check out</v-btn>
            </v-col>
        </v-row>



    </v-container>
</template>

<script>

  export default {
    components: {
    },
    data: () => ({
        itemquantity: 1,
    }),

    methods: {
      CheckOut(){
        const orderData = {
            order: this.order,
        }
        // update database
        this.$store.dispatch('updateOrderList', orderData)
      },
    },

    computed: {
        barcode_data: {
            get () {
                return this.$store.state.barcode_data
            },
        },
        itemdescription: {
            get () {
                return this.$store.state.itemdescription
            },
            set (value) {
                this.$store.commit('updateitemdescription', value)
            }
        },
        price: {
            get () {
                return this.$store.state.price
            },
            set (value) {
                this.$store.commit('updateprice', value)
            }
        },

        //get the order items for order number 2
        order: {
            get () {
                return this.$store.state.order
            },
            set (value) {
                this.$store.commit('updateorder', value)
            }
        },



    },

    mounted() {
        let order_id = this.$route.params.id
        console.log("order_id2: ", order_id);
    //   this.$store.dispatch('updateRegisterCount', 'laundry register')
    },
  }
</script>