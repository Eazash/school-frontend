<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon v-on="on">
        <v-icon>{{ icons.edit }}</v-icon>
      </v-btn>
    </template>
    <v-card class="px-3 py-2" :loading="loading">
      <v-card-title>Edit Staff Account</v-card-title>
      <v-card-text>
        <v-card outlined>
          <v-card-title>
            <span class="body-1">Update Account Information</span>
          </v-card-title>
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
              <v-select
                v-model="gradeSelection"
                dense
                label="Grade"
                outlined
                :items="grades"
                hint="Grade to print"
              ></v-select>
              <v-select
                v-model="sectionSelection"
                dense
                label="Section"
                outlined
                :items="sections"
                hint="Section to print"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions
            ><v-btn
              class="action-card"
              small
              outlined
              color="primary"
              :disabled="!valid || loading"
              :loading="loading"
              @click.prevent="submit()"
            >
              Update Staff Account
              <v-icon class="action-icon">{{ icons.save }}</v-icon>
            </v-btn></v-card-actions
          >
        </v-card>
        <v-divider class="ma-2" />
        <v-card outlined>
          <v-card-title>
            <span class="body-1">Change Password</span></v-card-title>
          <v-card-text>
            <v-row align="center">
              <v-col cols="8">
                <v-form v-model="passwordValid">
                  <PasswordField :value.sync="password" label="Update Password" />
                </v-form>
              </v-col>
              <v-col cols="4">
                <v-btn
                  class="action-card"
                  small
                  outlined
                  color="primary"
                  :disabled="!passwordValid || passwordLoading"
                  :loading="passwordLoading"
                  @click.prevent="updatePassword()"
                >
                  Update
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPencil } from '@mdi/js'
export default {
  props: {
    staff: {
      type: Object,
      default: () => ({
        fullName: '',
        username: '',
        section: {
          grade: '',
          section: '',
        },
      }),
    },
  },
  data() {
    return {
      dialog: false,
      valid: false,
      passwordValid: false,
      loading: false,
      passwordLoading: false,
      fullName: this.staff.fullName,
      username: this.staff.username,
      password: '',
      grades: ['KG-1', 'KG-2', 'KG-3'],
      sections: ['A', 'B', 'C', 'D', 'E'],
      gradeSelection: this.staff.section.grade,
      sectionSelection: this.staff.section.section,
      icons: {
        edit: mdiPencil,
      },
      rules: { required: (value) => !!value || 'Field is Required' },
    }
  },
  mounted() {
    this.fullName = this.staff.fullName
    this.username = this.staff.username
    this.gradeSelection = this.staff.section.grade
    this.sectionSelection = this.staff.section.section
  },
  methods: {
    async updatePassword(){
      this.passwordLoading = true;
      const {password} = this;
      try {
        await this.$axios.put(`${this.$config.apiURL}/api/users/${this.staff.id}/changePassword`, {password});
        this.$nuxt.$emit('notify', {
          message: `Password for ${this.staff.fullName} updated.`,
        })
        this.dialog = false
      } catch (error) {
         if (error.response) {
          const notification = {
            message: error.response.data.message,
            status: error.response.status,
          }
          this.$nuxt.$emit('notify', notification)
        } else {
          this.$nuxt.$emit('notify', { message: 'Unknown Error', status: 500 })
        }
        console.log(error)
      }finally{
        this.passwordLoading=false;
      }
    },
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
        await this.$axios.put(`${this.$config.apiURL}/api/users/${this.staff.id}`, {
          fullName,
          username,
          password,
          section: { grade, section },
        })
        this.$nuxt.$emit('notify', {
          message: `Staff account for ${this.staff.fullName} updated.`,
        })
        this.dialog = false
      } catch (error) {
        if (error.response) {
          const notification = {
            message: error.response.data.message,
            status: error.response.status,
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
