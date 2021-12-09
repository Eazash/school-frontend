<template>
  <v-app dark >
    <v-app-bar
      fixed
      dense
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt @notify.capture="openSnackbar"/>
      </v-container>
      <NotificationSnackbar :activator.sync="snackbar" :notify="snackbarContent"/>
    </v-main>
    <v-footer
      :absolute="true"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'Greenland School',
      snackbar: false,
      snackbarContent: {}
    }
  },
  created(){
    this.$nuxt.$on('notify', (event) => {
      this.snackbar = true;
      this.snackbarContent = event;
    })
  },
  methods: {
    openSnackbar(event) {
      console.log("heeeere")
      console.log(event)
    }
  }
}
</script>
