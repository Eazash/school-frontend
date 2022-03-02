<template>
  <v-text-field
    v-model="internalValue"
    label="Password"
    outlined
    hide-details="auto"
    :type="passwordVisible ? 'text' : 'password'"
    dense
    :append-icon="passwordVisible ? icons.hide : icons.show"
    :rules="[required]"
    @click:append="passwordVisible = !passwordVisible"
    @input="updateValue"
  />
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js'
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ""
    }
  },
  data(){
    return { 
      internalValue: this.value ,
      icons: {
        show: mdiEye,
        hide: mdiEyeOff,
      },
      passwordVisible: false,
      required: (value) => !!value || 'Field is Required',
    }
  },
  methods: {
    updateValue() {
      this.$emit("update:value", this.internalValue)
    }
  }
}
</script>

<style></style>
