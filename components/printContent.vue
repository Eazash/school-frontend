<template>
  <div id="printContent" class="">
    <v-row justify="space-around">
      <v-col v-for="student in students" :key="student.id" cols="6">
        <v-card outlined class="pa-2">
          <StudentCard :student="student" />
          <img :id="student.id" class="mx-auto code" height="80px"/>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode'
export default {
  props: {
    // eslint-disable-next-line
    students: {
      type: Array,
    },
  },
  mounted() {
    this.students.forEach((student) => {
      JsBarcode(`#${student.id}`, student.id, {
        displayValue: false,
      })
    })
  },
}
</script>
<style>
#printContent {
  gap: 15px 10px;
}
.code {
  display: block;
  width: 80%;
  margin: 0 auto;
}
@media print {
  body {
    visibility: hidden !important;
  }
  #printContent {
    visibility: visible !important;
    max-height: 100% !important;
  }
  .student-card {
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
  }
}
</style>
