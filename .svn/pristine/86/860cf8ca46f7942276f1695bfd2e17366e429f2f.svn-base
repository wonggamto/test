<template>
  <div>
    <div style="width:100%;clear:both;text-align:left">
      <el-select v-model="configType" placeholder="类型">
        <el-option label="全部" value="0"></el-option>
        <el-option label="Common" value="Common"></el-option>
        <el-option label="User" value="User"></el-option>
        <el-option label="System" value="System"></el-option>
      </el-select>
      <el-input  placeholder="输入配置名称进行过滤" v-model="searchWord" style="width:180px;"> </el-input>
      <el-button type="primary" icon="el-icon-search" @click="search" >搜索</el-button>
      <el-button type="primary" @click='opendialog(1,null)' icon="el-icon-edit">添加</el-button>
    </div>
    <el-table
      class="elTable"
      :data="maindata"
      ref="table"
      stripe
      :style="`height:${clientHeight}px;width:99%`">
      <el-table-column
        prop="configName"
           :show-overflow-tooltip="true"
        label="配置名称"
      >
      </el-table-column>
       <el-table-column
        prop="configType"
        label="类型"
      >
      </el-table-column>
       <el-table-column
          :show-overflow-tooltip="true"
        prop="configKey"
        label="配置项key"
      >
      </el-table-column>
      <el-table-column
          :show-overflow-tooltip="true"
        prop="configId"
        label="配置项ID"
      >
      </el-table-column>
         <el-table-column
        :show-overflow-tooltip="true"
        prop="configValue"
        label="配置值value"
      >
      </el-table-column>
     <el-table-column
        :show-overflow-tooltip="true"
        prop="description"
        label="描述"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="160"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="opendialog(3,scope.row)"
          >查看</el-button>
          <el-button
            type="text"
            @click="opendialog(2,scope.row)"
          >编辑</el-button>
          <el-button
            @click="deleteRoles(scope.row)"
            type="text"
          >删除</el-button>

        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="`${currentOpName}`"
      width="60%"
      :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="configForm">
        <el-form-item label="配置名称" :label-width="formLabelWidth">
          <el-input style="width:90%" :disabled="isEnable" placeholder="请输入配置名称" v-model="form.configName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select style="width:90%" :disabled="isEnable" v-model="form.configType" placeholder="请选择类型">
              <el-option label="System" value="1"></el-option>
              <el-option label="User" value="2"></el-option>
              <el-option label="Common" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配置Key" :label-width="formLabelWidth">
          <el-input style="width:90%" :disabled="isEnable" placeholder="请输入key" v-model="form.configKey" autocomplete="off" clearable></el-input>
        </el-form-item>
       <el-form-item label="配置ID" :label-width="formLabelWidth">
          <el-input style="width:90%" :disabled="isEnable" placeholder="请输入ID" v-model="form.configId" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="配置Value" :label-width="formLabelWidth">
            <el-input style="width:90%;" :rows="5"  :disabled="isEnable" placeholder="请输入Value" type="textarea" v-model="form.configValue"  autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input style="width:90%" :disabled="isEnable" placeholder="请输入描述" type="textarea" v-model="form.description"  autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-show="!isEnable"  @click="addObject">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      :total="total">
    </el-pagination>

  </div>
</template>
<script>
export default {
  mounted() {
    this.loadData(0,'');
    this.clientHeight = `${window.innerHeight -this.$refs.table.$el.offsetTop- 132}`;

  },
  methods: {
    search(){
         this.loadData(0,this.searchWord);
    },
    deleteRoles(row) {
       this.$confirm('此操作将永久删除改角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.removeItems(row);
        }).catch(() => {
              
        });
    },
    removeItems(row){
         this.$http.post('/api/config/remove/'+row.id).then(resp=>{
                if(resp&&resp.data&&resp.data.result)
                {
                  this.$message({message: '删除成功！',type: 'success',showClose: true});
                  this.loadData(0,'');
                }
          })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.loadData(val - 1,'');
      console.log(`当前页: ${val}`);
    },
    opendialog(flag, row) {
        this.dialogFormVisible = true; 
        this.clearForm();
        this.isEnable=false;
        if (flag === 1) {
            //添加组织机构
            this.form.name = "";
            this.form.operationFlag = 1;
            this.currentOpUrl = "/api/config/create";
            this.currentOpName="添加配置";
        } 
        else if(flag===3){
            this.loadDetail(row);
            this.form.operationFlag = 3;
            this.currentOpName="配置详情";
            this.isEnable=true;
        }
        else{
            this.loadDetail(row);
            this.form.operationFlag = 2;
            this.currentOpUrl = "/api/config/update";
            this.currentOpName="编辑配置";
        }
    },
    loadDetail(row) {
      this.$http({ methods: "get", url: "/api/config/detail/" + row.id })
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            this.form= respdata.data;
          }
        })
        .catch(err => {
          console.log("出现异常：", err);
        });
    },
    addObject() {
      if (!this.form.configKey&&!this.form.configValue) {
        this.$message({
          message: "配置key和value不能为空",
          type: "error",
          showClose: true
        });
        return false;
      }
      let data = {};
      if (this.form.operationFlag === 1) {
        data = {
            "configName": this.form.configName,
            "configType": this.form.configType,
            "configKey": this.form.configKey,
            "configId": this.form.configId,
            "configValue": this.form.configValue,
            "description": this.form.description
            }
      } else {
        data = {
            "configName": this.form.configName,
            "configType": this.form.configType,
            "configKey": this.form.configKey,
            "configId": this.form.configId,
            "configValue": this.form.configValue,
            "description": this.form.description,
            "id":this.form.id
            };
      }
      this.$http
        .post(this.currentOpUrl, data)
        .then(res => {
          if (res.data && res.data.result) {
              this.$message({message: this.form.operationFlag==1?'添加成功！':'更新成功！',type: 'success',showClose: true});
              this.loadData(0,'')
              this.dialogFormVisible=false
          } else {
            this.$message({message: "添加失败 " +res.data==""?"":res.data.error,type: "error",showClose: true});
          }
        })
        .catch(err => {});
    },
    loadData(pindex,configName) {
      this.$http({
        methods: "get",
        url: "/api/config?pageindex=" + pindex + "&pagesize=15&ConfigName="+configName+"&configType="+this.configType
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
    clearForm(){
       this.form={
        operationFlag:0,
        id:0,
        configName: '',
        configType: '',
        configKey:'',
        configValue:'',
        description:''
       }
    }
  },
  data() {
    return {
      configType:'0',
      searchWord:'',
      dialogFormVisible: false,
      formLabelWidth: "120px",
      maindata: [],
      isEnable:false,
      currentOpUrl: "",
      pageindex: 0,
      pagesize: 15,
      clientHeight: "0",
      total: 0,
      currentOpName: "添加角色",
      form: {
        operationFlag:0,
        id:0,
        configName: '',
        configType: '',
        configKey:'',
        configValue:'',
        description:'',
        configId:''
      }
    };
  }
};
</script>
<style >
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 20px;
}
</style>

