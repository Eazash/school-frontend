<template>
  <delete-dialog :loading="loading" @confirm="deleteStaff">
    Are you sure you want to delete Student <span>{{ student.name }}</span>?</delete-dialog
  >
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async deleteStaff() {
      this.loading = true
      try {
        await this.$axios.delete(
          `${this.$config.apiURL}/api/students/${this.student.id}`
        )
        this.$nuxt.$emit('notify', { message: 'Student successfully deleted' })
      } catch (error) {
        if (error.response) {
          this.$nuxt.$emit('notifiy', {
            message: error.response.data.message,
            status: error.response.status,
          })
        } else {
          this.$nuxt.$emit('notify', { message: 'Unknown Error', status: 500 })
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
