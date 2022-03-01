<template>
  <v-row justify="center" align="center" class="fill-height">
    <v-col v-if="!print">
      <v-card>
        <v-card-title>Students </v-card-title>
        <div
          class="d-flex justify-start flex-column flex-sm-row flex-wrap px-3 py-1"
        >
          <AddStudent />
          <PrintStudents @print="printStudents" />

          <v-spacer />

          <v-text-field
            id="search-bar"
            v-model="search"
            class="flex-grow-1"
            :append-icon="icons.search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </div>
        <v-card-text>
          <v-data-table
            ref="studentsTable"
            :headers="headers"
            :items="students"
            :search="search"
            :items-per-page="5"
          >
            <template #item.actions="{ item }">
              <div :key="item.id">
                <!-- <v-btn icon><v-icon dense>{{icons.pencil}}</v-icon></v-btn> -->
                <v-btn
                  icon
                  :disabled="item.audio === null"
                  @click="playAudio(item)"
                >
                  <v-icon v-if="item.isPlaying" dense>{{ icons.stop }}</v-icon>
                  <v-icon v-else dense>{{ icons.play }}</v-icon>
                </v-btn>
                <RecordDialog :student="item" />
                <DeleteDialog :student="item" />
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-else cols="12">
      <print-content :students="studentsToPrint" />
    </v-col>
    <v-dialog v-model="dialog" max-width="500px">
      <Scanner v-if="dialog" @close="dialog = false" />
    </v-dialog>
  </v-row>
</template>

<script>
import { mdiCamera, mdiMagnify, mdiPencil, mdiPlay, mdiStop } from '@mdi/js'
export default {
  layout: "admin",
  async asyncData({ $axios, $config }) {
    const { data } = await $axios.get(`${$config.apiURL}/api/students`)
    return { students: data }
  },
  data() {
    return {
      audio: {},
      dialog: false,
      studentsToPrint: [],
      print: false,
      search: '',
      headers: [
        {
          text: 'Student ID',
          value: 'id',
          width: '20%',
        },
        {
          text: 'Full Name',
          value: 'name',
        },
        {
          text: 'Grade',
          value: 'grade',
          width: '15%',
        },
        {
          text: 'Section',
          value: 'section',
          width: '10%',
        },
        {
          text: 'Actions',
          value: 'actions',
          align: 'right',
        },
      ],
      icons: {
        pencil: mdiPencil,
        play: mdiPlay,
        stop: mdiStop,
        search: mdiMagnify,
        scan: mdiCamera,
      },
    }
  },
  async fetch() {
    const { data } = await this.$axios.get(
      `${this.$config.apiURL}/api/students`
    )
    this.students = data
  },
  computed: {
    audioPlaying() {
      return this.audio.duration > 0 && !this.audio.paused
    },
  },
  mounted() {
    this.$nuxt.$on('notify', () => {
      this.$nuxt.refresh()
    })
  },
  methods: {
    async playAudio(student) {
      const { audio: audioName } = student
      const indexOfStudent = this.students.findIndex((s) => s.id === student.id)
      try {
        if (student.isPlaying) {
          this.audio.pause()
          student.isPlaying = false
          this.$set(this.students, indexOfStudent, student)
          return
        } else if (this.audioPlaying) {
          this.audio.pause()
        }
        student.isPlaying = true
        this.$set(this.students, indexOfStudent, student)
        this.audio = new Audio(`${this.$config.apiURL}/public/${audioName}`)
        this.audio.load()
        await this.audio.play()
      } catch (error) {
        console.log(error)
      }
    },
    async printStudents(payload) {
      this.print = true
      this.studentsToPrint = payload
      await this.$nextTick()
      window.print()
      this.print = false
    },
    async printIDS() {
      this.print = true
      this.studentsToPrint = this.$refs.studentsTable.$children[0].filteredItems
      await this.$nextTick()
      window.print()
      this.print = false
    },
  },
}
</script>

<style>
#search-bar {
  max-width: 450px;
}
.v-text-field {
  padding: 0;
}
</style>
