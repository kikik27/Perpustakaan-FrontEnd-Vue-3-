import { createApp} from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'   
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css'z
// import 'bootstrap/dist/js/bootstrap.js' 

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPen,faTrash } from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
library.add(faPen,faTrash)

createApp(App).use(VueSweetalert2,VueRouter).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
