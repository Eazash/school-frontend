<template>
  <div class="px-5" >
    <div class="ma-2">
      <v-row no-gutters justify="space-between" align="center">
        <v-col cols="8">
          <h2>Greenland School</h2>
        </v-col>
        <v-col cols="4">
          <img src="~/assets/logo.png" width="100" alt="" srcset="" />
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
    <v-row justify="space-between" align="center" no-gutters>
      <v-col cols="12" auto class="d-flex justify-center">
        <StudentAvatar :size="150" :image="student.image" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        ><v-card flat class="student-card">
          <v-card-title>{{ student.name }}</v-card-title>
          <v-card-subtitle>
            {{ student.grade }} | {{ student.section }}
          </v-card-subtitle>
        </v-card>
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
