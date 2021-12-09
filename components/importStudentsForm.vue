<template>
  <v-card class="px-3 py-2" flat>
    <v-form v-model="valid">
      <v-file-input v-model="file" show-size :truncate-length="15" accept=".csv,.xlsx" required :rules="[rules.required]"/>
    </v-form>
    <v-card-actions>
      <v-btn small color="primary" :disabled="!valid || uploading" outlined class="action-button" @click="upload()">
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
      file: null,
      icons: {
        upload: mdiUpload
      },
      rules: {
        required: (value) => value!==null
      },
      uploading: false
    }
  },
  methods: {
    async upload(){
      const formdata = new FormData();
      formdata.append("file", this.file);
      this.uploading = true;
      await this.$nextTick();
      try {
        const {data } = await this.$axios.post(`${this.$config.apiURL}/api/students/import`,formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        this.$nuxt.$emit('notify', {message: `${data.count} students imported`})
      } catch (error) {
        if(error.response){
          const notification = {
            message: error.response.data.message,
            status: error.response.status
          }
          this.$nuxt.$emit('notify', notification)
        }
        else{
        const notification = {
          message: "Unexpected Error",
          status: 500
        }
        this.$nuxt.$emit('notify', notification);
        console.log(error);}
      }
      this.$emit('close');
    }
  }
}
</script>