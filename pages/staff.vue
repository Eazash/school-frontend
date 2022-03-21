<template>
  <v-row justify="center" align="start" class="fill-height">
    <v-col cols="12">
      <v-card>
        <v-card-title>Assistant Admin Account</v-card-title>
        <v-container>
          <v-form v-model="nameValid">
            <v-row justify="space-around" align="start" no-gutters>
              <v-col cols="6">
                <v-text-field
                  v-model="assistantFullName"
                  dense
                  label="Assistant's Name"
                  outlined
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="my-1">
                <v-btn
                  class="action-card"
                  outlined
                  color="primary"
                  :disabled="!nameValid || assistantId === null"
                  :loading="assistantNameLoading"
                  @click.stop="updateName"
                >
                  Update Name
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-form v-model="passwordValid">
            <v-row justify="space-around" align="start" no-gutters>
              <v-col cols="6">
                <v-text-field
                  v-model="assistantPassword"
                  dense
                  label="Password"
                  outlined
                  type="password"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="my-1">
                <v-btn
                  class="action-card"
                  outlined
                  color="primary"
                  :disabled="assistantPassword.length <=0 || assistantId === null"
                  :loading="assistantPasswordLoading"
                  @click.stop="updatePassword"
                >
                  Update Password
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12">
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
            <template #item.grade="{ item }">
              <span>{{ item.section.grade }}</span>
            </template>
            <template #item.section="{ item }">
              <span>{{ item.section.section }}</span>
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
  </v-row>
</template>

<script>
import { mdiCamera, mdiMagnify, mdiPencil, mdiPlay, mdiStop } from '@mdi/js'
export default {
  layout: 'admin',
  async asyncData({ $axios, $config }) {
    const { data } = await $axios.get(`${$config.apiURL}/api/users`)
    const { data: assistant } = await $axios.get(
      `${$config.apiURL}/api/users/withRole`,
      { params: { role: 'assistant-admin' } }
    )
    return {
      staff: data,
      assistantFullName: assistant?.fullName,
      assistantId: assistant?.id,
    }
  },
  data() {
    return {
      audio: {},
      assistantNameLoading: false,
      assistantPasswordLoading: false,
      assistantPassword: '',
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
      rules: {
        required: (value) => !!value || 'Field is Required',
        notEmpty: (value) => value.length > 0|| 'Field is not Empty Required',
      },
      nameValid: false,
      passwordValid: false,
    }
  },
  async fetch() {
    const { data } = await this.$axios.get(`${this.$config.apiURL}/api/users`)
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
    async updateName() {
      this.assistantNameLoading = true
      await this.$nextTick()
      try {
        const { data: assistant } = await this.$axios.put(
          `${this.$config.apiURL}/api/users/${this.assistantId}`,
          {
            fullName: this.assistantFullName,
          }
        );
        this.$nuxt.$emit('notify', {
          message: `Assistant Admin account updated.`,
        })
        this.assistantFullName = assistant.fullName
      } catch (error) {
        if (error.response) {
          const notification = {
            message: error.response.data.message,
            status: error.response.status,
          }
          this.$nuxt.$emit('notify', notification)
        } else {
          this.$nuxt.$emit('notify', { message: 'Unknown Error', status: 500 })
        }
        console.log(error)
      } finally {
        this.assistantNameLoading = false
      }
    },
     async updatePassword() {
      this.assistantPasswordLoading = true
      await this.$nextTick()
      try {
        await this.$axios.put(
          `${this.$config.apiURL}/api/users/${this.assistantId}/changePassword`,
          {
            password: this.assistantPassword,
          }
        );
        this.$nuxt.$emit('notify', {
          message: `Assistant Admin account updated.`,
        })
        this.assistantPassword = "";
      } catch (error) {
        if (error.response) {
          const notification = {
            message: error.response.data.message,
            status: error.response.status,
          }
          this.$nuxt.$emit('notify', notification)
        } else {
          this.$nuxt.$emit('notify', { message: 'Unknown Error', status: 500 })
        }
        console.log(error)
      } finally {
        this.assistantPasswordLoading = false
      }
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
