<template>
  <v-row justify="center" align="center" class="fill-height">
    <v-col>
      <v-card>
        <v-card-title>Students
           <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        :append-icon="icons.search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="students" :search="search">
            <template #item.actions="{item}"><!-- eslint-disable-line -->
              <v-btn icon><v-icon dense>{{icons.pencil}}</v-icon></v-btn>
              <v-btn icon  :disabled="item.audio === null" @click="playAudio(item)">
                <v-icon v-if="item.isPlaying" dense>{{icons.stop}}</v-icon>
                <v-icon v-else dense>{{icons.play}}</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-btn dark color="green" nuxt to="/add">Add Student<v-icon>{{icons.plus}}</v-icon></v-btn>
          <v-btn dark color="primary" nuxt to="/print">Print Student List<v-icon>{{icons.print}}</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mdiMagnify, mdiPencil, mdiPlay, mdiPlus, mdiPrinter, mdiStop} from '@mdi/js'
export default {
  async asyncData({$axios}){
    const {data } = await $axios.get("http://localhost:8000/api/students")
    return { students:data}
  },
  data(){
    return {
      audio: {},
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
        search: mdiMagnify
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
    }
  }
}
</script>