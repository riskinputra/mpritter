
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import jwtDecode from 'jwt-decode'

const http = axios.create({
  baseURL: 'http://localhost:3005'
})
Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    tweets: []
  },
  mutations: {
    setTweets (state, payload) {
      state.tweets = payload
    },
    addPost (state, payload) {
      state.tweets.push(payload)
    }
  },
  actions: {
    userSignup ({ commit }, payload) {
      console.log(payload)
      http.post('/api/signup', payload)
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => console.error(err))
    },
    userSignin ({ commit }, payload) {
      console.log(payload)
      http.post('/api/signin', payload)
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data.token)
          location.reload()
        })
        .catch(err => console.error(err))
    },
    getTweets ({ commit }) {
      http.get('/api/tweets')
        .then(({ data }) => {
          console.log(data.data)
          commit('setTweets', data.data)
        })
        .catch(err => console.error(err))
    },
    postTweet ({ commit }, payload) {
      // console.log(payload)
      http.post('/api/tweets', {post: payload.tweet}, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('addPost', data.data)
        })
        .catch(err => console.error(err))
    }
  }
})
