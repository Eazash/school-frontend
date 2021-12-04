import Vue from 'vue'
import vueHtmlToPaper from 'vue-html-to-paper'

const options = {
  name: '_blank',
  specs: ['titlebar=yes'],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
    'main.css',
  ],
}

Vue.use(vueHtmlToPaper, options)
