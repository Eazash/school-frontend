<template>
  <v-card flat class="px-3 py-2">
    <v-form v-model="valid">
      <v-text-field v-model="id" label="Student Id" :rules="[rules.noSpace]"/>
      <v-text-field v-model="name" label="Full Name" />
    </v-form>
    <v-card-actions>
      <v-btn class="action-card" small outlined color="primary" :disabled="!valid" @click.prevent="submit()">
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
      name: "",
      valid: true,
      id: "",
      icons: {
        save: mdiAccountPlus
      },
      rules: {
        noSpace: value => !/ /.test(value)
      }
    }
  },
  mounted(){
    console.log('hello')
  },
  methods:{
    async submit(){
      const {name, id} = this;
      try {
        await this.$axios.post(`${this.$config.apiURL}/api/students`, {
        name, id
      });
      } catch (error) {
        if (error.response){
          const {message} = error.response;
          console.log(message);
        }
        console.log(error)
      }
    }
  }
}
</script>