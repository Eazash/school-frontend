!
<template>
  <v-row justify="center" align="start">
    <v-col>
      <v-container>
        <v-card min-height="50vh" max-height="80vh" :loading="loading">
          <v-card-title>Scan Student IDs</v-card-title>
          <v-divider />
          <v-card-text>
            <v-container fluid>
              <v-row justify="center" align="center"
                ><v-col>Student will be displayed here</v-col></v-row
              >
              <v-text-field
                ref="input"
                v-model="input"
                autofocus
                :disabled="loading"
                @keyup.enter="scan"
              ></v-text-field>
              <ScanResult v-if="found" :student="student" />
              <template v-if="errored">
                <v-container>
                  <v-alert type="error" class="ma-auto">{{
                    errorMessage
                  }}</v-alert>
                </v-container>
              </template>
            </v-container>
          </v-card-text>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { io } from 'socket.io-client'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      scanInput: '',
      found: false,
      errored: false,
      errorMessage: '',
      input: '',
      student: {},
      socket: {},
    }
  },
  computed: {
    ...mapGetters(['section']),
  },
  mounted() {
    this.focus()
    if (this.section === null) {
      this.$nuxt.$emit('notify', {
        message: 'Error with assigned section. Please try reassigning section',
        status: 400,
      })
      return
    }
    this.socket = io(this.$config.apiURL)
    this.socket.emit(
      'attachToClass',
      `${this.section.grade}:${this.section.section}`
    )
    this.socket.on('result', (value) => {
      this.$nextTick(() => {
        this.student = value;
        this.found = true;
        this.errored = false;
      })
    })
  },
  methods: {
    async scan() {
      this.loading = true
      try {
        const { data: student } = await this.$axios.get(
          `${this.$config.apiURL}/api/students/${this.input}`
        )
        console.log(student)
        this.student = student
        this.socket.emit('scan', student)
        this.found = true
        this.errored = false
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorMessage = 'Invalid ID'
        } else {
          this.errorMessage = 'Unknown Error, please refresh the page'
        }
        console.log(error)
        this.errored = true
        this.found = false
      } finally {
        this.loading = false
        this.focus()
      }
    },
    focus() {
      this.$nextTick(this.$refs.input.focus)
    },
  },
}
</script>

<style></style>
