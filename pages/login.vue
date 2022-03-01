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
            />
            <v-text-field
              v-model="password"
              label="Password"
              :type="passwordVisible ? 'text' : 'password'"
              dense
              :append-icon="passwordVisible ? icons.hide : icons.show"
              :rules="[required]"
              @click:append="passwordVisible = passwordVisible"
            />
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
import { mdiEye, mdiEyeOff } from '@mdi/js'
export default {
  data() {
    return {
      loading: false,
      valid: false,
      username: '',
      password: '',
      icons: {
        show: mdiEye,
        hide: mdiEyeOff,
      },
      required: (value) => !!value || 'Field is Required',
      passwordVisible: false,
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
        this.$router.push("/")
      } catch (error) {
        if (error.response) {
          const notification = {
            message: error.response.data.message,
            status: error.response.status,
          }

          this.$nuxt.$emit('notify', notification)
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
