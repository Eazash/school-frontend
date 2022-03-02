<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon v-on="on">
        <v-icon>{{ icons.delete }}</v-icon>
      </v-btn>
    </template>
    <v-card flat class="px-3 py-2">
      <v-card-title>Confirm Delete</v-card-title>
      <v-divider></v-divider>
      <p class="heading-5 mt-2 mb-4 px-4">
        <slot />
      </p>
      <v-card-actions>
        <v-btn
          :disabled="loading"
          color="primary"
          @click="() => (dialog = false)"
          >Cancel</v-btn
        >
        <v-btn
          :loading="loading"
          :disabled="loading"
          outlined
          color="red"
          @click="$emit('confirm')"
          >Confirm</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiDelete } from '@mdi/js'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      icons: {
        delete: mdiDelete,
      },
    }
  },
}
</script>

<style></style>
