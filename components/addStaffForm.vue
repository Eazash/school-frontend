<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn
        dark
        color="green"
        small
        class="action-button"
        v-bind="attrs"
        v-on="on"
        >Add<v-icon>{{ icons.add }}</v-icon></v-btn
      >
    </template>
    <v-card flat class="px-3 py-2" :loading="loading">
      <v-card-title>Add Staff Account</v-card-title>
      <v-divider class="ma-2" />
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="fullName"
            dense
            label="Full Name"
            type="text"
            :rules="[rules.required]"
            outlined
          />
          <v-text-field
            v-model="username"
            dense
            label="Username"
            type="text"
            :rules="[rules.required]"
            outlined
          />
          <PasswordField :value.sync="password" label="Account Password" />
          <v-select
            v-model="gradeSelection"
            dense
            label="Grade"
            outlined
            :items="grades"
            hint="Grade to print"
            clearable
          ></v-select>
          <v-select
            v-model="sectionSelection"
            dense
            label="Section"
            outlined
            :items="sections"
            hint="Section to print"
            clearable
          ></v-select>
        </v-form>
      </v-card-text>
      <v-divider class="ma-2" />
      <v-card-actions>
        <v-btn
          class="action-card"
          small
          outlined
          color="primary"
          :disabled="!valid || loading"
          :loading="loading"
          @click.prevent="submit()"
        >
          Add Staff Account
          <v-icon class="action-icon">{{ icons.save }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPlus } from '@mdi/js'
export default {
  data() {
    return {
      dialog: false,
      valid: false,
      loading: false,
      fullName: '',
      username: '',
      password: '',
      grades: ['KG-1', 'KG-2', 'KG-3'],
      sections: ['A', 'B', 'C', 'D', 'E'],
      gradeSelection: undefined,
      sectionSelection: undefined,
      icons: {
        add: mdiPlus,
      },
      rules: { required: (value) => !!value || 'Field is Required' },
    }
  },
  methods: {
    async submit() {
      this.loading = true
      await this.$nextTick()
      const {
        fullName,
        username,
        password,
        gradeSelection: grade,
        sectionSelection: section,
      } = this
      try {
        await this.$axios.post(`${this.$config.apiURL}/api/users`, {
          fullName,
          username,
          password,
          section: { grade, section },
        })
        this.$nuxt.$emit('notify', {
          message: `Staff account for ${name} added.`,
        });
        this.dialog = false;
      } catch (error) {
        if (error.response) {
          const notification = {
            message: error.response.data.message,
            status: error.response.status
          }
          this.$nuxt.$emit('notify', notification)
        } else {
          this.$nuxt.$emit('notify', { message: 'Unknown Error', status: 500 })
        }
        console.log(error)
      } finally {
        this.loading = false
      }
      this.$emit('close')
    },
  },
}
</script>
