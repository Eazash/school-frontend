<template>
  <v-app dark>
    <v-app-bar fixed clipped-left dense app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <template v-if="authenticated">
        <v-btn text router to="/" class="mr-2">
          <v-icon>{{ icons.scan }}</v-icon>
          <span class="mr-1">Scan</span>
        </v-btn>
        <LogoutButton />
      </template>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height">
        <Nuxt @notify.capture="openSnackbar" />
      </v-container>
      <NotificationSnackbar
        :activator.sync="snackbar"
        :notify="snackbarContent"
      />
    </v-main>
    <v-footer :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mdiAccountGroup, mdiBarcodeScan, mdiExitToApp } from '@mdi/js'
import { mapGetters } from 'vuex'
export default {
  middleware: ['auth'],
  data() {
    return {
      icons: {
        exit: mdiExitToApp,
        scan: mdiBarcodeScan,
        students: mdiAccountGroup,
      },
      title: 'Greenland School',
      snackbar: false,
      snackbarContent: {},
    }
  },
  created() {
    this.$nuxt.$on('notify', (event) => {
      this.snackbar = true
      this.snackbarContent = event
    })
  },
  computed: {
    ...mapGetters(['authenticated']),
  }
}
</script>
