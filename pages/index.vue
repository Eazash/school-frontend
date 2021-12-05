<template>
  <v-row justify="center" align="center" class="fill-height">
    <v-col v-if="!print">
      <v-card>
        <v-card-title>Students
        </v-card-title>
        <div class="d-flex justify-start flex-column flex-sm-row flex-wrap px-3 py-1"> 
          <v-btn dark color="green" nuxt to="/add"  class="action-button" small>Add<v-icon class="action-icon">{{icons.plus}}</v-icon></v-btn>
          <v-btn dark color="primary" small class="action-button" @click.stop="dialog = true">Scan ID<v-icon class="action-icon">{{icons.scan}}</v-icon></v-btn>
          <v-btn dark color="orange" small class="action-button" @click="printIDS()">Print IDs<v-icon>{{icons.print}}</v-icon></v-btn>

          <v-spacer />  
          
          <v-text-field
          id="search-bar"
            v-model="search"
            class="flex-grow-1"
            :append-icon="icons.search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </div>
        <v-card-text>
          <v-data-table :headers="headers" :items="students" :search="search" :items-per-page="5">
            <template #item.actions="{item}"><!-- eslint-disable-line -->
              <v-btn icon><v-icon dense>{{icons.pencil}}</v-icon></v-btn>
              <v-btn icon  :disabled="item.audio === null" @click="playAudio(item)">
                <v-icon v-if="item.isPlaying" dense>{{icons.stop}}</v-icon>
                <v-icon v-else dense>{{icons.play}}</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-else cols="12">
      <print-content :students="students" />
    </v-col>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Scan</v-card-title>
        <v-divider />
        <Scanner />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mdiCamera, mdiMagnify, mdiPencil, mdiPlay, mdiPlus, mdiPrinter, mdiStop} from '@mdi/js'
export default {
  async asyncData({$axios}){
    const {data } = await $axios.get("http://localhost:8000/api/students")
    return { students:data}
  },
  data(){
    return {
      audio: {},
      dialog: false,  
      print: false,
      search: "",
      headers: [
        {
          text: "Student ID",
          value: "id",
          width: "20%"
        },
        {
          text: "Full Name",
          value: "name"
        },
        {
          text: "Actions",
          value: "actions",
          align: "right"
        }
      ],
      icons: {
        pencil: mdiPencil,
        play: mdiPlay,
        stop: mdiStop,
        plus: mdiPlus,
        print: mdiPrinter,
        search: mdiMagnify,
        scan: mdiCamera
      }
    }
  },
  computed:{
    audioPlaying(){
      return this.audio.duration > 0 && !this.audio.paused;
    }
  },
  methods:{
   async playAudio(student){
      const {audio: audioName} = student;
      const indexOfStudent = this.students.findIndex( s => s.id === student.id);
      try {
        if (student.isPlaying){
          this.audio.pause()
          student.isPlaying = false;
          this.$set(this.students, indexOfStudent, student)
          return
        }
        else if(this.audioPlaying ){
          this.audio.pause();
        }
        student.isPlaying = true;
        this.$set(this.students, indexOfStudent, student)
        this.audio = new Audio(`http://localhost:8000/public/${audioName}`);
        this.audio.load()
        await this.audio.play();
      } catch (error) {
        console.log(error)
      }
    },
    async printIDS(){
      this.print=true;
      await this.$nextTick();
      window.print();
      this.print=false
    }
  }
}
</script>

<style>
#search-bar {
  max-width: 450px;
}
.v-text-field {
  padding: 0;
}
.action-button {
  margin-right: 8px;
  margin-bottom: 8px;
}
.action-icon{
  margin-left: 4px;
}
</style>