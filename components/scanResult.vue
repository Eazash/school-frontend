<template>
  <v-card class="ma-auto px-2 py-auto" width="100%" min-height="100px" outlined>
    <template v-if="error">
      <v-container>
        <v-alert type="error" class="ma-auto">{{ errorMessage }}</v-alert>
      </v-container>
    </template>
    <template v-if="found">
      <StudentCard :student="student" />
      <audio
        v-if="student.audio !== null"
        id="audio"
        ref="audio"
        :src="`${$config.apiURL}/public/${student.audio}`"
        controls
        autoplay
      />
      <v-alert v-else type="warning" outlined
        >Student has no audio Recorded</v-alert
      >
    </template>
  </v-card>
</template>

<script>
export default {
  props: {
    scannedText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      error: false,
      errorMessage: '',
      found: false,
      student: {},
    }
  },
  async mounted() {
    try {
      const { data: student } = await this.$axios.get(
        `${this.$config.apiURL}/api/students/${this.scannedText}`
      )
      this.student = student
      this.$emit('complete')
      this.found = true
    } catch (error) {
      this.$emit('complete')
      if (error.response) {
        if (error.response.status === 404) {
          this.error = true
          this.errorMessage = 'Invalid ID'
        }
      }
      console.dir(error)
      console.log(error.toJSON())
    }
  },
  beforeUpdate() {
    this.$refs.audio.stop()
  },
}
</script>
