<template>
<div>
<report  ref="report" :id="id" />
</div>
</template>
<script>
import report from './instanReport'
export default {
  components:{
    report
  },
  beforeRouteUpdate(to, from, next){
    //强制刷新子组件
    //this.hackReset = false
    // this.$nextTick(() => {
    //    
     
    //    this.hackReset = true
    // })
    let id=to.params.id;
    this.id=id;
    next();
  },
  mounted(){
    
  },
  data() {
    return {
       //hackReset:true,
       id:this.$route.params.id
    };
  }
}
</script>
<style>

</style>
