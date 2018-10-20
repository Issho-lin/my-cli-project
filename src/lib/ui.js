import Vue from 'vue';

// import ElementUI from 'element-ui';
import { 
    Carousel,
    CarouselItem, 
    Input,
    InputNumber,
    Pagination,
    Switch,
    Form,
    FormItem,
    Radio,
    MessageBox
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Pagination);
Vue.use(Switch);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.prototype.$confirm = MessageBox.confirm;

import iView from 'iview';
// import { 
//     BackTop,
//     Message
//  } from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
// Vue.component('BackTop', BackTop);
// Vue.component('Message', Message);
