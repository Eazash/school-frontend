<template>
  <v-avatar tile :size="size" left>
    <img
      v-if="image !== '' && image !== null"
      :src="`${$config.apiURL}/public/${image}`"
    ></img>
    <v-icon v-else>{{ icons.account }}</v-icon>
  </v-avatar>
</template>

<script>
import { mdiAccount } from '@mdi/js'
export default {
  props: {
    image: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      icons: {
        account: mdiAccount,
      },
    }
  },
}
</script>
