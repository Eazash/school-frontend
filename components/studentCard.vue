<template>
  <div class="px-5">
    <div class="my-2"><h2>Greenland School</h2></div>
    <v-divider></v-divider>
    <v-row justify="space-between" align="center" no-gutters>
      <v-col cols="4">
        <img src="logo.png" width="100" alt="" srcset="" />
      </v-col>
      <v-col cols="4">
        <v-avatar :tile="student.image" size="100" left>
          <v-img
            v-if="student.image"
            :src="`${$config.apiURL}/public/${student.image}`"
          ></v-img>
          <v-icon v-else>{{ icons.account }}</v-icon>
        </v-avatar>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        ><v-card flat class="student-card">
          <v-card-title>{{ student.name }}</v-card-title>
          <v-card-subtitle>
            {{ student.id }}
            <br />
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
