<template>
  <el-container style="height:100%;">
    <div class="myhead" style="padding-left:20px">
      <el-input style="width:150px;" v-model="GroupCode" clearable placeholder="设备分组编号"></el-input>
      <el-input style="width:150px;" v-model="GroupName" clearable placeholder="设备分组名称"></el-input>
      <el-select style="width:150px;" v-model="GroupStatus" clearable placeholder="请选择状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button style="width:120px;" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button style="width:120px;" type="primary" @click="opendialog(1,null)">添加</el-button>
    </div>

    <el-main >
      <el-table   v-loading="loading"  element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"
        :data="tableData"  fit border stripe   max-height="400"
         size='mini' :style="`width:100%;height:${clientHeight}px;`">
        <el-table-column prop="RowNo" label="序号" fixed sortable min-width="70"></el-table-column>
        <el-table-column prop="Eqp_Name" label="设备名称" sortable min-width="150"></el-table-column>
        <el-table-column prop="Eqp_GroupCode" label="设备分组编号" sortable min-width="150"></el-table-column>
        <el-table-column prop="Eqp_GroupName" label="设备分组名称" sortable min-width="120"></el-table-column>
        <el-table-column prop="Eqp_GroupStatus" label="设备分组状态"  :formatter="formatlogtype" sortable  min-width="120" ></el-table-column>
        <el-table-column prop="Eqp_GroupRemark" label="设备分组备注" sortable min-width="180"></el-table-column>
        <el-table-column prop="Name" label="创建人" sortable min-width="120"></el-table-column>
        <el-table-column prop="CreateTime" label="创建时间" :formatter="formatdatetime" sortable min-width="150"></el-table-column>
        <el-table-column prop label="操作" fixed="right" min-width="120">
          <template slot-scope="scope">
            <!-- <el-button style=" width:15%; margin:0,0,0,5px;"  @click.native.prevent="opendialog(3,scope.row)"  type="text"  size="mini">查看</el-button> -->
            <el-button style=" width:15%; margin:0,0,0,5px;"  @click.native.prevent="opendialog(2,scope.row)"  type="text"  size="mini">设备分组详情</el-button>
          </template>
        </el-table-column>
      </el-table> 
  
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
        
    <el-dialog :title="`${currentOpName}`"  width="50%" :visible.sync="dialogFormVisible">
      <div v-if="showAll">
        <el-radio-group v-model="radioGroup" @change="handleRadioChange">
          <el-radio class="radio" label="添加设备分组" border>添加设备分组</el-radio>
          <el-radio class="radio" label="修改设备分组" border>修改设备分组</el-radio>
          <el-radio class="radio" label="删除设备分组" border>删除设备分组</el-radio>
        </el-radio-group>
      </div>
      <div class="block" style=" width:40%;float:left;padding-top:20px;" v-if="showAll">
        <el-scrollbar  style="height:320px;" class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="default-scrollbar__view">
          <el-tree :data="treedata" :props="defaultProps" :highlight-current="true"
          node-key="id"  :load="loadBomNode" lazy @node-click="handleNodeClick" ref="grouptree" >
          </el-tree>
        </el-scrollbar>
      </div >
      <div class="block" style="float:left; width:55%;height:350px; padding-left:20px;padding-top:20px;">
        <el-form style="" ref="configForm">
          <el-form-item label="设备分组编号" :label-width="formLabelWidth">
            <el-input style="width:85%" :disabled="true"  v-model="gEqp.eqp_GroupCode" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="设备名称" :label-width="formLabelWidth">
            <el-cascader style="width:85%" placeholder="请输入关键词"
                :options="eqpOptions" :show-all-levels="false" :disabled="isEnable" 
                filterable @change="getEqpId" v-model="eqpValue"
                :props="{
                  value: 'id',
                  label: 'name',
                  children: 'children'
                }">
            </el-cascader>
          </el-form-item>
          <el-form-item label="设备分组名称" :label-width="formLabelWidth">
            <el-input style="width:85%" :disabled="isEnable" placeholder="请输入设备分组名称" v-model="gEqp.eqp_GroupName" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="设备分组状态" :label-width="formLabelWidth">
            <el-select style="width:85%" :disabled="isEnable"  v-model="gEqp.eqp_GroupStatus" placeholder="设备分组状态">
                <el-option  v-for="item in options" 
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option> 
            </el-select> 
          </el-form-item>
          <el-form-item  label="设备分组备注"  :label-width="formLabelWidth">
                <el-input style="width:85%" :disabled="isEnable" placeholder="请输入描述" type="textarea" v-model="gEqp.eqp_GroupRemark"  autocomplete="off" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="clear:both;padding-right:8%">
        <el-button   @click="dialogFormVisible = false">关 闭</el-button>
        <el-button  type="primary" v-show="!isEnable"  @click="actionObject">确 定</el-button>
      </div>

    </el-dialog>

  </el-container>
</template>


