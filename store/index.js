import axios from 'axios'

export const state = {
  authUser: false,
  catAnunt: [],
  tipAnunt: []
}

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  setCatAnunt(state, cats) {
    state.catAnunt = cats
  },
  setTipAnunt(state, tips) {
    state.tipAnunt = tips
  }
}

export const actions = {
  nuxtServerInit ({ commit, dispatch }, { req }) {
    console.log('nuxtServerInit')
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
  async getCatAndTipAnunt({ commit }) {
    try {
      let forFilter = await axios.get('/api/datesforadd')
      commit('setCatAnunt', forFilter.data.catAnunt)
      commit('setTipAnunt', forFilter.data.tipAnunt)
    } catch (err) { console.error(err) }
  },
  logout ({ commit }) {
    return axios.post('/api/logout')
      .then(() => {
        commit('SET_USER', null)
      })
  }

}
