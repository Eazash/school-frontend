<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{on,attrs}">
      <v-btn v-bind="attrs" icon v-on="on">
        <v-icon>{{icons.record}}</v-icon>
      </v-btn>
    </template>
    <v-card flat class="px-3 py-2">
      <v-card-title>Select audio</v-card-title>
      <v-card-subtitle class="py-1">{{student.name}}</v-card-subtitle>
      <v-divider/>
      <v-form ref="form" v-model="valid">
        <v-file-input v-model="audio" accept="audio/*" :prepend-icon="icons.audio" />
      </v-form>
      <v-progress-linear v-if="uploading" v-model="percent" height="6" rounded/>
      <v-card-actions>
        <v-btn class="action-button" outlined color="primary" small :disabled="!valid || uploading" @click="upload()">Upload
          <v-icon class="action-icon">{{icons.upload}}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiAccountVoice, mdiMicrophonePlus, mdiUpload } from '@mdi/js'
export default {
  props:{
    student: {
      type: Object,
      required: true 
    }
  },
  data(){
    return {
      icons: {
        record: mdiMicrophonePlus,
        audio: mdiAccountVoice,
        upload: mdiUpload
      },
      valid: true,
      uploading: false,
      audio: null,
      percent: 0,
      dialog: false
    }
  },
  watch: {
    dialog(newVal){
      if(!newVal){
        this.$refs.form.reset();
      }
    }
  },
  methods: {
    async upload(){
      const formdata = new FormData();
      formdata.append("file", this.audio);
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: this.onUploadProgress
      }
      this.uploading = true;
      await this.$nextTick();
      try {
        const { data: user } = await this.$axios.post(`${this.$config.apiURL}/api/students/audio/${this.student.id}`, formdata, config);
        this.$nuxt.$emit("notify", {message: `Recording added for ${this.student.id}`})
        console.log(user);
      } catch (error) {
        if(error.response) {
          console.log(error.message);
          this.$nuxt.$emit("notify", {message: `Error: ${error.response.data}`, status: 400})
        }
        console.log(error)
        this.$nuxt.$emit("notify", {message: "Unknown Error", status: 500})
      }
      this.uploading = false
      this.dialog = false
    },
    onUploadProgress(pe) {
      this.percent = Math.round(pe.loaded * 100) / pe.total;
    }
  }
}
</script>