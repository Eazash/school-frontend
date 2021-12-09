<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{on,attrs}">
      <v-btn dark color="green" v-bind="attrs" class="action-button" small v-on="on">Add<v-icon class="action-icon">{{icons.plus}}</v-icon></v-btn>
    </template>
    <v-card>
      <v-card-title>Add Student(s)</v-card-title>
      <v-divider />
      <v-expansion-panels accordion>
        <v-expansion-panel >
          <v-expansion-panel-header>Add Student</v-expansion-panel-header>
          <v-expansion-panel-content><AddStudentForm @close="dialog= false" /></v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Batch Import Students</v-expansion-panel-header>
          <v-expansion-panel-content><ImportStudentsForm @close="dialog = false"/></v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPlus } from '@mdi/js'
export default {
  data(){
    return {
      icons: {
        plus: mdiPlus
      },
      dialog: false
    }
  }
}
</script>