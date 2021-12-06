<template>
  <v-card>
    <v-card-title>Scan
      <v-spacer />
      <v-btn icon text @click="$emit('close')"><v-icon >{{icons.close}}</v-icon></v-btn>
      </v-card-title>
    <v-divider />
    <div class="scan-wrapper d-flex justify-center align-center pa-2">
      <v-progress-circular  v-if="loading" indeterminate />
      <template v-if="error">
        <v-alert type="error" outlined >{{errorMessage}}</v-alert>
      </template>
      <div v-if="scanning" id="scanner" />
      <scan-result v-if="result.length" :scanned-text="result" @complete="loading = false" />
    </div>
    <v-card-actions>
      <v-select  v-model="selectedDevice" label="Select Camera" dense outlined :disabled="!devices.length" item-text="label" :items="devices" return-object autofocus/>
    </v-card-actions>
  </v-card>
</template>

<script>
import {Html5Qrcode} from 'html5-qrcode'
import { mdiClose } from '@mdi/js';
function isMobile(){
  let hasTouchScreen = false;
  if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
      const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
          hasTouchScreen = !!mQ.matches;
      } else if ('orientation' in window) {
          hasTouchScreen = true; // deprecated, but good fallback
      } else {
          // Only as a last resort, fall back to user agent sniffing
          const UA = navigator.userAgent;
          hasTouchScreen = (
              /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
              /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
          );
      }
  }
  return hasTouchScreen;
}
export default {
  data(){
    return {
      devices: [],
      scanner: {},
      result: "",
      selectedDevice: {},
      scanning: false,
      loading: true,
      error: false,
      errorMessage: {},
      icons: {
        close: mdiClose
      }
    }
  },
  watch:{
    async selectedDevice(){
      const config = {
        fps: 60,
        qrbox: {
          height: 100,
          width: 250
        }
      }
      this.loading = true;
      this.scanning = false;
      await this.$nextTick();
      try {
        if (this.scanner.isScanning){
          await this.scanner.stop();
        }
        this.loading = false;
        this.scanning = true;
        await this.$nextTick();
        await this.scanner.start(this.selectedDevice.id,config, this.onScanSuccess);
      } catch (error) {
        console.log(error);
        this.error = true;
        this.errorMessage = error
      }
    }
  },
  async mounted(){
    
    if (!isMobile() || true) { // eslint-disable-line
      try {
        this.devices = await Html5Qrcode.getCameras();
        await this.$nextTick();
        this.scanner = new Html5Qrcode('scanner');
        this.selectedDevice = this.devices[0];
      } catch (error) {
        console.log(error)
        this.error = true;
        this.errorMessage = error;
        this.loading = false;
      }
    }
  },
  destroyed(){
    if (this.scanner.isScanning || (this.scanner.getState !== undefined && this.scanner.getState() === 2)){
      this.scanner.stop();
    }
  },
  methods:{
    onScanSuccess(decodedText) {
      this.scanner.stop()
      this.loading = true;
      this.scanning = false;
      this.result = decodedText;
      console.log(decodedText)
    }
  }
}
</script>

<style scoped>
#scanner-card {
  max-width: 500px;
  /* margin: 16px auto; */
}
#scanner {
  width: 300px;
  margin: auto;
}

.scan-wrapper {
  min-height: 200px;
}
</style>