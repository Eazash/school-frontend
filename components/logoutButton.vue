<template>
  <v-btn text outline color="primary" @click="logout">
    <v-icon>{{ icons.exit }}</v-icon>
    <span class="mr-1">Logout</span>
  </v-btn>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('logout')
    },
  },
}
</script>

<style></style>
