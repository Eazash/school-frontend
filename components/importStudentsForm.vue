<template>
  <v-card class="px-3 py-2" flat>
    <v-form v-model="valid">
      <v-file-input v-model="file" show-size :truncate-length="20" accept=".csv, .xlsx"/>
    </v-form>
    <v-card-actions>
      <v-btn small color="primary" :disabled="!valid" outlined class="action-button" @click="upload()">
        Upload
        <v-icon class="action-icon">{{icons.upload}}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiUpload } from '@mdi/js'
export default {
  data(){
    return {
      valid: true,
      file: {},
      icons: {
        upload: mdiUpload
      }
    }
  },
  methods: {
    async upload(){
      const formdata = new FormData();
      formdata.append("file", this.file);
      try {
        await this.$axios.post(`${this.$config.apiURL}/api/students/import`,formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      } catch (error) {
        if(error.response){
          console.error(error.response.message)
        }
        console.log(error);
      }
    }
  }
}
</script>