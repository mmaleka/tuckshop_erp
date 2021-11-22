import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index.js'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    authorization: '',
    jwt: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    username2: '',
    endpoints: {
      obtainJWT: 'api-food_delivery/api/token/',
      refreshJWT: 'api-food_delivery/api/token/refresh/',
      // baseURL2: 'http://192.168.2.120:8080/',
      baseURL2: 'https://try-coding.herokuapp.com/',
      baseURL: 'https://nameless-escarpment-12330.herokuapp.com/https://dj-docker2.herokuapp.com/',
    },
    loggedIn: '',
    registered: '',
    categories_data: [],
    products_data: [],
    product_detail_data: [],
    barcode_success: '',
    barcode_data: '',
    itemdescription: '',
    stockitemquantity: '',
    price: '',
    alreadyexists: false,
    order_list: [],
    order: [],
    barcode_data_type: '',
    new_order_id: '',
  },
  mutations: {
    updateToken(state, newToken) {
      localStorage.setItem('token', newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      localStorage.removeItem('token');
      state.jwt = null;
    },
    updateUsername(state, username) {
      localStorage.setItem('username', username);
      state.jwt = username;
    },
    loginSuccess(state, username) {
      state.loggedIn = true;
      state.username = username;
      state.jwt = localStorage.getItem('token');
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.username = null;
    },
    registerSuccess(state) {
      state.registered = true;
      state.jwt = localStorage.getItem('token');
    },
    registerFailure(state) {
      state.registered = false;
    },
    nullShit() {
    },
    authHeader(state) {
      let token = localStorage.getItem('token');
      let username = localStorage.getItem('username');
      if (username && token) {
        state.authorization = 'Bearer ' + token
      } else {
        state.authorization = '';
      }
    },
    updateitemdescription(state, value) {
      state.itemdescription = value
    },
    updateprice(state, value) {
      state.price = value
    },
    updateorder(state, value) {
      state.order = value
    },
    updatebarcode_data_type(state, value) {
      state.barcode_data_type = value
    },


  },
  getters: {
    isLoggedIn: state => !!state.jwt,
    userName: state => state.username2,
    userjwt: state => state.jwt,
    userName1: state => state.username,
    loggedIn: state => state.loggedIn,
    barcode_success: state => state.barcode_success,
    barcode_data: state => state.barcode_data,
    itemdescription: state => state.itemdescription,
    stockitemquantity: state => state.stockitemquantity,
    price: state => state.price,
    order_list: state => state.order_list,
    order: state => state.order,
    barcode_data_type: state => state.barcode_data_type,
    new_order_id: state => state.new_order_id,
  },
  actions: {
    obtainToken({ commit }, user) {
      const username = user.username
      console.log("user: ", user);
      axios.post(this.state.endpoints.baseURL + this.state.endpoints.obtainJWT, user)
        .then((res) => {
          commit('updateToken', res.data.access);
          commit('updateUsername', username);
          const token = res.data.token;
          axios.defaults.headers.common['Authorization'] = token
          this.state.username2 = username
          commit('loginSuccess', username)
          router.push('/');
          console.log("token: ", token);
          Vue.$toast.open("Login successful", {
            timeout: 2000
          });
        })
        .catch(err => {
          commit('loginFailure')

          if (err.response.data.username) {
            Vue.$toast.error(err.response.data.username[0], {
              timeout: 2000
            });
          } else if (err.response.data.email) {
            Vue.$toast.error(err.response.data.email[0], {
              timeout: 2000
            });
          } else if (err.response.data.password) {
            Vue.$toast.error(err.response.data.password[0], {
              timeout: 2000
            });
          } else if (err.response.data.detail) {
            Vue.$toast.error(err.response.data.detail, {
              timeout: 2000
            });
          } else {
            Vue.$toast.error(err.response.data, {
              timeout: 2000
            });
          }


        })
    },
    newRegister({ commit }, registerdata) {
      const { username, first_name, email, password, password_confirm } = registerdata;
      axios.post(this.state.endpoints.baseURL + 'api-food_delivery/auth/accounts/register/', {
        username,
        first_name,
        email,
        password,
        password_confirm
      })
        .then(resUser => {
          console.log("can register");
          this.dispatch('obtainToken', { username, password });
          this.state.username2 = username;
          let res_user_id = resUser.data.id
          console.log("res_user_id: ", res_user_id);
          this.dispatch('updateUserProfile', { res_user_id });
          commit('registerSuccess');
          // router.push('/');
          Vue.$toast.open("Registration successful", {
            timeout: 2000
          });
        })
        .catch(err => {
          this.commit('registerFailure')
          console.log("err: ", err);

          if (err.response.data.username) {
            Vue.$toast.error(err.response.data.username[0], {
              timeout: 2000
            });
          } else if (err.response.data.email) {
            Vue.$toast.error(err.response.data.email[0], {
              timeout: 2000
            });
          } else if (err.response.data.password) {
            Vue.$toast.error(err.response.data.password[0], {
              timeout: 2000
            });
          } else if (err.response.data.password_confirm) {
            Vue.$toast.error(err.response.data.password_confirm[0], {
              timeout: 2000
            });
          } else {
            Vue.$toast.error(err.response.data, {
              timeout: 2000
            });
          }
        })
    },


    async updateUserProfile({ commit }, res_user_id) {
      commit('nullShit');
      let user_id = res_user_id.res_user_id
      console.log("user_id: ", user_id);
      let url_profileUpdate = this.state.endpoints.baseURL + 'api-accounts_profile/accounts_profile/'
      axios.post(url_profileUpdate, {
        user: user_id,
        tag: "tucksop go digital"
      })
        .then(res => {
          console.log("res_adding_profile: ", res);
        })
        .catch(err => {
          console.log("err_adding_profile: ", err);
        })
    },



    async updateRegisterCount({ commit }, val) {
      console.log(commit);
      await axios
        .post(this.state.endpoints.baseURL + 'api-analytics/api_register_count/', {
          views_count: 1,
          ip_address: val
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.error(err));
    },


    async viewTrackerCount({ commit }, val) {
      console.log(commit);
      await axios
        .post(this.state.endpoints.baseURL + 'api-analytics/api_viewtrackercount/', {
          views_count: 1,
          view_type: val
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.error(err));
    },

    async GetBarcodeData({ commit }, barcode_info) {
      console.log(barcode_info, commit);
      // barcode_info = 456789
      const url_get_barcode = this.state.endpoints.baseURL2 + 'api-tuckshoppos/checkitem/?barcode_search=' + barcode_info

      if (barcode_info != "no detection") {
        await axios.get(url_get_barcode)
          .then(res => {
            // now add this data to the productform
            if (res.data[0] != null) {
              this.state.itemdescription = res.data[0]['itemdescription'];
              this.state.price = res.data[0]['price'];
              this.state.stockitemquantity = res.data[0]['stockitemquantity'];
              this.state.alreadyexists = true

            } else {
              this.state.alreadyexists = false
            }

            // add this to order items
            if (this.state.barcode_data_type == "sell") {
              console.log("adding data to order item list");
              const order_id = this.state.new_order_id
              console.log("order_id----: ", order_id);
              // 1.get the order id ==> this.state.order
              // 2.get the product id ==> res.data[0].id
              // 3.defualt quantity is one.

              const url = this.state.endpoints.baseURL2 + "api-tuckshoppos/add_order_items/"
              axios.post(url, {
                Order: order_id,
                product: res.data[0].id
              })
                .then(res => {
                  console.log(res);
                  this.dispatch('getIncompleteOrderList', { order_id });
                })
                .catch(err => {
                  console.error(err)
                });

            }

          })
          .catch(err => {
            console.error(err)
            alert(err)
          });
      }
      

    },


    async SendBarcodeImage({ commit }, barcode_data) {
      console.log("commit: ", commit);
      this.state.barcode_data = '';
      this.state.itemdescription = '';
      this.state.stockitemquantity = '';
      this.state.price = '';

      const url = this.state.endpoints.baseURL + 'api-barcodedetection/barcodedetection/'
      axios.post(url, {
          image_bytes: barcode_data.imageFileData,
        })
        .then(res_decodebarcodeimage => {
          console.log(res_decodebarcodeimage.data['success']);
          console.log(res_decodebarcodeimage.data['barcode']);
          let barcode_info = res_decodebarcodeimage.data['barcode']

          this.state.barcode_success = res_decodebarcodeimage.data['success'];
          this.state.barcode_data = barcode_info;
          alert(barcode_info)
          this.dispatch('GetBarcodeData', { barcode_info });
        })
        .catch(err => {
          console.error(err)
          alert(err)
        });

    },


    async addNewItem({ commit }, itemData) {
      console.log("commit: ", commit);
      const url = this.state.endpoints.baseURL2 + 'api-tuckshoppos/additem/'
      alert(this.state.alreadyexists)
      if (this.state.alreadyexists == false) {
        axios.post(url, {
          itemdescription: itemData['itemdescription'],
          stockitemquantity: parseInt(itemData['itemquantity']) + parseInt(this.state.stockitemquantity),
          price: itemData['price']
        })
          .then(res => {
            console.log(res.data);
            alert(res.data)
          })
          .catch(err => {
            console.error(err)
            alert(err)
          });
      } else {
        axios.post(url, {
          barcode_data: this.state.barcode_data,
          itemdescription: itemData['itemdescription'],
          stockitemquantity: parseInt(itemData['itemquantity']) + parseInt(this.state.stockitemquantity),
          price: itemData['price']
        })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.error(err)
          });
      }
    },


    async orderList({ commit }) {
      console.log("commit: ", commit);
      var url_get_orderlist = this.state.endpoints.baseURL2 + 'api-tuckshoppos/order_list/?user_id=' + 1
      axios.get(url_get_orderlist)
        .then(res => {
          this.state.order_list = res.data
        })
        .catch(err => {
          console.error(err)
          alert(err)
        });
    },



    async createNewOrder({ commit }) {
      console.log("commit: ", commit);
      //add new order to database and prepare for adding items
      const url = this.state.endpoints.baseURL2 + 'api-tuckshoppos/generate_order/'
      axios.post(url, {
              shopName: 1,
              commentOrderdata: "this field is useless"
      })
        .then(res => {
          console.log(res.data);
          var order_id = res.data.id
          this.dispatch('getOrderList', { order_id });
          router.push('/sellproductcreateorder/' + order_id);
        })
        .catch(err => {
          console.error(err)
          alert(err)
        });

    },


    async getIncompleteOrderList({ commit }, order_id) {
      console.log("commitincompelte: ", commit);
      console.log("order_idincomplete: ", order_id.order_id);

      //get the order items for order number 2
      const params = {
        user_id: 1,
        order_id: order_id.order_id,
        completed: "False",
      };
      const url = this.state.endpoints.baseURL2 + 'api-tuckshoppos/order_list/'
      axios.get(url, { params })
        .then(response => {
          console.log("response100: ", response.data);
          // now update the order_items state
          if (response.data.length > 0) {
            this.state.order = response.data[0]
            this.state.new_order_id = order_id.order_id
          } else {
            this.state.order = []
            this.state.new_order_id = order_id.order_id
            console.log("this.state.new_order_id: ", this.state.new_order_id);
          }

        })
        .catch(err => console.warn(err));

    },



    async getOrderList({ commit }, order_id) {
      console.log("commit100: ", commit);
      console.log("order_id100: ", order_id.order_id);

      //get the order items for order number 2
      const params = {
        user_id: 1,
        order_id: 152,
      };
      const url = this.state.endpoints.baseURL2 + 'api-tuckshoppos/order_list/'
      axios.get(url, { params })
      .then(response => {
        console.log("response100: ", response.data);
        // now update the order_items state
        if (response.data.length > 0) {
          this.state.order = response.data[0]
          this.state.new_order_id = order_id.order_id
        } else {
          this.state.order = []
          this.state.new_order_id = order_id.order_id
          console.log("this.state.new_order_id: ", this.state.new_order_id);
        }
        
      })
      .catch(err => console.warn(err));

    },

    async updateOrderList({ commit }, order_id) {
      console.log("commit200: ", commit);
      console.log("order_id200: ", order_id, this.state.new_order_id);
      console.log("---: ", this.state.order.orderItems);

      // update the order to completed to appear
      const url = this.state.endpoints.baseURL2 + 'api-tuckshoppos/order_rud/' + this.state.new_order_id + '/'
      axios.patch(url, {
        completed: true,
      })
        .then(res => {
          console.log("res: ", res);
        })
        .catch(err => console.log(err))



      // loop through the order items and edit the quantity
      for (let i = 0; i < this.state.order.orderItems.length; i++) {
        console.log("xxx: ", this.state.order.orderItems[i].id, this.state.order.orderItems[i].quantity);

        const url = this.state.endpoints.baseURL2 + 'api-tuckshoppos/order_item_rud/' + this.state.order.orderItems[i].id+'/'
        axios.patch(url, {
          quantity: this.state.order.orderItems[i].quantity,
        })
        .then(res => {
          console.log("res: ", res);
        })
        .catch(err => console.log(err))
      }

      router.push('/');

    },
  

  },
  modules: {
  }
})
