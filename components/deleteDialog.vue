<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon v-on="on">
        <v-icon>{{ icons.delete }}</v-icon>
      </v-btn>
    </template>
    <v-card flat class="px-3 py-2">
      <v-card-title>Confirm Delete</v-card-title>
      <v-divider></v-divider>
      <p class="heading-5 mt-2 mb-4 px-4">
        Are you sure you want to delete <span>'{{ student.name }}'</span>
      </p>
      <v-card-actions>
        <v-btn
          :disabled="loading"
          color="primary"
          @click="() => (dialog = false)"
          >Cancel</v-btn
        >
        <v-btn
          :loading="loading"
          :disabled="loading"
          outlined
          color="red"
          @click="deleteStudent"
          >Confirm</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiDelete } from '@mdi/js'
export default {
  props: {
    student: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
      icons: {
        delete: mdiDelete,
      },
    }
  },
  methods: {
    async deleteStudent() {
      this.loading = true
      try {
        await this.$axios.delete(
          `${this.$config.apiURL}/api/students/${this.student.id}`
        )
        this.$nuxt.$emit('notify', { message: 'Student successfully deleted' })
      } catch (error) {
        if (error.response) {
          this.$nuxt.$emit('notifiy', {
            message: error.response.data,
            status: error.response.status,
          })
        } else {
          this.$nuxt.$emit('notify', { message: 'Unknown Error', status: 500 })
        }
      }
    },
  },
}
</script>

<style></style>
