import Vue from 'vue';
import moment from 'moment';

Vue.filter('beautifyTime',(value,str1,str2,str3,bool)=>{
    if(bool)
      return moment(value).format(`YYYY${str1}MM${str2}DD${str3} hh:mm:ss`);
    else
      return moment(value).format(`YYYY${str1}MM${str2}DD${str3}`);
});