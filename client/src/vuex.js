import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      user: null
    }
  },
  mutations: {
    user(state, { user }) {
      state.user = user;
    }
  },
  actions: {
    user({ commit }, user) {
      //console.log('check if executed for login/logout state:', user);
      commit('user', { user });
    }
  }
})

export default store;