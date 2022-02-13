<template>
  <v-card>
    <v-card-title>Scan
      <v-spacer />
      <v-btn icon text @click="$emit('close')"><v-icon >{{icons.close}}</v-icon></v-btn>
      </v-card-title>
    <v-divider />
    <div class="scan-wrapper d-flex flex-column justify-center align-center pa-2">
      <v-progress-circular  v-if="loading" indeterminate />
      <div v-if="error">
        <v-alert type="error" outlined >{{errorMessage}}</v-alert>
      </div>
      <div>
        <v-text-field ref="scanner_input" v-model.lazy.trim="scanner_input" autofocus hidden />
      </div>
      <div>
        <scan-result v-if="scanner_input.length" :scanned-text="scanner_input" @complete="loading = false" />
      </div>
    </div>
  </v-card>
</template>

<script>
import { mdiClose } from '@mdi/js';
export default {
  data(){
    return {
      scanner_input: "",
      result: "",
      loading: false,
      error: false,
      errorMessage: {},
      icons: {
        close: mdiClose
      }
    }
  },
  methods:{
    scan() {
      this.result = this.scanner_input;
      this.$refs.scanner_input.value = "";
    },
  }
}
</script>

<style scoped>
#scanner-card {
  max-width: 500px;
  /* margin: 16px auto; */
}
#scanner {
  width: 300px;
  margin: auto;
}

.scan-wrapper {
  min-height: 200px;
}
</style>