import Vue from 'vue'
import store from '../store/index'
Vue.directive('permission',{
    inserted:function(el,binding){
        if(!Vue.prototype.$_checkPermission(binding.value))
        {
           el.parentNode.removeChild(el);
        }
    }
});
Vue.prototype.$_checkPermission=function(value){
    let exitFlag=false;
    if(value)
    {
        let permissinString=store.state.userInfo.authdata;
        if(permissinString)
        {
            let permissionList=permissinString.split(',');
            for(let i=0;i<permissionList.length;i++){
                if(permissionList[i].indexOf('/')==-1&&permissionList[i].indexOf(value)>-1){
                    exitFlag=true;
                 break;
                }
            }
        }
    }
    return exitFlag;
}