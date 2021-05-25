<template>
  <el-container style="height:100%;">
    <el-header style="height:30px;">
      <el-row :gutter="10">
        <el-col :span="6" style="width:38%;">
          <el-date-picker
            v-model="dateValue"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-input v-model="Sys_CollectName" placeholder="收集组名称"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="Sys_CollectCode" placeholder="收集组编号"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="6" style="width:8%;">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-col>
        <el-col :span="6" style="width:8%;">
          <el-button type="primary"   @click='opendialog(1,null)' >添加</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main >
      <el-table   v-loading="loading"  element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"
        :data="tableData"  fit border stripe     size='mini' :style="`height:${clientHeight}px;`">
        <el-table-column type="selection" width="40" height="30"></el-table-column>
        <el-table-column prop="RowNo" label="序号" fixed sortable min-width="70"></el-table-column>
        <el-table-column prop="Sys_CollectCode" label="收集组编号" sortable min-width="150"></el-table-column>
        <el-table-column prop="Sys_CollectName" label="收集组名称" sortable min-width="120"></el-table-column>
        <el-table-column prop="Sys_CollectType" label="收集组类型" sortable min-width="120"></el-table-column>
        <el-table-column prop="Sys_CollectStatus" label="收集组状态"  :formatter="formatlogtype" sortable  min-width="120" ></el-table-column>
        <el-table-column prop="Sys_DataBaseType" label="数据库类型" sortable min-width="120"></el-table-column>
        <el-table-column prop="Sys_CollectDes" label="描述" sortable min-width="180"></el-table-column>
        <el-table-column prop="CreatorId" label="创建人" sortable min-width="120"></el-table-column>
        <el-table-column prop="CreateTime" label="创建时间" sortable min-width="180"></el-table-column>
        <el-table-column prop="ModifierId" label="修改人" sortable min-width="120"></el-table-column>
        <el-table-column prop="ModifyTime" label="修改时间" sortable min-width="180"></el-table-column>
        <el-table-column prop label="操作" fixed="right" min-width="120">
          <template slot-scope="scope">
            <el-button style=" width:15%; margin:0,0,0,2px; "  @click.native.prevent="deleteRow(scope.$index, tableData)"  type="text"  size="mini">查看</el-button>
            <el-button style=" width:15%; margin:0,0,0,2px; "  @click.native.prevent="deleteRow(scope.$index, tableData)"  type="text"  size="mini">编辑</el-button>
            <el-button style=" width:15%; margin:0,0,0,2px; "  @click.native.prevent="deleteRow(scope.$index, tableData)"  type="text"  size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table> 
      
      <el-dialog :title="`${currentOpName}`"  width="40%" :visible.sync="dialogFormVisible">
      <el-form    ref="configForm">
         <el-form-item label="收集组编号" :label-width="formLabelWidth">
          <el-input style="width:80%" :disabled="true"  v-model="CollectCode" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="收集组名称" :label-width="formLabelWidth">
          <el-input style="width:80%" :disabled="isEnable" placeholder="请输入收集组名称" v-model="CollectName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="收集组类型" :label-width="formLabelWidth">
          <el-input style="width:80%" :disabled="isEnable" placeholder="请输入收集组类型" v-model="CollectType" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="收集组状态" :label-width="formLabelWidth">
          <el-select style="width:80%" :disabled="isEnable"    v-model="CollectStatus" placeholder="收集组状态">
             <el-option  v-for="item in options" 
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option> 
          </el-select> 
        </el-form-item>
        <el-form-item label="数据库类型" :label-width="formLabelWidth">
           <el-select style="width:80%" :disabled="isEnable" filterable v-model="DataBaseType" placeholder="数据库类型">
              <el-option v-for="item in ServerName"
              :key="item.value"
              :label="item.label"
              :value="item.value"
             ></el-option>  
            </el-select> 
        </el-form-item>
        <el-form-item  label="描 述"  :label-width="formLabelWidth">
             <el-input style="width:80%" :disabled="isEnable" placeholder="请输入描述" type="textarea" v-model="CollectDes"  autocomplete="off" clearable></el-input>
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
        :total="total"
      ></el-pagination>
    </el-footer>
  </el-container>
</template>


