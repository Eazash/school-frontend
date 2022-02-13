<template>
  <v-row justify="space-between" align="center"
    ><v-col cols=3>
      <v-avatar :tile="student.image" size="150">
        <v-img
          v-if="student.image"
          :src="`${$config.apiURL}/public/${student.image}`"
        ></v-img>
        <v-icon v-else>{{icons.account}}</v-icon>
      </v-avatar>
    </v-col>
    <v-col><v-card flat class="student-card">
          <v-card-title>{{student.name}}</v-card-title>
          <v-card-subtitle>
            {{student.id}}
            <br />
            {{student.grade}} | {{student.section}}
            </v-card-subtitle>
        </v-card></v-col>
  </v-row>
</template>

<script>
import { mdiAccount } from '@mdi/js'
export default {
  props: {
    student: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      icons: {
        account: mdiAccount
      }
    }
  },
}
</script>
