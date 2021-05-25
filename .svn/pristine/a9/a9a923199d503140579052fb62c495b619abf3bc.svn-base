<template>
  <el-container style="height:100%;">
    <div class="myhead" style="padding-left:20px">
      <el-input style="width:150px;" v-model="TypeCode" clearable placeholder="物料类别编号"></el-input>
      <el-input style="width:150px;" v-model="TypeName" clearable placeholder="物料类别名称"></el-input>
      <el-select style="width:150px;" v-model="TypeStatus" clearable placeholder="请选择状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button style="width:120px;" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button style="width:120px;" type="primary"   @click='opendialog(1,null)' >添加</el-button>
        
    </div>

    <el-main >
      <el-table   v-loading="loading"  element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"
        :data="tableData"  fit border stripe   max-height="400"
         size='mini' :style="`width:100%;height:${clientHeight}px;`">
        <el-table-column prop="RowNo" label="序号" fixed sortable min-width="70"></el-table-column>
        <el-table-column prop="Mat_TypeCode" label="物料类别编号" sortable min-width="150"></el-table-column>
        <el-table-column prop="Mat_TypeName" label="物料类别名称" sortable min-width="120"></el-table-column>
        <el-table-column prop="Mat_TypeStatus" label="物料类别状态"  :formatter="formatlogtype" sortable  min-width="120" ></el-table-column>
        <el-table-column prop="Mat_Remark" label="物料类别备注" sortable min-width="180"></el-table-column>
        <el-table-column prop="Name" label="创建人" sortable min-width="120"></el-table-column>
        <el-table-column prop="CreateTime" label="创建时间" :formatter="formatdatetime" sortable min-width="150"></el-table-column>
        <el-table-column prop label="操作" fixed="right" min-width="120">
          <template slot-scope="scope">
            <el-button style=" width:15%; margin:0,0,0,2px; "  @click.native.prevent="opendialog(2,scope.row)"  type="text"  size="mini">编辑</el-button>
            <el-button style=" width:15%; margin:0,0,0,2px; "  @click.native.prevent="deleteRow(scope.row)"  type="text"  size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table> 
      
      <el-dialog :title="`${currentOpName}`"  width="40%" :visible.sync="dialogFormVisible">
      <el-form    ref="configForm">
          <el-form-item label="物料类别编号" :label-width="formLabelWidth">
          <el-input style="width:80%" :disabled="true"  v-model="mType.mat_TypeCode" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="物料类别名称" :label-width="formLabelWidth">
          <el-input style="width:80%" :disabled="isEnable" placeholder="请输入物料类别名称" v-model="mType.mat_TypeName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="物料类别状态" :label-width="formLabelWidth">
          <el-select style="width:80%" :disabled="isEnable"    v-model="mType.mat_TypeStatus" placeholder="物料类别状态">
              <el-option  v-for="item in options" 
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option> 
          </el-select> 
        </el-form-item>
        <el-form-item  label="物料类别备注"  :label-width="formLabelWidth">
              <el-input style="width:80%" :disabled="isEnable" placeholder="请输入描述" type="textarea" v-model="mType.mat_Remark"  autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"  class="dialog-footer">
        <el-button  style="width:15%;"  @click="dialogFormVisible = false">取 消</el-button>
        <el-button  style="width:15%;" type="primary" v-show="!isEnable"  @click="addObject">确 定</el-button>
      </span>
    </el-dialog>
    </el-main>

    <el-footer style="height:30px;">
      <el-pagination
        background
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="pageIndex"
        :total="total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>


