<template>
  <v-app dark>
    <v-navigation-drawer app clipped>
      <v-list dense nav>
        <v-list-item router to="/">
          <v-list-item-icon
            ><v-icon>{{ icons.scan }}</v-icon></v-list-item-icon
          >
          <v-list-item-content>
            <v-list-item-title>Scan</v-list-item-title>
          </v-list-item-content></v-list-item
        >
        <v-list-item router to="/students">
          <v-list-item-icon
            ><v-icon>{{ icons.students }}</v-icon></v-list-item-icon
          >

          <v-list-item-content>
            <v-list-item-title>Students</v-list-item-title>
          </v-list-item-content></v-list-item
        >
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed clipped-left dense app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
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
