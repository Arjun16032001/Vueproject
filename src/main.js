import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import mitt from 'mitt'

const app = createApp(App);
const emitter = mitt()

app.use(router); 
app.config.globalProperties.emitter = emitter
app.mount('#app');