<script >
export default {
  mounted() {
    this.$http.defaults.baseURL = process.env.BASE_INFO;
    this.clientHeight = `${document.documentElement.clientHeight - 216}`;
    this.UserInfo= this.$store.state.userInfo;
    this.loadUserData();  // 初始化加载数据
  },
  methods: {
    opendialog(flag, row) {
         this.dialogFormVisible = true; 
         this.clearForm();
         this.isEnable=false;
         if (flag === 1) {
            this.name = "";
            this.operationFlag = 1;
            this.currentOpUrl = this.URL+"/basic/material/type/add";
            this.currentOpName="添加物料类型";
            this.mType.mat_TypeCode ='MTP'+new Date().getTime();
        }
        else if(flag===2){
            this.loadDetail(row);
            this.operationFlag = 2;
            this.currentOpUrl =  this.URL+"/basic/material/type/update?id="+row.Mat_TypeId;
            this.currentOpName="编辑物料类型";
        }
    },
    loadDetail(row) {
       if(row)
       {  
         this.$http.get( this.URL+'/basic/material/type/detail?id='+row.Mat_TypeId)
         .then(resp=>{
            let data=resp.data.data;
           
            this.mType=data;

          }).catch(err=>{

         })
       } 
    },
    addObject() {
       
      if (!this.mType.mat_TypeName) {
        this.$message({ message: "物料类型名称不能为空",
          type: "error",
          showClose: true
        });
        return false;
      }

      let data = this.mType;

      this.$http
        .post(this.currentOpUrl, data)
        .then(res => {
          if (res.data && res.data.result) {
              this.$message({message: this.operationFlag==1?"添加成功！":"更新成功！",type: "success",showClose: true});
              this.search();
              this.dialogFormVisible=false;
          } else {
            this.$message({message: "添加失败 " +res.data==""?"":res.data.error,type: "error",showClose: true});
          }
        })
        .catch(err => {});
    },   
    deleteRow(dRow) {
      if(dRow)
      {
         this.$confirm('此操作将永久该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.post(this.URL+"/basic/material/type/delete?id="+dRow.Mat_TypeId,).then(resp=>{
               if(resp&&resp.data&&resp.data.result) {
                this.$message({message: "物料类型编码：" + dRow.Mat_TypeCode + "删除成功！",type: "success",showClose: true});
                this.search();
                this.dialogFormVisible=false;
                } else {
            this.$message({message: "删除失败 " +res.data==""?"":res.data.error,type: "error",showClose: true});
            }
            }).catch(err=>{});
        }).catch(() => {});
      }
    },
    search(){

      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,

        "Mat_TypeName":this.TypeName,
        "Mat_TypeCode":this.TypeCode,
        "Mat_TypeStatus":this.TypeStatus,

      };

      let params=this.$qs.stringify(data);
      this.$http
        .post(this.URL+"/basic/material/type/list?"+params,data)
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            this.total = respdata.data.total;
            this.tableData = respdata.data.rows;
            this.loading=false;
          }
        })
        .catch(err => {
          console.log("出现异常：", err);
        });

    },
    handleSizeChange(val) {
      this.pageSize = val;

      this.search();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;

      this.search();
    },
    clearForm(){
        this.operationFlag=0,
        this.id=0,
        this.mType.mat_TypeCode='',
        this.mType.mat_TypeName='',
        this.mType.mat_Remark='' 
    },
    formatdatetime(row, column){
      let datetime = row[column.property];
      if (datetime == null) {
        return "";
      }
      return this.$moment(datetime).format('YYYY-DD-MM HH:mm:ss');
    },
    formatlogtype(row, column) {
      return this.getType(row.Mat_TypeStatus);
    },
    getType(val) {
      let res = "";
      switch (val) {
        case 0:
        case "0":
          res = "禁用";
          break;
        case 1:
        case "1":
          res = "启用";
          break;
        default://2
          res = "未知";
          break;
      }
      return res;
    },
    loadUserData() {
     
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,

        "Mat_TypeStatus":1
      };

      let params=this.$qs.stringify(data);
      this.$http
        .post(this.URL+"/basic/material/type/list?"+params,data)
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            this.total = respdata.data.total;
           // this.tableData = respdata.data.data[0];
            this.tableData = respdata.data.rows;
            this.loading=false;
          }
        })
        .catch(err => {
          console.log("出现异常：", err);
        });
    },

  },

  data() {
    return {
      URL:this.$SYSCONST.BASEINFOAPI,
      UserInfo:{},
      dateValue:'',
      formLabelWidth: "20%",
      dialogFormVisible: false,
      total: 0,
      pageIndex: 1,
      pageSize: 20,
      TypeName: "",
      TypeCode: "",
      TypeStatus: 1,
      clientHeight: "0",
      operationFlag:0,
      id:0,
      mType: {
        mat_TypeStatus: 1,
        mat_TypeCode: '',
        mat_TypeName: '',
        mat_Remark: ''
      },
      options: [
        {
          value: 1,
          label: "启用"
        },
        {
          value: 0,
          label: "禁用"
        },
      ],
      tableData: [],
      loading: true,
      currentOpName: "添加物料类别",
      isEnable:false 
    };
  }
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: white;
  padding: 0px;
  font-size: 10%; 
  text-align: left;
  line-height: 30px;
}

.el-range-editor.el-input__inner {
  margin-left: 20px;
}

.el-main {
  text-align: center;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
  width: 12%;
}

.el-input {
  height: 30px;
  margin: 0, 0, 0, 5px;
}

.el-button {
  width: 100%;
  height: 30px;
  margin: 0, 0, 0, 10px;
}

.template .el-button {
  width: 10%;
  height: 30px;
  margin: 0, 0, 0, 5px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-pagination .el-input .el-input__inner {
  height: 22px;
}

</style>