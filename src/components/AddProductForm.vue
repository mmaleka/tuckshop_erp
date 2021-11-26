<template>
    <v-container fluid>

        <loading :active.sync="isLoading"
        :can-cancel="true"
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>

        <!-- <label><input type="checkbox" v-model="fullPage">Full page?</label> -->
        <!-- <button @click.prevent="doAjax">fetch Data</button> -->

        <v-row align="center" justify="center">
            <v-col cols="8">
                <ValidationObserver ref="observer" v-slot="{ }">
                    <form>
                    <ValidationProvider v-slot="{ errors }" name="barcode_data" rules="required">
                        <v-text-field
                        v-model="barcode_data"
                        :error-messages="errors"
                        label="barcode"
                        required
                        ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="itemdescription" rules="required">
                        <v-text-field
                        v-model="itemdescription"
                        :error-messages="errors"
                        label="item description"
                        required
                        ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="itemquantity" rules="required">
                        <v-text-field
                        v-model="itemquantity"
                        :error-messages="errors"
                        label="item quantity"
                        required
                        ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="price" rules="required">
                        <v-text-field
                        v-model="price"
                        :error-messages="errors"
                        label="price"
                        required
                        ></v-text-field>
                    </ValidationProvider>

                    <v-btn block type="submit" @click="AddItem" value="Submit" color="warning" dark>add item</v-btn>

                    </form>
                </ValidationObserver>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'


import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
      Loading,
    },
    data: () => ({
        itemquantity: 1,
        isLoading: false,
        fullPage: true,
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      AddItem(e){
          this.$refs.observer.validate()
          e.preventDefault();
            const itemData = {
                barcode: this.barcode_data,
                itemdescription: this.itemdescription,
                itemquantity: this.itemquantity,
                price: this.price,
            }
            // update database
            this.$store.dispatch('addNewItem', itemData)
      },
      doAjax(){
          this.isLoading = true;
          //simulate get request
          setTimeout(() => {
              this.isLoading = false
          },5000)
      },
      onCancel() {
          console.log("user cancelled the loader");
      }
    },

    computed: {
        // ...mapGetters(['barcode_success', 'barcode_data', 'itemdescription', 'price'])
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
    },

    mounted() {
    //   this.$store.dispatch('updateRegisterCount', 'laundry register')
    },
  }
</script>