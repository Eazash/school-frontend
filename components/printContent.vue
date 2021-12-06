<template>
  <v-card>
    <div id="printContent" class="">
      <v-card v-for="student in students" :key="student.id" outlined>
        <StudentCard :student="student" />
        <img :id="student.id" class="mx-auto code" />
      </v-card>
    </div>
  </v-card>
</template>

<script>
import JsBarcode from 'jsbarcode';
export default {
  props: {
    // eslint-disable-next-line
    students: {
      type: Array
    }
  },
  mounted(){
    this.students.forEach(student=> {
      JsBarcode(`#${student.id}`, student.id, {
        displayValue: false,
      })
    });
  },
}
</script>
<style >
#printContent{
  display: grid;
  grid-template-columns: 250px 250px 250px;
  gap: 15px 10px;
}
.code {
  display: block;
  width: 80%;
  margin: 0 auto;
}
@media print {
  body{
    visibility: hidden !important;
  }
  #printContent{
    visibility: visible !important;
    max-height: 100% !important;
  }
  .student-card{
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
  }
}
</style>