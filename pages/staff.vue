<template>
  <v-row justify="center" align="center" class="fill-height">
    <v-col v-if="!print">
      <v-card>
        <v-card-title>Staff Accounts </v-card-title>
        <div
          class="d-flex justify-start flex-column flex-sm-row flex-wrap px-3 py-1"
        >
          <AddStaffForm />

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
            :items="staff"
            :search="search"
            :items-per-page="5"
          >
          <template #item.grade="{item}">
            <span>{{item.section.grade}}</span>
          </template>
          <template #item.section="{item}">
            <span>{{item.section.section}}</span>
          </template>
            <template #item.actions="{ item }">
              <div :key="item.id">
                <!-- <v-btn icon><v-icon dense>{{icons.pencil}}</v-icon></v-btn> -->
                <EditStaffDialog :staff="item" />
                <DeleteStaffDialog :staff="item" />
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
    const { data } = await $axios.get(`${$config.apiURL}/api/users`)
    return { staff: data }
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
          text: 'Full Name',
          value: 'fullName',
          width: '20%',
        },
        {
          text: 'Username',
          value: 'username',
          width: '20%',
        },
        {
          text: 'Grade',
          value: 'grade',
          width: '20%',
        },
        {
          text: 'Section',
          value: 'section',
          width: '20%',
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
      `${this.$config.apiURL}/api/users`
    )
    this.staff = data
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
