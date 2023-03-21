// Global State
export const state = () => ({

  user: {

  }

})

// Global Getter (Read Only)
export const getters = {

}

// Global Mutations
export const mutations = {
 LOGIN_USER: (state, payload) => {
    state.user = payload
    console.log('STATE_USER', state.user)
  },
}


export const actions = {
  nuxtServerInit({ state, commit }, { req, res, route, app }) {
  }
}