<script >
export default {
  mounted() {
    // this.$http.defaults.baseURL = process.env.BASE_INFO;
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
            this.currentOpUrl = "/basic/interface/collect/add";
            this.currentOpName="添加数据收集组";
            this.CollectCode ='SJZ'+new Date().getTime();
        } 
        else if(flag===3){
            this.loadDetail(row);
            this.operationFlag = 3;
            this.currentOpName="配置详情";
            this.isEnable=true;
        }
        else{
            this.loadDetail(row);
            this.operationFlag = 2;
            this.currentOpUrl = "/basic/interface/collect/update";
            this.currentOpName="编辑配置";
        }
    },
    loadDetail(row) {
      this.$http({ methods: "get", url: this.URL+"/basic/interface/collect/list" + row.id })
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            //this.form= respdata.data;
          }
        })
        .catch(err => {
          console.log("出现异常：", err);
        });
    },
    addObject() {
      if (!this.CollectName) {
        this.$message({ message: "收集组名称不能为空",
          type: "error",
          showClose: true
        });
        return false;
      }
      let data = {};
      if (this.operationFlag === 1) {
        data = {
            "Sys_CollectCode":this.CollectCode,
            "Sys_CollectName":this.CollectName,
            "Sys_CollectType":this.CollectType, 
            "Sys_DataBaseType":this.DataBaseType,
            "Sys_CollectStatus":this.CollectStatus,
            "Sys_CollectDes":this.CollectDes,
            "creatorId":this.UserInfo.userid
        }
      } else {
        data = {
            "sys_CollectCode": this.CollectName,
            "sys_CollectName": this.CollectName,
            "sys_DataBaseType": this.DataBaseType,
            "sys_CollectStatus": this.CollectStatus,
            "sys_CollectDes": this.CollectDes,
            "id":this.id
            };
      }
      debugger
      this.$http
        .post(this.URL+this.currentOpUrl, data)
        .then(res => {
          if (res.data && res.data.result) {
               debugger
              this.$message({message: this.operationFlag==1?'添加成功！':'更新成功！',type: 'success',showClose: true});
               this.loadUserData();
              this.dialogFormVisible=false
          } else {
            this.$message({message: "添加失败 " +res.data==""?"":res.data.error,type: "error",showClose: true});
          }
        })
        .catch(err => {});
    },
    search(){
         this.loadUserData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    clearForm(){
        this.operationFlag=0,
        this.id=0,
        this.CollectCode='',
        this.CollectName='',
        this.DataBaseType='1',
        this.CollectDes='' 
    },
    formatlogtype(row, column) {
      return this.getType(row.Sys_CollectStatus);
    },
    getType(val) {
      let res = "";
      switch (val) {
        case "0":
          res = "启用";
          break;
        case "1":
          res = "禁用";
          break;
        default:
          res = "未知";
          break;
      }
      return res;
    },
    loadUserData() {
      if(this.dateValue == ''|| this.dateValue ==null)
      {
        var now = new Date();
        var startDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10)+" 00:00:00";
        var endDate = new Date();
        this.dateValue=[];
        this.dateValue.push(startDate)
        this.dateValue.push(endDate)
      }
      
      let data = {
        startTime: '2019-05-21 00:00:00', // this.dateValue[0],
        endTime: '2019-05-30 00:00:00',//this.dateValue[1],
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        data: {
          sys_CollectCode: this.CollectCode,
          sys_CollectName: this.CollectName,
          sys_CollectStatus: this.value
        }
      };
      this.$http
        .post(this.URL+"/basic/interface/collect/list",data)
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
    } 
  },
  data() {
    return {
      URL:this.$SYSCONST.BASEINFOAPI,
      pickerOptions: {
        shortcuts: [{
            text: "今天",
            onClick(picker) {
              var date = new Date();
              var seperator1 = "-";
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              var strDate = date.getDate();
              if (month >= 1 && month <= 9) {
                  month = "0" + month;
                }
              if (strDate >= 0 && strDate <= 9) {
                  strDate = "0" + strDate;
               }
              var start = year + seperator1 + month + seperator1 + strDate+" 00:00:00";
              picker.$emit('pick', [start, date]);
            }
          },{
            text: "最近一天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },{
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      UserInfo:{},
      dateValue:'',
      formLabelWidth: "20%",
      dialogFormVisible: false,
      total: 0,
      pageIndex: 1,
      pageSize: 20,
      Sys_CollectName: "",
      Sys_CollectCode: "",
      clientHeight: "0",
      operationFlag:0,
      id:0,
      CollectStatus:'1',
      DataBaseType:'1',
      CollectCode: '',
      CollectName: '',
      CollectDes:'',
      CollectType:'1',
      options: [{
          value: "1",
          label: "启用"
        },
        {
          value: "2",
          label: "禁用"
        } 
      ],
      ServerName:[{
          value: "1",
          label: "Sqlserver"
       },
       {
          value: "2",
          label: "oracle"
       },
       {
          value: "3",
          label: "Mysql"
       }],
      value: "",
      tableData: [],
      loading: true,
      currentOpName: "添加数据收集组",
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

.el-pagination .el-select .el-input .el-input__inner {
  height: 22px;
}
</style>