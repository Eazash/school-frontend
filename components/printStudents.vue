<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn
        dark
        color="orange"
        small
        class="action-button"
        v-bind="attrs"
        v-on="on"
        >Print IDs<v-icon>{{ icons.print }}</v-icon></v-btn
      >
    </template>
    <v-card :loading="loading">
      <v-card-title>Print Student(s)</v-card-title>
      <v-divider />
      <v-card-text class="pa-4">
        <div class="mb-2">
          <v-select
            v-model="gradeSelection"
            label="Grade"
            outlined
            :items="grades"
            hint="Grade to print"
            clearable
          ></v-select>
        </div>
        <div class="mb-2">
          <v-select
            v-model="sectionSelection"
            label="Section"
            outlined
            :items="sections"
            hint="Section to print"
            clearable
          ></v-select>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-container class="d-flex justify-space-between">
          <v-btn
            dark
            outlined
            color="orange"
            class="action-button"
            @click="printAll"
            >Print All Students<v-icon>{{ icons.print }}</v-icon></v-btn
          >
          <v-btn
            color="orange"
            class="action-button"
            :disabled="!isSelected"
            @click="printSelection"
            >Print Selection<v-icon>{{ icons.print }}</v-icon></v-btn
          >
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPrinter } from '@mdi/js'
export default {
  data() {
    return {
      grades: ['KG-1', 'KG-2', 'KG-3'],
      sections: ['A', 'B', 'C', 'D', 'E'],
      gradeSelection: undefined,
      sectionSelection: undefined,
      dialog: false,
      loading: false,
      icons: {
        print: mdiPrinter,
      },
    }
  },
  computed: {
    isSelected() {
      return (
        this.gradeSelection || (this.gradeSelection && this.sectionSelection)
      )
    },
  },
  methods: {
    async printAll() {
      const { data: students } = await this.$axios.get(
        `${this.$config.apiURL}/api/students`
      )
      this.dialog = false
      await this.$nextTick()
      if (students.length === 0) {
        this.$nuxt.$emit('notify', {
          message: 'No students found in the selected grade and/or section',
          status: 400,
        })
      } else {
        this.$emit('print', students)
      }
    },
    async printSelection() {
      const { data: students } = await this.$axios.get(
        `${this.$config.apiURL}/api/students`,
        {
          params: {
            grade: this.gradeSelection,
            section: this.sectionSelection,
          },
        }
      )
      this.dialog = false
      await this.$nextTick()
      if (students.length === 0) {
        this.$nuxt.$emit('notify', {
          message: 'No students found in the selected grade and/or section',
          status: 400,
        })
      } else {
        this.$emit('print', students)
      }
    },
    async print(data) {},
  },
}
</script>

<style></style>
