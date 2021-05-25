<template>
  <div>
    <mainPage ref="childPage"   id="27" @deleteItems='deleteItems'
     @updateItems='editItems' @insertItems='additems'
          btnAdd="testAdd" 
          btnUpdate="testmodify"
          btnDelete="testDelete"
          btnQuery="testQuery"
          btnExport="testExport"
      />

      <el-dialog
        title="添加测试"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
     <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-select v-model="form.address" placeholder="请选择地址">
                <el-option
                  v-for="item in addresslist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
              <el-input type="textarea" v-model="form.mark"></el-input>
        </el-form-item>
      </el-form>

  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>
<script>
import mainPage from '../common/BasePage'
export default {
  components:{
    mainPage
  },
  mounted(){
    this.userinfo=this.$store.state.userInfo;
  },
  data(){
    return {
         dialogVisible:false,
         userinfo:{},
         addValue:'sss',
         form:{
              name:'',
              address:'',
              mark:''
         },
         addresslist:[
              {label:'深圳市',value:1},
              {label:'东莞市',value:2} 
         ]
    }
  },
  methods:
  {
    deleteItems(rows){
      console.log('delete_rows:',rows);
      console.log('authdata:',this.userinfo);
    },
    editItems(rows)
    {
      console.log('edit_rows:',rows);
    },
    additems()
    {
      console.log('add---');
      this.dialogVisible = true;
      //
    },
     handleClose()
    {
          this.dialogVisible=false
    },
    onSubmit()
    {
            console.log('提交过去的data：',this.form);
            this.dialogVisible = false;
            this.$http.post('/api/test/add',this.form).then(resp=>{
               console.log('resp',resp);
                 if(resp.data&&resp.data.result)
                 {
                  console.log('success!');
                  alert('添加成功！');
                  this.$refs.childPage.preview_result();
                 }

            }).catch(error=>{
               console.log('error',error);
            });
    }
  }
};
</script>
