<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-divider class="ma-2" />
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              v-model="username"
              label="Username"
              :rules="[required]"
              dense
              outlined
            />
            <PasswordField :value.sync="password" label="Password"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            elevation="0"
            class="px-4 py-2"
            :disabled="!valid || loading"
            :loading="loading"
            @click="login"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      valid: false,
      username: '',
      password: '',
      required: (value) => !!value || 'Field is Required',
    }
  },
  methods: {
    async login() {
      this.loading = true
      try {
        const { data } = await this.$axios.post(
          `${this.$config.apiURL}/api/users/login`,
          { username: this.username, password: this.password }
        )
        this.$store.commit('login', data)
        if (data.user.role === 'admin') {
          this.$router.push('/students')
        } else {
          this.$router.push('/')
        }
      } catch (error) {
        console.dir(error)
        if (error.response) {
          const notification = {
            message: error.response.data.message,
            status: error.response.status,
          }
          this.$nuxt.$emit('notify', notification)
        } else {
          this.$nuxt.$emit('notify', { message: error.message, status: 500 })
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
