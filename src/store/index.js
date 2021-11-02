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
      baseURL: 'http://192.168.43.120:8080/',
      // baseURL: 'https://try-coding.herokuapp.com/',
    },
    loggedIn: '',
    registered: '',
    categories_data: [],
    products_data: [],
    product_detail_data: [],
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
    

  },
  getters: {
    isLoggedIn: state => !!state.jwt,
    userName: state => state.username2,
    userjwt: state => state.jwt,
    userName1: state => state.username,
    loggedIn: state => state.loggedIn,

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


    async SendBarcodeImage({ commit }, barcode_data) {
      console.log("commit: ", commit);
      // console.log("barcode_data: ", barcode_data.imageFileData);

      const url = this.state.endpoints.baseURL + 'api-barcodedetection/barcodedetection/'
      axios.post(url, {
        image_bytes: barcode_data.imageFileData,
      })
        .then(res_decodebarcodeimage => {
          console.log(res_decodebarcodeimage);
          alert('success')
          // Vue.$toast.open("Thank soon", {
          //   timeout: 4000
          // });
        })
        .catch(err => {
          console.error(err)
          alert(err)
        });

    },




  

  },
  modules: {
  }
})
