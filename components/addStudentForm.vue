<template>
  <v-card flat class="px-3 py-2">
    <v-form v-model="valid">
      <v-text-field v-model="id" label="Student Id" :rules="[rules.required, rules.noSpace]"/>
      <v-text-field v-model="name" label="Full Name" type="text" :rules="[rules.required]"/>
      <v-text-field v-model="grade" label="Grade" type="number" min="1" max="12" :rules="[rules.required]" />
      <v-text-field v-model="section" label="Section" :rules="[rules.required, rules.oneLetter]"/>
    </v-form>
    <v-card-actions>
      <v-btn class="action-card" small outlined color="primary" :disabled="!valid || sending" @click.prevent="submit()">
        Create Student
        <v-icon class="action-icon">{{icons.save}}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card >
</template>

<script>
import { mdiAccountPlus } from '@mdi/js'
export default {
  data(){
    return {
      valid: true,
      sending: false,
      name: "",
      id: "",
      grade: null,
      section: "",
      icons: {
        save: mdiAccountPlus
      },
      rules: {
        noSpace: value => !/ /.test(value) || "No spaces allowed",
        oneLetter: value => !!value && value.length === 1 || "Only one letter allowed",
        required: value => !!value || "Required"
      }
    }
  },
  mounted(){
    console.log('hello')
  },
  methods:{
    async submit(){
      this.sending = true;
      await this.$nextTick()
      const {name, id, grade, section} = this;
      try {
        await this.$axios.post(`${this.$config.apiURL}/api/students`, {
        name, id, grade,section
      });
        this.$nuxt.$emit('notify', {message: `Student ${name} added.`})
      } catch (error) {
        if (error.response){
          const {message,status} = error.response;
            const notification = {
            message ,
            status
          }
          this.$nuxt.$emit('notify', notification)
        }else{ 
          this.$nuxt.$emit('notify', {message: "Unknown Error", status: 500})
        }
        console.log(error)
        this.sending = false
      }
      this.$emit('close');
    }
  }
}
</script>