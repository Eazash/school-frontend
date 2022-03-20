!
<template>
  <v-row justify="center" align="start">
    <v-col>
      <v-container>
        <v-card
          min-height="50vh"
          max-height="80vh"
          class="scroll"
          :loading="loading"
        >
          <v-card-title>Scan Student IDs</v-card-title>
          <v-divider />
          <v-card-text>
            <v-container>
              <v-row justify="center" align="center">
                <v-col cols="12">
                  <v-text-field
                    ref="input"
                    v-model="input"
                    autofocus
                    :disabled="loading"
                    @keyup.enter="scan"
                  ></v-text-field>
                </v-col>
                <v-col
                  v-for="(student, index) in reversedStudentList"
                  :key="index"
                  cols="12"
                >
                  <ScanResult
                    v-if="found"
                    :student="student"
                    :play="index === 0"
                  />
                </v-col>
                <template v-if="errored">
                  <v-col cols="12">
                    <v-container>
                      <v-alert type="error" class="ma-auto">{{
                        errorMessage
                      }}</v-alert>
                    </v-container>
                  </v-col>
                </template>
              </v-row>
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
      students: [],
      socket: {},
    }
  },
  computed: {
    ...mapGetters(['section']),
    reversedStudentList() {
      return this.students.slice(0).reverse();
    }
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
        this.addStudent(value);
        this.found = true
        this.errored = false
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
        this.addStudent(student)

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
        this.clear()
      }
    },
    addStudent(newStudent) {
      const indexOfExisting = this.students.findIndex(
        (existing) => existing.id === newStudent.id
      )
      if (indexOfExisting !== -1) {
        this.students.splice(indexOfExisting,1);
      }
      this.students.push(newStudent);
    },
    focus() {
      this.$nextTick(this.$refs.input.focus)
    },
    clear() {
      this.$nextTick(this.$refs.input.reset)
    },
  },
}
</script>

<style>
.scroll {
  overflow: scroll;
}
</style>
