!<template>
  <v-row justify="center" align="top">
    <v-col>
      <v-container>
        <v-card min-height="50vh" max-height="80vh">
          <v-card-title>Scan Student IDs</v-card-title>
          <v-divider />
          <v-card-text>
          <v-container fluid>
            <v-row justify="center" align="center"><v-col>Student will be displayed here</v-col></v-row>
            <v-text-field v-model="scanInput" @keyup.enter="() => found= !found"></v-text-field>
            <ScanResult v-if="found" :scanned-text="scanInput"/>
          </v-container>
          </v-card-text>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      scanInput: "",
      found: false
    }
  }
}
</script>

<style>

</style>