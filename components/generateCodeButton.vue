<template>
  <v-btn icon :loading="loading" @click="renewCode"><v-icon dense>{{icons.renew}}</v-icon></v-btn>
</template>

<script>
import { mdiAutorenew } from '@mdi/js'
export default {
  props: {
    student: {
      type: Object, 
      required: true
    }
  },
  data() {
    return {
      icons: {
        renew: mdiAutorenew
      },
      loading: false
    }
  },
  methods: {
    async renewCode(){
      this.loading = true;
      try {
        await this.$axios.put(`${this.$config.apiURL}/api/students/code/${this.student.id}`)
        this.$nuxt.$emit('notify', {message: `Security code for student ${this.student.n6ame} updated`})
      } catch (error) {
        if (error.response) {
          this.$nuxt.$emit('notify',{
            message: error.response.data.message, 
            status: error.response.status
          })
        }else{
          this.$nuxt.$emit('notify', {message: error.message, status: 500})
        }
        
      }finally{
        this.loading =false
      }
    }
  }
}
</script>