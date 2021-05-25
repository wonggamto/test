<template>
  <div>
    <div style="width:100%;clear:both;text-align:left">
      <el-input   v-model="SearchFlowName" placeholder="输入工艺名称进行过滤" style="width:180px;"> </el-input> 
      <el-button size="mini" type="primary" icon="el-icon-search"  @click="search">搜索</el-button>
      <el-button type="primary" @click="opendialog(1,null)" icon="el-icon-edit">添加工艺</el-button>
    </div>
    <el-table ref="table" class="elTable" :data="maindata" stripe :style="`height:${clientHeight}px;width:98%;margin-top:10px;`">
      <el-table-column :show-overflow-tooltip="true" prop="Sys_FlowCode"  label="工艺编码" width="245px"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="Sys_FlowName" label="工艺名称"  width="180px"></el-table-column>
      <el-table-column :formatter="formatstatus"  :show-overflow-tooltip="true"  prop="Sys_FlowStatus" label="状态"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="Sys_FlowRemark" label="备注"></el-table-column>
      <el-table-column :formatter="formatdate" :show-overflow-tooltip="true" prop="CreateTime" width="250px" label="创建日期"></el-table-column>
      <el-table-column fixed="right" label="操作" width="230px" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="opendialog(3,scope.row)">查看</el-button>
          <el-button type="text" @click="opendialog(2,scope.row)">编辑</el-button>
          <el-button type="text" @click="removeItems(scope.row)">移除</el-button>
          <el-button type="text" @click="OpenDesigner(scope.row)">设计工艺流程</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :page-size="pagesize" :total="total"></el-pagination>

    <el-dialog top="55px" :title="`${currentOpName}`" width="60%" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="objectForm"  :rules="rules" style="margin-top:20px;">
        <el-form-item label="工艺名称" :label-width="formLabelWidth" prop="Sys_FlowName">
          <el-input :disabled="detailFlag"  style="width:80%" placeholder="请输入工艺名称" v-model="form.Sys_FlowName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item  label="类别" :label-width="formLabelWidth">
           <el-select style="width:90%" :disabled="isEnable" prop="select" v-model="form.Sys_FlowType" placeholder="请选择类型">
              <el-option label="48A电芯" value="1"></el-option>
              <el-option label="58A电芯" value="2"></el-option>
           </el-select>
        </el-form-item> -->
        <el-form-item label="状态" :label-width="formLabelWidth">
            <el-radio-group :disabled="detailFlag" v-model="form.Sys_FlowStatus">
              <el-radio label="1" key="1">启用</el-radio>
              <el-radio label="0" key="0">禁用</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input  style="width:80%;" :rows="3"  :disabled="detailFlag" placeholder="请输入备注" type="textarea" v-model="form.Sys_FlowRemark"  autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
         <el-button @click="resetForm('objectForm')">取 消</el-button>
         <el-button v-show="!detailFlag" type="primary" @click="submitForm('objectForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import choosedesigner from './procedureQuality.vue'
