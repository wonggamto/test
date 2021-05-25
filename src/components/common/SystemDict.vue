<template>
  <el-select :disabled="disableflag" v-model="value" @change="selectChange" :clearable="clearable" :placeholder="placeholder">
    <el-option  v-for="item in options" :key="item.configId" :label="item.configKey" :value="item.configId">
    </el-option>
  </el-select>
</template>
<script>
export default {
    props:["configname","defaultvalue","placeholder","clearable","disableflag"],
    mounted(){
      this.loadDict();
    },
    data(){
        return {
          options:[],
          value: this.defaultvalue
      }
    },
    methods:{
      loadDict(){
        if(this.placeholder=="")
        {
          this.placeholder='请选择';
        }
        this.$http.get('/api/config/group/list?configType=0&configName='+this.configname).then(resp=>{
          if(resp.data&&resp.data.result)
          {
              let data=resp.data.data.rows;
              data.forEach(element => {
                 this.options.push({"configKey":element.configKey,"configId":element.configId});
              });
              this.setSelectItem(this.defaultvalue);
          }
        }).catch(err=>{
            console.log('err:',err);
        });
      },
      selectChange(val){
        this.setSelectItem(val);
      },
      setSelectItem(val){
        let obj = {"configId":"","configKey":""};
        if(val||val===0){
          obj = this.options.find((item)=>{
             return item.configId === val;
          });
        }
        this.$emit('getDictSelect',obj)
      }
    },
    watch:{
      defaultvalue(val)
      {
        this.value=val;
      }
    }
}
</script>


