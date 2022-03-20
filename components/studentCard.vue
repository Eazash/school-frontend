<template>
  <div>
    <div class="ma-2">
      <v-row no-gutters  align="center">
        <v-col cols="8">
          <h2 class="school-name">Greenland School</h2>
        </v-col>
        <v-col cols="3">
          <img src="~/assets/logo.png" width="100" alt="" srcset="" />
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
    <v-row justify="start" align="center" no-gutters>
      <v-col cols="3" class="d-flex justify-center py-2 mx-4">
        <StudentAvatar :size="100" :image="student.image" />
      </v-col>
      <v-col >
        <div class="student">
          <div class="student-name">
            {{ student.name }}
          </div>
          <div class="student-info">
            <span class="student-grade">{{ student.grade }}</span> |
            <span class="student-section">Section {{ student.section }}</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiAccount } from '@mdi/js'
export default {
  props: {
    student: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      icons: {
        account: mdiAccount,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.school-name {
  font-size: 2.5vw;
  font-weight: 500;
}
.student {
  padding: 1vw;
  &-name {
    font-size: 1.8vw;
    font-weight: 500;
  }
  &-info {
    font-size: 1.5vw;
  }
  &-grade,
  &-section {
    font-size: 1.5vw;
    font-weight: 500;
  }
}
</style>
