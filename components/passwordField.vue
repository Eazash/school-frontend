<template>
  <v-text-field
    v-model="value"
    label="Password"
    outlined
    :type="passwordVisible ? 'text' : 'password'"
    dense
    :append-icon="passwordVisible ? icons.hide : icons.show"
    :rules="[required]"
    @click:append="passwordVisible = !passwordVisible"
    @change="updateValue"
  />
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js'
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data(){
    return { 
      value: "",
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
      this.$emit("change", this.value)
    }
  }
}
</script>

<style></style>
