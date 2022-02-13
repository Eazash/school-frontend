<template>
  <v-card class="ma-auto px-2 py-auto" width="100%" min-height="100px" outlined>
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
  </v-card>
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      required: true,
    },
  },
}
</script>
