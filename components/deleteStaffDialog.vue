<template>
  <delete-dialog :loading="loading" @confirm="deleteStaff">Are you sure want to delete the account for {{staff.fullName}}?</delete-dialog>
</template>

<script>
export default {
  props: {
    staff: {
      type: Object,
      required: true
    }
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
          `${this.$config.apiURL}/api/users/${this.staff.id}`
        )
        this.$nuxt.$emit('notify', { message: 'Staff Account successfully deleted' })
      } catch (error) {
        if (error.response) {
          this.$nuxt.$emit('notifiy', {
            message: error.response.data.message,
            status: error.response.status,
          })
        } else {
          this.$nuxt.$emit('notify', { message: error.message, status: 500 })
        }
      }finally {
        this.loading = false
      }
    },
  }
}
</script>