<template>
  <v-card flat class="student-card">
          <v-card-title>{{student.name}}</v-card-title>
          <v-card-subtitle>{{student.id}}</v-card-subtitle>
        </v-card>
</template>

<script>
export default {
  props:{
    student: {
      type: Object,
      required: true
    }
  }
}
</script>