<script >
import { fail } from 'assert';
export default {
  mounted() {
    this.$http.defaults.baseURL = process.env.BASE_INFO;
    this.clientHeight = `${document.documentElement.clientHeight - 216}`;
    this.UserInfo= this.$store.state.userInfo;
    this.loadUserData();  // 初始化加载数据
  },
  methods: {
    opendialog(flag, row) {
        this.clearForm();

        //获取设备信息
        this.loadEqpBase();

        if (flag === 1) {

            this.showAll = false;
            this.currentOpUrl = this.URL+"/basic/device/Group/add";
            this.currentOpName="添加设备分组";
            this.gEqp.eqp_GroupCode = new Date().getTime();
        }
        else if(flag===3){
            this.showAll = true;
            this.loadDetail(row);
            this.isEnable=true;
            this.currentOpName="设备分组详情";
            this.currentOpUrl =  this.URL+"/basic/device/Group/detail?id="+row.Mat_BomId;

        }
        else if(flag===2){
            this.showAll = true;
            this.loadDetail(row);
            this.currentOpName="设备分组详情 - " + this.radioGroup;
            this.currentOpUrl =  this.URL+"/basic/device/Group/update?id="+row.Mat_BomId;
        }

        this.operationFlag = flag;
        this.dialogFormVisible = true; 
        this.isEnable=false;

    },
    loadDetail(row) {
      if(row)
      {  
        this.$http.get( this.URL+'/basic/device/Group/detail?id='+row.Eqp_GroupId)
          .then(resp=>{
            let data=resp.data.data;
            this.gEqp=data;

            //显示根节点
            this.treedata=[{
              id: data.eqp_GroupId,
              label: data.eqp_GroupName}];

            if(this.radioGroup == "修改设备分组")
            {
                this.gEqp=data;
                this.getEqpBase(this.gEqp.eqp_Id);
            }
            else
            {
              this.gEqp={};
              this.eqpValue=[];
              this.gEqp.mat_BomCode = new Date().getTime();
            }

            this.gEqp.eqp_tempId = row.Eqp_GroupId;

          }).catch(err=>{})} 
    },

    loadBomNode(node, resolve) {

      if (node.level === 0) {
        return resolve([{
          id:0,
          label: '设备分组清单列表',
        }]);
      }
      
      setTimeout(() => {

        let tdata = [];

        if(node && node.data.id)
        {
          let tId=node.data.id;
          
          this.$http.get(this.URL+"/basic/device/Group/Open?GroupId=" + tId)
            .then(resp=>{

            if (resp.data && resp.data.result)
            {
              let groupdata = resp.data.data.rows;

              for(let i=0;i<groupdata.length;i++)
              {
                tdata.push({id:groupdata[i].eqp_GroupId,label:groupdata[i].eqp_GroupName});
              }
              resolve(tdata);
            }

          }).catch(err=>{})
        }
        else{
          resolve([]);
        }
        
      }, 500);

    },
    reloadGroupNode (node){
 
      if(node && node.data.id)
      {         
        var theChildren = node.childNodes
        theChildren.splice(0, theChildren.length)

        let tdata = [];
        let tId=node.data.id;

        this.$http.get(this.URL+"/basic/device/Group/Open?GroupId=" + tId)
          .then(resp=>{

          if (resp.data && resp.data.result)
          {
            let groupdata = resp.data.data.rows;

            for(let i=0;i<groupdata.length;i++)
            {
              tdata.push({id:groupdata[i].eqp_GroupId,label:groupdata[i].eqp_GroupName});
            }

            node.doCreateChildren(tdata)
          }

        }).catch(err=>{})
      }
    },

    getEqpBase(tId) {
      
      let data = {
        pageIndex: -1,
        pageSize: 1000,

        "Eqp_Status":1
      };
              
      let params=this.$qs.stringify(data);
      this.$http
        .post(this.URL+"/basic/device/BaseInfo/list?"+params,data)
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;
            let data=respdata.data.rows;

            this.eqpValue=[];
 
            for(let i=0;i<data.length;i++)
            {
              if(tId == data[i].Eqp_Id)
              {
                this.eqpValue = [data[i].Eqp_TypeId,data[i].Eqp_Id];

                 break;
              }
            }

          }
        })
        .catch(err => {
          console.log("出现异常：", err);
        });
    },
    
    handleNodeClick(data){

      this.eqpnode = this.$refs.grouptree.getNode(data);

      let tId = data.id;

        this.$http.get( this.URL+'/basic/device/Group/detail?id='+tId)
          .then(resp=>{
            let data=resp.data.data;
            
            this.gEqp=data;

            if(this.radioGroup == "添加设备分组")
            {
              this.gEqp={};
              this.eqpValue=[];
              this.gEqp.eqp_GroupCode = new Date().getTime();
            }
            else
            {
              this.getEqpBase(data.eqp_Id);
            }

            this.gEqp.eqp_tempId = tId;

        }).catch(err=>{})
      
    },
    handleRadioChange(value){
        this.currentOpName="设备分组详情 - " + value;
    },
    actionObject() {

      let flag = 0;
      let data = this.gEqp;
  
      if(this.radioGroup == "添加设备分组" || this.operationFlag == 1)
      {//添加
        flag = 1;
        data.eqp_GroupParentId = this.gEqp.eqp_tempId;
        this.currentOpUrl = this.URL+"/basic/device/Group/add";
      }
      else if(this.radioGroup === "修改设备分组")
      {//修改
        flag = 2;
        this.currentOpUrl =  this.URL+"/basic/device/Group/update?id="+ this.gEqp.eqp_tempId;
      }
      else if(this.radioGroup === "删除设备分组")
      {
        flag = 3;

        this.deleteGroup(this.gEqp);
        return true;
      }

      if (!this.gEqp.eqp_GroupName) {
        this.$message({ message: "设备分组名称不能为空",
          type: "error",
          showClose: true
        });
        return false;
      }

      this.$http
        .post(this.currentOpUrl, data)
        .then(res => {
          if (res.data && res.data.result) {

              if(flag == 2)
              {
                this.$message({message: "更新成功！",type: "success",showClose: true});
                this.reloadGroupNode(this.eqpnode.parent);
              }
              else
              {
                this.$message({message: "添加成功！",type: "success",showClose: true});
                
                if(this.operationFlag == 1)
                {
                  this.dialogFormVisible=false;
                }
                else
                {
                  this.reloadGroupNode(this.eqpnode);
                }

              }
                              
              this.search();
              
          } else {
            this.$message({message: "添加失败 " +res.data==""?"":res.data.error,type: "error",showClose: true});
          }
        })
        .catch(err => {});
    },   
    deleteGroup(data) {

      if (!data.eqp_GroupId) {
        this.$message({ message: "GroupId不能为空,请选择要删除的设备分组",
          type: "error",
          showClose: true
        });
        return false;
      }

      this.$confirm('此操作将永久该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$http.post(this.URL+"/basic/device/Group/delete?id="+data.eqp_GroupId,).then(resp=>{
              if(resp&&resp.data&&resp.data.result) {
              this.$message({message: "设备分组：" + data.eqp_GroupName +  "删除成功！",type: "success",showClose: true});

              this.reloadGroupNode(this.eqpnode.parent);
              } else {
          this.$message({message: "删除失败 " +res.data==""?"":res.data.error,type: "error",showClose: true});
          }
          }).catch(err=>{});
      }).catch(() => {});

    },
        
    search(){
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,

        "data":{
          "Eqp_GroupCode":this.GroupCode,
          "Eqp_GroupName":this.GroupName,
          "Eqp_GroupStatus":this.GroupStatus,
        }
      };

      let params=this.$qs.stringify(data);
      this.$http
        .post(this.URL+"/basic/device/Group/list?"+params,data)
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

    getEqpId(value){
      this.gEqp.eqp_Id = value[1];
    },

    loadEqpBase() {

      this.$http
        .get(this.URL+"/basic/device/Eqp/group")
        .then(resp => {
          if (resp && resp.data && resp.data.result) {
            let respdata = resp.data;

            this.eqpOptions=respdata.data;
 
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
        this.gEqp ={};
        this.eqpValue=[];
        this.operationFlag = 0;
    },
    formatdatetime(row, column){
      let datetime = row[column.property];
      if (datetime == null) {
        return "";
      }
      return this.$moment(datetime).format('YYYY-DD-MM HH:mm:ss');
    },
    formatlogtype(row, column) {
      return this.getType(row.Eqp_GroupStatus);
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

        "data":{
          "Eqp_GroupStatus": 1,
        }
      };

      let params=this.$qs.stringify(data);
      this.$http
        .post(this.URL+"/basic/device/Group/list?"+params,data)
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
      UserInfo:{},
      dateValue:'',
      formLabelWidth: "30%",
      dialogFormVisible: false,
      total: 0,
      pageIndex: 1,
      pageSize: 20,
      GroupName: "",
      GroupCode: "",
      GroupStatus: 1, 
      operationFlag:0,
      clientHeight: "0",
      currentOpUrl: "",
      
      gEqp: {
        eqp_Id: 0,
        eqp_GroupCode: '',
        eqp_GroupName: '',
        eqp_GroupStatus: '',
        eqp_GroupParentId: 0,
        eqp_GroupRemark: '',
        eqp_tempId: 0,
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

      isFirst: true,
      eqpnode: {},
      eqpValue: [],
      eqpOptions: [],
      tableData: [],
      loading: true,
      currentOpName: "BOM表详情",
      isEnable:false, 

      showAll: false,
      radioGroup: "添加设备分组",
      treedata: [],
      defaultProps: {
        id: 'id',
        label: 'label',
        children: 'children',
      },
      exCount: 0,
      extableData: [],
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

 .default-scrollbar .default-scrollbar__wrap{
      overflow-y: scroll;
      overflow-x: scroll;
      width:80px;
      height: 400px;
  }
 .el-tree {
     min-width: 100%;
     height: 400px;
     display:inline-block;
 }


</style>