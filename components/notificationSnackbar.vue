<template>
  <v-snackbar v-model="display" :color="statusColor">
    {{message}}
    <template #action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="display = false"
        >
        <v-icon>{{icons.close}}</v-icon>
        </v-btn>
      </template>
  </v-snackbar>
</template>

<script>
import { mdiClose } from '@mdi/js'
export default {
  props: {
    activator: {
      type: Boolean,
      required: true
    },
    notify: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      icons :{
        close: mdiClose
      }
    }
  },
  computed:{
    display: {
      get(){
        return this.activator
      },
      set(value){
        this.$emit('update:activator', value)
      }
    },
    message(){
      return this.notify.message
    },
    statusColor(){
      if(this.notify.status === undefined) {
        return "green";
      }
      return this.notify.status >= 500? "red" : "red lighten-2"
    }
  }
}
</script>