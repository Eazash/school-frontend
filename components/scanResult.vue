<template>
  <v-card class="ma-auto px-2 py-auto" width="100%" min-height="100px" outlined>
    <div class="px-5">
      <div class="my-2"><h2>Greenland School</h2></div>
      <v-divider></v-divider>
      <v-row no-gutters justify="space-around" >
        <v-col cols="12" sm="6"
          ><v-card flat class="student-card">
            <v-card-title>{{ student.name }}</v-card-title>
            <v-card-subtitle>
              {{ student.id }}
              <br />
              {{ student.grade }} | {{ student.section }}
            <p class="pt-2"><span class="h5 font-weight-bold">Code :</span> <span class="h4 font-weight-black text-uppercase red--text">{{student.code}}</span></p>
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <StudentAvatar :size="250" :image="student.image" />
        </v-col>
      </v-row>
    </div>
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
