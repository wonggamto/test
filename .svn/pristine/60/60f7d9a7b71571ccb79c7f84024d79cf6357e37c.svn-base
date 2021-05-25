<template>
<div>
<h1>test</h1>
<i class="fa fa-address-card" aria-hidden="true"></i>
<el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
<el-button type="primary" @click="dialogVisible = true" icon="el-icon-edit">添加</el-button>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
     <el-table-column
      prop="mark"
      label="备注">
    </el-table-column>
  </el-table>

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
            :value="item.value">
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
export default {
    data(){
        return {
            value:true,
            tableData:[],
            dialogVisible:false,
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
    mounted(){
      this. getData();
    },
    methods:{
        getData(){
            this.$http({methods:'get',url:'/api/test/list'}).then(resp=>{
               if(resp&&resp.data&&resp.data.result)
               {
                 this.tableData=resp.data.data;
               }
            }).catch(err=>{


            })
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
                 }

            }).catch(error=>{
               console.log('error',error);
            });
        }
    }
}
</script>