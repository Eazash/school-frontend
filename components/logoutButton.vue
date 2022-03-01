<template>
  <v-btn text outlined color="primary" class="mx-2" @click="logout">
    <v-icon>{{ icons.exit }}</v-icon>
    <span class="mr-1">Logout</span>
  </v-btn>
</template>

<script>
import { mdiExitToApp } from '@mdi/js'
export default {
  data() {
    return {
      icons: {
        exit: mdiExitToApp,
      },
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout')
    },
  },
}
</script>

<style></style>
