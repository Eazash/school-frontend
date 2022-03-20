import createPersistedState from 'vuex-persistedstate'

export default ({ app, store }) => {
  createPersistedState({
    storage: {
      getItem: (key) => app.$cookies.get(key),
      setItem: (key, value) => {
        app.$cookies.set(key, value, {
          maxAge: 60 * 60 * 24 * 7,
          secure: true,
        })
      },
      removeItem: (key) => app.$cookies.remove(key),
    },
  })(store)
}
