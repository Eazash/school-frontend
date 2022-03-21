export const state = () => ({
  user: null,
  token: null,
})

export const mutations = {
  login(state, { user, token }) {
    state.user = user
    state.token = token
  },
  logout(state) {
    state.user = null
    state.token = null
  },
}

export const getters = {
  authenticated: (state) => state.token !== null,
  isAdmin: ({ user }) => user !== null && user.role === 'admin',
  isAssistantAdmin: ({user}) => user!== null && user.role === 'assistant-admin',
  section: ({user}) => user === null? null : user.section
}
