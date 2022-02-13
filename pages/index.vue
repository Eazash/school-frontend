!
<template>
  <v-row justify="center" align="start">
    <v-col>
      <v-container>
        <v-card min-height="50vh" max-height="80vh">
          <v-card-title>Scan Student IDs</v-card-title>
          <v-divider />
          <v-card-text>
            <v-container fluid>
              <v-row justify="center" align="center"
                ><v-col>Student will be displayed here</v-col></v-row
              >
              <v-text-field
                ref="input"
                v-model="scanInput"
                autofocus
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
export default {
  data() {
    return {
      scanInput: '',
      found: false,
      errored: false,
      errorMessage: '',
      input: '',
      student: {},
    }
  },
  async mounted() {
    this.focus()
    this.socket = await this.$nuxtSocket({
      name: 'main',
      reconnection: true,
    })
    this.socket.on('scan', (value) => {
      this.input = value
      this.$nextTick(async () => {
        try {
          const { data: student } = await this.$axios.get(
            `${this.$config.apiURL}/api/students/${this.input}`
          )
          this.student = student
          this.found = true
          this.errored = false
        } catch (error) {
          this.$emit('complete')
          if (error.response && error.response.status === 404) {
            this.errorMessage = 'Invalid ID'
          } else {
            this.errorMessage = 'Unknown Error, please refresh the page'
          }
          console.log(error)
          this.errored = true
          this.found = false
        }
      })
    })
  },
  methods: {
    async scan() {
      const input = this.scanInput
      this.scanInput = ''
      await this.$nextTick()
      this.socket.emit('message', input)
      this.focus()
    },
    focus() {
      this.$nextTick(this.$refs.input.focus)
    },
  },
}
</script>

<style></style>
