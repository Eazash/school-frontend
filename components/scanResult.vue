<template>
  <v-card class="ma-auto px-2 py-auto" width="100%" min-height="100px" outlined>
    <div class="pa-2">
      <div class="my-2"><h2>Greenland School</h2></div>
      <v-divider></v-divider>
      <v-row no-gutters justify="space-around">
        <v-col cols="12" sm="6"
          ><v-card flat class="student-card">
            <v-card-title>{{ student.name }}</v-card-title>
            <v-card-subtitle class="pb-0">
              {{ student.id }}
              <br />
              {{ student.grade }} | {{ student.section }}
              <p class="pt-2 ma-0">
                <span class="h5 font-weight-bold">Code :</span>
                <span class="h4 font-weight-black text-uppercase red--text">{{
                  student.code
                }}</span>
              </p>
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" class="my-2" align-self="center">
          <div class="d-flex justify-center">
            <StudentAvatar :size="200" :image="student.image" />
          </div>
        </v-col>
        <v-col cols="12">
          <div v-if="student.audio !== null">
            <audio
              id="audio"
              ref="audio"
              :src="`${$config.apiURL}/public/${student.audio}`"
              controls
              :autoplay="play"
            />
          </div>
          <v-alert v-else type="warning" outlined dense
            >Student has no audio Recorded</v-alert
          >
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      required: true,
    },
    play: {
      type: Boolean,
      default: false
    }
  },
}
</script>
<style scoped>
audio {
  display: inline-block;
  width: 100%;
  object-fit: contain;
}
</style>
