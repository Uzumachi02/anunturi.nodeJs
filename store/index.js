import axios from 'axios'

export const state = {
  authUser: false
}

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    console.log('nuxtServerInit', req.session.authUser)
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  async login ({ commit }, { login, password }) {
    try {
      console.log('login')
      let ress = await axios.post('/api/logare', {login, password})
      if( ress.data.status === 'success' ) {
        commit('SET_USER', ress.data.user)
      }
      console.log(ress.data)
    } catch (err) {
      console.error(err)
    }
  },

  logout ({ commit }) {
    return axios.post('/api/logout')
      .then(() => {
        commit('SET_USER', null)
      })
  }

}
