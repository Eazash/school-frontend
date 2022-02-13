<template>
  <v-app dark>
    <v-app-bar fixed clipped-left dense app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn text router to="/" class="mr-2">
        <v-icon>{{ icons.scan }}</v-icon>
        <span class="mr-1">Scan</span>
      </v-btn>
      <v-btn text router to="/students">
        <v-icon>{{ icons.students }}</v-icon>
        <span class="mr-1">Students</span>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
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
import { mdiAccountGroup, mdiBarcodeScan } from '@mdi/js'
export default {
  data() {
    return {
      icons: {
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
  methods: {
    openSnackbar(event) {
      console.log('heeeere')
      console.log(event)
    },
  },
}
</script>
