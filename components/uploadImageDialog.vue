<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{on,attrs}">
      <v-btn v-bind="attrs" rounded color="primary" large v-on="on">
        <v-icon>{{icons.camera}}</v-icon>
      </v-btn>
    </template>
    <v-card flat class="px-3 py-2">
      <v-card-title>Upload Image</v-card-title>
      <v-card-subtitle class="py-1">{{student.name}}</v-card-subtitle>
      <v-divider/>
      <v-form ref="form" v-model="valid">
        <v-file-input v-model="image" accept="image/*" :prepend-icon="icons.camera" :rules="[required]"/>
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
import { mdiAccountVoice, mdiCamera, mdiUpload } from '@mdi/js'
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
        camera: mdiCamera,
        audio: mdiAccountVoice,
        upload: mdiUpload
      },
      image: {},
      valid: false,
      uploading: false,
      audio: null,
      percent: 0,
      dialog: false,
      required: (v) => !!v || "File is required"
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
      if (!this.$refs.form.validate()){
        return
      }
      const formdata = new FormData();
      formdata.append("file", this.image);
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: this.onUploadProgress
      }
      this.uploading = true;
      await this.$nextTick();
      try {
        const { data: user } = await this.$axios.post(`${this.$config.apiURL}/api/students/image/${this.student.id}`, formdata, config);
        this.$nuxt.$emit("notify", {message: `Image uploaded for ${this.student.id}`})
        console.log(user);
      } catch (error) {
        if(error.response) {
          this.$nuxt.$emit("notify", {message: error.response.data.message, status: error.response.status})
        }
        this.$nuxt.$emit("notify", {message: error.message, status: 500})
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