export default {
  filters: {
    formatdate: function(val) {
      return val.replace("T", " ");
    },
    myformatstatus: function(val) {
      let res = "";
      switch (val) {
        case 0:
          res = "禁用";
          break;
        case 1:
          res = "启用";
          break;
      }
      return res;
    }
  },
  mounted() {
    this.loadData(0);
    this.clientHeight = window.innerHeight-this.$refs.table.$el.offsetTop- 132;
  },
  methods: {
    search() {
      this.loadData(0);
    },
    opendialog(flag,row){
        this.clearForm();
        this.detailFlag=false;
        if(flag==1)
        {
         this.currentOpName="添加工艺"
         this.currentOrgOpUrl=this.URL+'/basic/task/flow/add';
         this.operationFlag=1;
        }
        else if(flag==2)
        {
            this.currentOpName="编辑工艺"
            this.loadDetail(row);
            this.operationFlag=2;
           
        }
        else if(flag==3)
        {      this.currentOpName="查看工艺详情"
            this.loadDetail(row);
            this.operationFlag=3;
            this.detailFlag=true;
        }
        else if(flag==4)
        {
            this.loadDetail(row);
            this.operationFlag=3;
            this.detailFlag=true;
        }
        this.dialogFormVisible = true;
    },
    loadDetail(row) {
       if(row)
       {  
         this.currentOrgOpUrl=this.URL+'/basic/task/flow/update?id='+row.Sys_FlowId;
         this.$http.get(this.URL+'/basic/task/flow/detail?id='+row.Sys_FlowId)
         .then(resp=>{
               let data=resp.data.data;
         }).catch(err=>{

         })
          this.form=row;
          this.form.Sys_FlowStatus=this.form.Sys_FlowStatus==0?"0":"1";
       }
    },
    handleCurrentChange(val){
      this.loadData(val-1);
    },
    loadData(pindex) {
      let params=this.$qs.stringify({'PageIndex':pindex+1,'PageSize':10,'Sys_FlowName':this.SearchFlowName});
      this.$http({
        methods: "get",
        url:this.URL+
          "/basic/task/flow/list?"+params,
      })
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            this.total = respdata.data.total;
            this.maindata = respdata.data.rows;
          }
        })
        .catch(err => {
          console.log("出现异常：", err);
        });
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addObject();
          }else{
            console.log('error submit!!',valid);
            return false;
          }
        });
    },
    addObject()
    {
      let data=this.form;
      this.$http.post(this.currentOrgOpUrl,data).then(res=>{
            if(res.data&&res.data.result)
            { 
               this.$message({message: '更新成功'+res.data.error,type: 'success',showClose: true});
               this.dialogFormVisible = false;
               this.loadData(0);
            }
            else
            {
              this.$message({message: '更新失败'+res.data.error,type: 'error',showClose: true});
            }
        }).catch(err=>{
            console.log('err',err);
        })
    },
    resetForm(formName) {
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
    },
    clearForm() {
      this.detail = {
        date: "",
        logger: "",
        message: "",
        exception: ""
      };
    },
    formatdate(row, column) {
      return this.$moment(row.CreateTime).format('YYYY-MM-DD HH:mm:ss');
    },
    formatstatus(row, column) {
      return this.getType(row.Sys_FlowStatus);
    },
    getType(val) {
      if(val=='0'||val==0)
      {
        return '禁用';
      }else
      {
        return '启用';
      }
    },
    removeItems(row){
      if(row)
      {
         this.$confirm('此操作将永久该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.post(this.URL+"/basic/task/flow/remove?id="+row.Sys_FlowId,).then(resp=>{
               if(resp&&resp.data&&resp.data.result)
                {
                  this.$message({message: '删除成功！',type: 'success',showClose: true});
                  this.loadData(0);
                }
            }).catch(err=>{

            });
        }).catch(() => {
              
        });
       
      }
    },
    OpenDesigner(row){
      if(row)
        {
            let url='./static/workflow/workflow.html?r=12d2&id='+row.Sys_FlowId;  
            let name='流程设计';                         
            let iWidth=1260;                        
            let iHeight=630;                         
            //获得窗口的垂直位置 
            let iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
            //获得窗口的水平位置 
            let iLeft = (window.screen.availWidth - 10 - iWidth) / 2; 
            window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no'); 
       
            // this.$layer.iframe({
            //    content: {
            //     url:'./static/workflow/workflow.html?r=12d2&id='+row.Sys_FlowId,
            //     //content:'', //传递的组件对象
            //     parent: this,//当前的vue对象
            //     data:{}//props
            //   },
            //   area:['1260px','630px'],
            //   title:"工艺流程设计"
            // })
     

       }
    }
  },
  data() {
    return {
      URL:this.$SYSCONST.BASEINFOAPI,
      SearchFlowName:'',
      detailFlag:false,
      searchWord: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      maindata: [],
      isEnable: false,
      currentOpUrl: "",
      pageindex: 0,
      pagesize: 10,
      clientHeight: "0",
      total: 0,
      currentOpName: "",
      operationFlag: 0,
      form: {
        Sys_FlowName: "",
        Sys_FlowType:0,
        Sys_FlowStatus:"1",
        Sys_FlowRemark:""
      },
      rules: {
          Sys_FlowName: [
            { required: true, message: '请输入工艺名称', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          select: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'  }
          ],
          password: [
            { required: false, min: 6, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur' }
          ],
          other:[]
      },
      detail: {
        date: "",
        logger: "",
        message: "",
        exception: ""
      }
    };
  }
};
</script>
<style>

</style>

